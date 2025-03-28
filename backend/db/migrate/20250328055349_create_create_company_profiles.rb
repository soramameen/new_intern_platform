class CreateCreateCompanyProfiles < ActiveRecord::Migration[8.0]
  def change
    create_table :create_company_profiles do |t|
      t.references :user, null: false, foreign_key: true
      t.string :company_name
      t.text :description
      t.string :industry
      t.string :location
      t.string :website
      t.string :company_size
      t.string :logo

      t.timestamps
    end
  end
end
