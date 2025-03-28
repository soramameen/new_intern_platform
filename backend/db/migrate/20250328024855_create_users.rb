class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.string :user_type
      t.string :name
      t.string :company_name
      t.text :company_description
      t.text :skills
      t.text :bio

      t.timestamps
    end
    add_index :users, :email
  end
end
