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

ActiveRecord::Schema.define(version: 2021_09_28_195228) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "flashcards", force: :cascade do |t|
    t.bigint "studyset_id", null: false
    t.string "word"
    t.text "definition"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["studyset_id"], name: "index_flashcards_on_studyset_id"
  end

  create_table "reviewcards", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "flashcard_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["flashcard_id"], name: "index_reviewcards_on_flashcard_id"
    t.index ["user_id"], name: "index_reviewcards_on_user_id"
  end

  create_table "reviewsets", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "studyset_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["studyset_id"], name: "index_reviewsets_on_studyset_id"
    t.index ["user_id"], name: "index_reviewsets_on_user_id"
  end

  create_table "studysets", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_studysets_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "username"
    t.string "password_digest"
    t.text "bio"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "flashcards", "studysets"
  add_foreign_key "reviewcards", "flashcards"
  add_foreign_key "reviewcards", "users"
  add_foreign_key "reviewsets", "studysets"
  add_foreign_key "reviewsets", "users"
  add_foreign_key "studysets", "users"
end
