class DropDuplicateTables < ActiveRecord::Migration[8.0]
  def change
    drop_table :create_company_profiles
    drop_table :create_intern_profiles
  end
end