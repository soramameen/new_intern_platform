# app/controllers/api/v1/offers_controller.rb
class Api::V1::OffersController < ApplicationController
  before_action :authenticate_user
  before_action :set_offer, only: [:show, :update]
  
  # オファー一覧取得（企業: 送信したオファー、インターン: 受信したオファー）
  def index
    if current_user.company?
      offers = current_user.sent_offers.includes(:intern)
      render json: offers.as_json(include: { intern: { only: [:id, :name, :email]} })
    elsif current_user.intern?
      offers = current_user.received_offers.includes(:company)
      render json: offers.as_json(include: { company: { only: [:id, :name, :email, :company_name] } })
    else
      render json: { error: '不正なユーザータイプです' }, status: :unprocessable_entity
    end
  end
  
  # オファー詳細取得
  def show
    authorize_offer_access(@offer)
    
    if current_user.company?
      render json: @offer.as_json(include: { intern: { only: [:id, :name, :email], methods: [:skills_array] } })
    else
      render json: @offer.as_json(include: { company: { only: [:id, :name, :email, :company_name] } })
    end
  end
  
  # オファー作成（企業のみ）
  def create
    puts offer_params.inspect
    unless current_user.company?
      return render json: { error: '権限がありません' }, status: :forbidden
    end
    
    @offer = Offer.new(offer_params)
    @offer.company_id = current_user.id
    
    if @offer.save
      render json: @offer, status: :created
    else
      render json: { errors: @offer.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  # オファー更新（ステータス変更: インターン生のみ）
  def update
      unless current_user.intern? && @offer.intern_id == current_user.id
        return render json: { 
          error: '権限がありません',
          user_type: current_user.type,
          user_id: current_user.id,
          offer_intern_id: @offer.intern_id
        }, status: :forbidden
      end
  
    if @offer.update(offer_status_params)
      render json: @offer
    else
      render json: { errors: @offer.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  private
  
  def set_offer
    @offer = Offer.find(params[:id])
  end
  
  def offer_params
    puts params.inspect
    params.require(:offer).permit(:intern_id, :message, :position, :details)
  end
  
  def offer_status_params
    params.require(:offer).permit(:status)
  end
  
  def authorize_offer_access(offer)
    is_authorized = (current_user.company? && offer.company_id == current_user.id) || 
                   (current_user.intern? && offer.intern_id == current_user.id)
                   
    unless is_authorized
      render json: { error: '権限がありません' }, status: :forbidden and return false
    end
    
    true
  end
end