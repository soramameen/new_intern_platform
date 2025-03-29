# app/controllers/api/v1/profiles_controller.rb
class Api::V1::ProfilesController < ApplicationController
  before_action :authenticate_user
  
  # 現在のユーザーのプロフィール情報を取得
  def show
    profile = current_user.profile
    
    # ユーザータイプによって返すデータを変更
    if current_user.intern?
      render json: profile.as_json(
        include: { user: { only: [:name, :email] } },
        except: [:created_at, :updated_at]
      )
    elsif current_user.company?
      render json: profile.as_json(
        include: { user: { only: [:name, :email] } },
        except: [:created_at, :updated_at]
      )
    else
      render json: { error: '不正なユーザータイプです' }, status: :unprocessable_entity
    end
  end
end