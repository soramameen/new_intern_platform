class CompanyProfilesController < ApplicationController
  before_action :authenticate_user!
  before_action :ensure_company
  before_action :set_profile
  
  def show
  end
  
  def edit
  end
  
  def update
    if @profile.update(profile_params)
      redirect_to company_profile_path, notice: 'プロフィールを更新しました'
    else
      render :edit, status: :unprocessable_entity
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
    redirect_to root_path, alert: '権限がありません' unless current_user.role == 'company'
  end
end