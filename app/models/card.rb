class Card < ApplicationRecord
    belongs_to :character
    has_many :users, 
end
