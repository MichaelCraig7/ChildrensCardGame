class CreateGamerooms < ActiveRecord::Migration[5.2]
  def change
    create_table :gamerooms do |t|
      t.references :user, foreign_key: true
      t.references :card, foreign_key: true
      t.string :p1
      t.string :p2
      t.json :payload
      t.integer :room
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
      t.integer :p1_life_points
      t.integer :p2_life_points

      t.timestamps
    end
  end
end
