class Flashcard < ApplicationRecord
  belongs_to :studyset
  
  has_many :reviewcards, dependent: :destroy
  has_many :users, through: :reviewcards

                                 

  validates :word, presence: true, uniqueness: true
end
