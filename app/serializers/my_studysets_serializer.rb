class MyStudysetsSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :total_flashcards
  has_many :flashcards

  def total_flashcards
    "#{self.object.flashcards.count}"
  end
end
