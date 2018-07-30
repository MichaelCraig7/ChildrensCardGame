class Game < ApplicationRecord
    has_many :users, dependent: :destroy
    has_one :gameroom
end
