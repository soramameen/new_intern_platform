
# app/controllers/api/v1/company_profiles_controller.rb
class Api::V1::CompanyProfilesController < ApplicationController
  before_action :authenticate_user
  before_action :ensure_company
  before_action :set_profile
  
  # プロフィール取得
  def show
    render json: @profile
  end
  
  # プロフィール更新
  def update
    if @profile.update(profile_params)
      render json: @profile
    else
      render json: { errors: @profile.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  private
  
  def set_profile
    @profile = current_user.company_profile
  end
  
  def profile_params
    params.require(:company_profile).permit(:company_name, :description, :industry, 
                                           :location, :website, :company_size, :logo)
  end
  
  def ensure_company
    unless current_user.user_type == 'company'
      render json: { error: '権限がありません' }, status: :forbidden
    end
  end
end