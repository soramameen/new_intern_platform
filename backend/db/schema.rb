# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_04_02_080243) do
  create_table "company_profiles", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "company_name"
    t.text "description"
    t.string "industry"
    t.string "location"
    t.string "website"
    t.string "company_size"
    t.string "logo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_company_profiles_on_user_id"
  end

  create_table "intern_profiles", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "name"
    t.text "bio"
    t.string "school"
    t.string "major"
    t.string "expected_graduation"
    t.text "skills"
    t.string "github_url"
    t.string "portfolio_url"
    t.string "location"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_intern_profiles_on_user_id"
  end

  create_table "messages", force: :cascade do |t|
    t.string "nickname"
    t.text "content"
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "offers", force: :cascade do |t|
    t.integer "company_id", null: false
    t.integer "intern_id", null: false
    t.text "message", null: false
    t.string "position", null: false
    t.text "details"
    t.integer "status", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id", "intern_id", "status"], name: "index_offers_on_company_intern_status"
    t.index ["company_id"], name: "index_offers_on_company_id"
    t.index ["intern_id"], name: "index_offers_on_intern_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.string "user_type"
    t.string "name"
    t.string "company_name"
    t.text "company_description"
    t.text "skills"
    t.text "bio"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email"
  end

  add_foreign_key "company_profiles", "users"
  add_foreign_key "intern_profiles", "users"
  add_foreign_key "messages", "users"
  add_foreign_key "offers", "users", column: "company_id"
  add_foreign_key "offers", "users", column: "intern_id"
end
