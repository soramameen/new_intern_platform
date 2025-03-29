# app/models/offer.rb
class Offer < ApplicationRecord
  belongs_to :company, class_name: 'User', foreign_key: 'company_id'
  belongs_to :intern, class_name: 'User', foreign_key: 'intern_id'
  
  enum status: { pending: 0, accepted: 1, declined: 2 }
  
  validates :company_id, presence: true
  validates :intern_id, presence: true
  validates :message, presence: true
  validates :position, presence: true
  validates :status, presence: true
  
  # 同じインターン生に対する重複オファーをチェック
  validate :no_duplicate_pending_offers
  validate :company_user_type
  validate :intern_user_type
  
  private
  
  def no_duplicate_pending_offers
    if new_record? && Offer.exists?(company_id: company_id, intern_id: intern_id, status: :pending)
      errors.add(:base, '既にオファーが送信されています')
    end
  end
  
  def company_user_type
    unless company && company.user_type == 'company'
      errors.add(:company_id, 'は企業ユーザーである必要があります')
    end
  end
  
  def intern_user_type
    unless intern && intern.user_type == 'intern'
      errors.add(:intern_id, 'はインターン生ユーザーである必要があります')
    end
  end
end