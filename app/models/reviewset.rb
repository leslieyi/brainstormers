class Reviewset < ApplicationRecord
  belongs_to :user
  belongs_to :studyset
end
