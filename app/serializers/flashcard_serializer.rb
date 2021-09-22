class FlashcardSerializer < ActiveModel::Serializer
  attributes :id, :word, :definition
  has_one :studyset

 
end
