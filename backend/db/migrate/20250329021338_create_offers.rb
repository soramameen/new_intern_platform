class CreateOffers < ActiveRecord::Migration[8.0]
  def change
    create_table :offers do |t|
      t.integer :company_id, null: false
      t.integer :intern_id, null: false
      t.text :message, null: false
      t.string :position
      t.text :details
      t.integer :status, null: false, default: 0

      t.timestamps
    end
    
    add_index :offers, :company_id
    add_index :offers, :intern_id
    add_index :offers, [:company_id, :intern_id, :status], name: 'index_offers_on_company_intern_status'
    
    add_foreign_key :offers, :users, column: :company_id
    add_foreign_key :offers, :users, column: :intern_id
  end
end