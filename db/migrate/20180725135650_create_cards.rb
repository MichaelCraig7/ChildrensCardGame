class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.string :cardInfo
      t.references :character

      t.timestamps
    end
  end
end
