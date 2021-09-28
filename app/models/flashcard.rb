class Flashcard < ApplicationRecord
  belongs_to :studyset
  default_scope { order(id: :asc) }
  has_many :reviewcards, dependent: :destroy
  has_many :users, through: :reviewcards

  validates :word, presence: true
end
