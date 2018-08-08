class CreateGamerooms < ActiveRecord::Migration[5.2]
  def change
    create_table :gamerooms do |t|
      t.references :user, foreign_key: true
      t.references :card, foreign_key: true
      t.json :payload
      t.string :p1_hand_1
      t.string :p1_hand_2
      t.string :p1_hand_3
      t.string :p2_hand_1
      t.string :p2_hand_2
      t.string :p2_hand_3
      t.integer :p1_life_points
      t.integer :p2_life_points

      t.timestamps
    end
  end
end
