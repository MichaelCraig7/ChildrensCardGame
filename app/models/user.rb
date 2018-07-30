class User < ApplicationRecord
    has_one :character
    has_many :cards, through: :gameroom
end
