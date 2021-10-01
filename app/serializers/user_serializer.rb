class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :username, :bio

  has_many :studysets
end
