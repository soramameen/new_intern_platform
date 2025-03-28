class InternProfile < ApplicationRecord
  belongs_to :user
  
  # スキルを配列として取り扱う（SQLiteではテキストカラムをカンマ区切りで保存）
  def skills_array
    return [] if skills.blank?
    skills.split(',').map(&:strip)
  end
  
  # スキル配列を設定するヘルパーメソッド
  def skills_array=(array)
    self.skills = array.join(',')
  end
end