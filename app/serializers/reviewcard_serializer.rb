class ReviewcardSerializer < ActiveModel::Serializer
  attributes :id #, :word, :definition

  has_one :user
  has_one :flashcard

  # def word
  #   self.object.flashcard.word
  # end

  # def definition
  #   self.object.flashcard.definition
  # end


end
