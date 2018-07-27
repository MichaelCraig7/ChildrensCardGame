class User < ApplicationRecord
    has_one :character
    has_many :cards, dependent: :destroy
end
