# app/models/user.rb
class User < ApplicationRecord
  has_secure_password
  has_one :intern_profile, dependent: :destroy
  has_one :company_profile, dependent: :destroy

    after_create :create_profile

  
  validates :email, presence: true, uniqueness: true
  validates :user_type, presence: true, inclusion: { in: ['intern', 'company'] }
  validates :name, presence: true
  
  # 企業の場合はcompany_nameが必須
  validates :company_name, presence: true, if: -> { user_type == 'company' }

    def intern?
    user_type == 'intern'
  end
  
  def company?
    user_type == 'company'
  end
  def profile
    user_type == 'intern' ? intern_profile : company_profile
  end

   private
     def create_profile
      if self.user_type == 'intern'
        InternProfile.create(user: self)
      elsif self.user_type == 'company'
        CompanyProfile.create(user: self)
      end
    end                           
end