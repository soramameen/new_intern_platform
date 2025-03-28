class InternProfilesController < ApplicationController
  before_action :authenticate_user!
  before_action :ensure_intern
  before_action :set_profile
  
  def show
  end
  
  def edit
  end
  
  def update
    if @profile.update(profile_params)
      redirect_to intern_profile_path, notice: 'プロフィールを更新しました'
    else
      render :edit, status: :unprocessable_entity
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
    redirect_to root_path, alert: '権限がありません' unless current_user.role == 'intern'
  end
end
