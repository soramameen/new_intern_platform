class Api::V1::CompaniesController < ApplicationController
  before_action :authenticate_user
  before_action :ensure_intern
  
  def show
    @company = User.find_by(id: params[:id], user_type: 'company')
    
    if @company
      render json: {
        id: @company.id,
        name: @company.name,
        email: @company.email,
        company_name: @company.company_profile.company_name,
        industry: @company.company_profile.industry,
        company_size: @company.company_profile.company_size,
        location: @company.company_profile.location,
        website: @company.company_profile.website,
        description: @company.company_profile.description
      }
    else
      render json: { error: '企業が見つかりません' }, status: :not_found
    end
  end
  
  private
  
  def ensure_intern
    unless current_user.user_type == 'intern'
      render json: { error: '権限がありません' }, status: :forbidden
    end
  end
end