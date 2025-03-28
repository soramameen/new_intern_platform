# app/controllers/application_controller.rb
class ApplicationController < ActionController::API
  # 現在のユーザーを取得
  def current_user
    return nil unless auth_header
    token = auth_header.split(' ')[1]
    begin
      decoded = JWT.decode(token, Rails.application.credentials.secret_key_base)[0]
      @current_user ||= User.find(decoded["user_id"])
    rescue JWT::DecodeError
      nil
    end
  end
  
  # Authorizationヘッダーを取得
  def auth_header
    request.headers['Authorization']
  end
  
  # ユーザー認証が必要なアクションで使用
  def authenticate_user
    render json: { error: '認証が必要です' }, status: :unauthorized unless current_user
  end
  
  # トークン生成
  def encode_token(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, Rails.application.credentials.secret_key_base)
  end
end