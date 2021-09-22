class Reviewcard < ApplicationRecord
  belongs_to :user
  belongs_to :flashcard
end
