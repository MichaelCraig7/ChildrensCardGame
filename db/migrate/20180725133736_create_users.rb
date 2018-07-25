class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :userName
      t.integer :playerNum
      t.integer :lifePoints
      t.references :game

      t.timestamps
    end
  end
end
