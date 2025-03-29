# app/models/user.rb
class User < ApplicationRecord
  has_secure_password
  # profile
  has_one :intern_profile, dependent: :destroy
  has_one :company_profile, dependent: :destroy
  # offer
  has_many :sent_offers, class_name: 'Offer', foreign_key: 'company_id', dependent: :destroy
  has_many :received_offers, class_name: 'Offer', foreign_key: 'intern_id', dependent: :destroy
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
  def offering_companies
    User.joins(:sent_offers).where(offers: { intern_id: id }).distinct
  end
  def offered_interns
    User.joins(:received_offers).where(offers: { company_id: id }).distinct
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