class ReviewsetSerializer < ActiveModel::Serializer
  attributes :id

  has_one :studyset
  has_one :user
end
