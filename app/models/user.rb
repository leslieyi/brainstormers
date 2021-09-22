class User < ApplicationRecord
  has_many :studysets

  has_many :reviewcards
  has_many :flashcards, through: :reviewcards

  has_secure_password

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }

  validates :username, presence: true, uniqueness: true
  validates :bio, length: { maximum: 500 }
end
