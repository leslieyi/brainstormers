class StudysetSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :total_flashcards

  # has_one :user

  def total_flashcards
    "#{self.object.flashcards.count}"
  end
end
