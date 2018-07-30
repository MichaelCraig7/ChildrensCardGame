class Gameroom < ApplicationRecord
  belongs_to :user
  belongs_to :card, optional: true
  belongs_to :game, optional: true
end
