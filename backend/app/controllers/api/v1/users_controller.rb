# app/controllers/api/v1/users_controller.rb
class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user, only: [:index]
  
  # ユーザー登録
  def create
    user = User.new(user_params)
    if user.save
      token = encode_token(user_id: user.id)
      render json: user_response(user).merge(token: token), status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  # インターン生一覧（企業のみアクセス可能）
  def index
    # 企業ユーザーがインターン生一覧を取得する場合
    if current_user.user_type == 'company' && params[:type] != 'companies'
      interns = User.where(user_type: 'intern')
      render json: interns.map { |intern| user_response(intern) }
    # インターン生ユーザーが企業一覧を取得する場合
    elsif current_user.user_type == 'intern' && params[:type] == 'companies'
      companies = User.where(user_type: 'company').includes(:company_profile)
      companies_data = companies.map do |company|
        profile = company.company_profile
        {
          id: company.id,
          name: company.name,
          email: company.email,
          company_name: profile.company_name,
          industry: profile.industry,
          location: profile.location,
          company_size: profile.company_size,
          description: profile.description
        }
      end
      render json: companies_data
    else
      render json: { error: '権限がありません' }, status: :forbidden
    end
  end
  private
  
  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :user_type, :name, :company_name, :company_description, :skills, :bio)
  end
  
  def user_response(user)
    response = {
      id: user.id,
      email: user.email,
      user_type: user.user_type,
      name: user.name
    }
    
    if user.user_type == 'company'
      response.merge!(
        company_name: user.company_name,
        company_description: user.company_description
      )
    elsif user.user_type == 'intern'
      response.merge!(
        skills: user.skills,
        bio: user.bio
      )
    end
    
    response
  end
end