class Gameroom < ApplicationRecord
    belongs_to :users
    belongs_to :cards
end
