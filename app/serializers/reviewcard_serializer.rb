class ReviewcardSerializer < ActiveModel::Serializer
  attributes :id, :word, :definition

  def word
    self.object.flashcard.word
  end

  def definition
    self.object.flashcard.definition
  end

  has_one :user
  has_one :flashcard
end
