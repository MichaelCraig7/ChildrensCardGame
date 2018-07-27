class CreateGamerooms < ActiveRecord::Migration[5.2]
  def change
    create_table :gamerooms do |t|
      t.references :user, foreign_key: true
      t.references :card, foreign_key: true
      t.integer :apiCard_id

      t.timestamps
    end
  end
end
