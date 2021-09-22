# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(username: "saltedyi", password: "1234567", email: "hi@gmail.com", bio: "human")
User.create(username: "yi", password: "1234567", email: "hello@gmail.com", bio: "human")

Studyset.create(title: "Math", description: "Calc", user_id: 1)

Studyset.create(title: "Science", description: "Mechanics", user_id: 2)

Flashcard.create(word: "this", definition: "that", studyset_id: 1)

Flashcard.create(word: "whaaat", definition: "okay", studyset_id: 2)
Flashcard.create(word: "k", definition: "fine", studyset_id: 2)

puts "Done Seeding!"
