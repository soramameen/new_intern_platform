# app/controllers/api/v1/interns_controller.rb
class Api::V1::InternsController < ApplicationController
  before_action :authenticate_user
  before_action :ensure_company
  
  def show
    @intern = User.find_by(id: params[:id], user_type: 'intern')
    
    if @intern
      render json: {
        id: @intern.id,
        name: @intern.name,
        email: @intern.email,
        profile: @intern.intern_profile.as_json(except: [:created_at, :updated_at, :user_id]),
        skills: @intern.intern_profile.skills_array
      }
    else
      render json: { error: 'インターン生が見つかりません' }, status: :not_found
    end
  end
  
  private
  
  def ensure_company
    unless current_user.user_type == 'company'
      render json: { error: '権限がありません' }, status: :forbidden
    end
  end
end