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
    t.string "p1"
    t.string "p2"
    t.string "player1Key"
    t.string "player2Key"
    t.string "turn"
    t.integer "room"
    t.string "key"
    t.string "p1_hand_1"
    t.string "p1_hand_2"
    t.string "p1_hand_3"
    t.string "p1_hand_4"
    t.string "p1_hand_5"
    t.string "p1_hand_6"
    t.string "p1_hand_7"
    t.string "p2_hand_1"
    t.string "p2_hand_2"
    t.string "p2_hand_3"
    t.string "p2_hand_4"
    t.string "p2_hand_5"
    t.string "p2_hand_6"
    t.string "p2_hand_7"
    t.string "p1Monster1"
    t.string "p1Monster2"
    t.string "p1Monster3"
    t.string "p1Monster4"
    t.string "p1Monster5"
    t.string "p1Magic1"
    t.string "p1Magic2"
    t.string "p1Magic3"
    t.string "p1Magic4"
    t.string "p1Magic5"
    t.string "p2Monster1"
    t.string "p2Monster2"
    t.string "p2Monster3"
    t.string "p2Monster4"
    t.string "p2Monster5"
    t.string "p2Magic1"
    t.string "p2Magic2"
    t.string "p2Magic3"
    t.string "p2Magic4"
    t.string "p2Magic5"
    t.string "p1_deck_1"
    t.string "p1_deck_2"
    t.string "p1_deck_3"
    t.string "p1_deck_4"
    t.string "p1_deck_5"
    t.string "p1_deck_6"
    t.string "p1_deck_7"
    t.string "p1_deck_8"
    t.string "p1_deck_9"
    t.string "p1_deck_10"
    t.string "p1_deck_11"
    t.string "p1_deck_12"
    t.string "p1_deck_13"
    t.string "p1_deck_14"
    t.string "p1_deck_15"
    t.string "p1_deck_16"
    t.string "p1_deck_17"
    t.string "p1_deck_18"
    t.string "p1_deck_19"
    t.string "p1_deck_20"
    t.string "p1_deck_21"
    t.string "p1_deck_22"
    t.string "p1_deck_23"
    t.string "p1_deck_24"
    t.string "p1_deck_25"
    t.string "p1_deck_26"
    t.string "p1_deck_27"
    t.string "p1_deck_28"
    t.string "p1_deck_29"
    t.string "p1_deck_30"
    t.string "p1_deck_31"
    t.string "p1_deck_32"
    t.string "p1_deck_33"
    t.string "p1_deck_34"
    t.string "p1_deck_35"
    t.string "p1_deck_36"
    t.string "p1_deck_37"
    t.string "p1_deck_38"
    t.string "p1_deck_39"
    t.string "p1_deck_40"
    t.string "p2_deck_1"
    t.string "p2_deck_2"
    t.string "p2_deck_3"
    t.string "p2_deck_4"
    t.string "p2_deck_5"
    t.string "p2_deck_6"
    t.string "p2_deck_7"
    t.string "p2_deck_8"
    t.string "p2_deck_9"
    t.string "p2_deck_10"
    t.string "p2_deck_11"
    t.string "p2_deck_12"
    t.string "p2_deck_13"
    t.string "p2_deck_14"
    t.string "p2_deck_15"
    t.string "p2_deck_16"
    t.string "p2_deck_17"
    t.string "p2_deck_18"
    t.string "p2_deck_19"
    t.string "p2_deck_20"
    t.string "p2_deck_21"
    t.string "p2_deck_22"
    t.string "p2_deck_23"
    t.string "p2_deck_24"
    t.string "p2_deck_25"
    t.string "p2_deck_26"
    t.string "p2_deck_27"
    t.string "p2_deck_28"
    t.string "p2_deck_29"
    t.string "p2_deck_30"
    t.string "p2_deck_31"
    t.string "p2_deck_32"
    t.string "p2_deck_33"
    t.string "p2_deck_34"
    t.string "p2_deck_35"
    t.string "p2_deck_36"
    t.string "p2_deck_37"
    t.string "p2_deck_38"
    t.string "p2_deck_39"
    t.string "p2_deck_40"
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
