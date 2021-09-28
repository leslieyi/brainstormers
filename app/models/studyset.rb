class Studyset < ApplicationRecord
  belongs_to :user
  has_many :flashcards, dependent: :destroy

  has_many :users
  has_many :reviewsets, through: :users

  validates :title, presence: true
end
