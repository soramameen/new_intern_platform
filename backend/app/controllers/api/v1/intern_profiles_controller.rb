# app/controllers/api/v1/intern_profiles_controller.rb
class Api::V1::InternProfilesController < ApplicationController
  before_action :authenticate_user
  before_action :ensure_intern
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
    @profile = current_user.intern_profile
  end
  
  def profile_params
    params.require(:intern_profile).permit(:name, :bio, :school, :major, 
                                          :expected_graduation, :skills, 
                                          :github_url, :portfolio_url, :location)
  end
  
  def ensure_intern
    unless current_user.user_type == 'intern'
      render json: { error: '権限がありません' }, status: :forbidden
    end
  end
end