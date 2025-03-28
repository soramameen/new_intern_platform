# app/models/user.rb
class User < ApplicationRecord
  has_secure_password
  
  validates :email, presence: true, uniqueness: true
  validates :user_type, presence: true, inclusion: { in: ['intern', 'company'] }
  validates :name, presence: true
  
  # 企業の場合はcompany_nameが必須
  validates :company_name, presence: true, if: -> { user_type == 'company' }
end