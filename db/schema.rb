# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_07_30_174452) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cards", force: :cascade do |t|
    t.string "cardInfo"
    t.bigint "character_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["character_id"], name: "index_cards_on_character_id"
  end

  create_table "characters", force: :cascade do |t|
    t.string "name"
    t.string "image"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_characters_on_user_id"
  end

  create_table "gamerooms", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "card_id"
    t.string "p1_hand_1"
    t.string "p1_hand_2"
    t.string "p1_hand_3"
    t.string "p2_hand_1"
    t.string "p2_hand_2"
    t.string "p2_hand_3"
    t.integer "p1_life_points"
    t.integer "p2_life_points"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["card_id"], name: "index_gamerooms_on_card_id"
    t.index ["user_id"], name: "index_gamerooms_on_user_id"
  end

  create_table "games", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "userName"
    t.integer "playerNum"
    t.integer "lifePoints"
    t.bigint "game_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_users_on_game_id"
  end

  add_foreign_key "gamerooms", "cards"
  add_foreign_key "gamerooms", "users"
end
