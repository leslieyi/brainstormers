class Studyset < ApplicationRecord
  belongs_to :user
  has_many :flashcards, dependent: :destroy 

  validates :title, presence: true, uniqueness: true 



  # def total_flashcards
  #   return self.flashcards.count
  #   # byebug
  #   # flashcards = Flashcard.find(self.id)
  #   # flashcards.length
  # end

end
