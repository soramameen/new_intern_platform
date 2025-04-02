# app/models/message.rb
class Message < ApplicationRecord
  belongs_to :user, optional: true
  
  validates :nickname, presence: true
  validates :content, presence: true
  
  default_scope { order(created_at: :desc) }
end