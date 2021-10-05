class Studyset < ApplicationRecord
  default_scope { order(id: :asc) }
  belongs_to :user
  has_many :flashcards, dependent: :destroy

  has_many :reviewsets, dependent: :destroy

  validates :title, presence: true
end
