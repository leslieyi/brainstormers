class ReviewcardSerializer < ActiveModel::Serializer
  attributes :id
  has_one :user
  has_one :flashcard
end
