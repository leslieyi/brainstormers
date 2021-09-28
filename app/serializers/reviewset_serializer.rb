class ReviewsetSerializer < ActiveModel::Serializer
  attributes :id #,:title, :description
  
  has_one :studyset

  # def title
  #   self.object.studyset.title
  # end

  # def description
  #   self.object.studyset.description
  # end
end
