# app/controllers/api/v1/messages_controller.rb
class Api::V1::MessagesController < ApplicationController
  before_action :authenticate_user, only: [:create]
  
  def index
    messages = Message.all.limit(50)
    render json: messages
  end
  
  def create
    message = Message.new(message_params)
    message.user = current_user if current_user
    
    if message.save
      render json: message, status: :created
    else
      render json: { errors: message.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  private
  
  def message_params
    params.require(:message).permit(:nickname, :content)
  end
end