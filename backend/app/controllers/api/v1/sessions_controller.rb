# app/controllers/api/v1/sessions_controller.rb
class Api::V1::SessionsController < ApplicationController
  # ログイン
  def create
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      token = encode_token(user_id: user.id)
      render json: { 
        id: user.id, 
        email: user.email, 
        user_type: user.user_type,
        name: user.name,
        token: token
      }
    else
      render json: { error: '認証に失敗しました' }, status: :unauthorized
    end
  end

  # ログイン状態確認
  def status
    if current_user
      render json: { 
        logged_in: true, 
        user: { 
          id: current_user.id, 
          email: current_user.email, 
          user_type: current_user.user_type,
          name: current_user.name
        } 
      }
    else
      render json: { logged_in: false }
    end
  end
end