class CreateCreateInternProfiles < ActiveRecord::Migration[8.0]
  def change
    create_table :create_intern_profiles do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name
      t.text :bio
      t.string :school
      t.string :major
      t.string :expected_graduation
      t.text :skills
      t.string :github_url
      t.string :portfolio_url
      t.string :location

      t.timestamps
    end
  end
end
