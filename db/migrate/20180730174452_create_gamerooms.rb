class CreateGamerooms < ActiveRecord::Migration[5.2]
  def change
    create_table :gamerooms do |t|
      t.references :user, foreign_key: true
      t.references :card, foreign_key: true
      t.string :p1
      t.string :p2
      t.string :turn
      t.integer :room
      t.string :key
      t.string :p1_hand_1
      t.string :p1_hand_2
      t.string :p1_hand_3
      t.string :p1_hand_4
      t.string :p1_hand_5
      t.string :p1_hand_6
      t.string :p1_hand_7
      t.string :p2_hand_1
      t.string :p2_hand_2
      t.string :p2_hand_3
      t.string :p2_hand_4
      t.string :p2_hand_5
      t.string :p2_hand_6
      t.string :p2_hand_7
      t.string :p1Monster1
      t.string :p1Monster2
      t.string :p1Monster3
      t.string :p1Monster4
      t.string :p1Monster5
      t.string :p1Magic1
      t.string :p1Magic2
      t.string :p1Magic3
      t.string :p1Magic4
      t.string :p1Magic5
      t.string :p2Monster1
      t.string :p2Monster2
      t.string :p2Monster3
      t.string :p2Monster4
      t.string :p2Monster5
      t.string :p2Magic1
      t.string :p2Magic2
      t.string :p2Magic3
      t.string :p2Magic4
      t.string :p2Magic5
      t.string :p1_deck_1
      t.string :p1_deck_2
      t.string :p1_deck_3
      t.string :p1_deck_4
      t.string :p2_deck_1
      t.string :p2_deck_2
      t.string :p2_deck_3
      t.string :p2_deck_4
      t.integer :p1_life_points
      t.integer :p2_life_points

      t.timestamps
    end
  end
end
