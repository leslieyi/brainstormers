# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require "faker"
puts "Seeding"

User.create(username: "leslie", password: "123123", email: "leslie@gmail.com", bio: "fullstack dev and pianist") #1
User.create(username: "baudouin", password: "123123", email: "baudouin@gmail.com", bio: Faker::Quote.famous_last_words) #2
User.create(username: "adam", password: "123123", email: "adam@gmail.com", bio: Faker::Quote.famous_last_words) #3
User.create(username: "alec", password: "123123", email: "alec@gmail.com", bio: Faker::Quote.famous_last_words) #4
User.create(username: "eli", password: "123123", email: "eli@gmail.com", bio: Faker::Quote.famous_last_words) #5
User.create(username: "mari", password: "123123", email: "mari@gmail.com", bio: Faker::Quote.famous_last_words) #6
User.create(username: "tara", password: "123123", email: "tara@gmail.com", bio: Faker::Quote.famous_last_words) #7
User.create(username: "zach", password: "123123", email: "zach@gmail.com", bio: Faker::Quote.famous_last_words) #8
User.create(username: "eric", password: "123123", email: "eric@gmail.com", bio: Faker::Quote.famous_last_words) #9
User.create(username: "leonna", password: "123123", email: "leonna@gmail.com", bio: Faker::Quote.famous_last_words) #10
User.create(username: "troy", password: "123123", email: "troy@gmail.com", bio: Faker::Quote.famous_last_words) #11

Studyset.create(title: "Beethoven Sonatas-I", description: "Listening Exam Part 1", user_id: 1) #studysetId 1
Studyset.create(title: "Beethoven Sonatas-II", description: "Listening Exam Part 2", user_id: 1) #studysetId 2
Studyset.create(title: "French", description: "learning French", user_id: 2) #studysetid 3
Studyset.create(title: "Phase 1", description: "Flatiron SE phase 1, Javascript", user_id: 3) #studysetid 4
Studyset.create(title: "Phase 2", description: "Flatiron SE phase 2, React", user_id: 4) #studysetid 5
Studyset.create(title: "Phase 3", description: "Flatiron SE phase 3, Ruby", user_id: 5) #studysetid 6
Studyset.create(title: "Phase 4", description: "Flatiron SE phase 4, Ruby on Rails", user_id: 6) #studysetid 7
Studyset.create(title: "Phase 5", description: "Putting it all together!", user_id: 7) #studysetid 8
Studyset.create(title: "Career Coaching", description: "Resume", user_id: 8) #studysetid 8
Studyset.create(title: "Korean", description: "Learn Simple Expressions!", user_id: 2) #studysetid 9


Flashcard.create(word: "Op. 2, No. 1", definition: "F minor (1795) - Vienna", studyset_id: 1)
Flashcard.create(word: "Op. 2, No. 2", definition: "A Major (1795) - Vienna", studyset_id: 1)
Flashcard.create(word: "Op. 2, No. 3", definition: "C Major (1795) - Vienna", studyset_id: 1)
Flashcard.create(word: "Op. 7", definition: "E-flat Major Grand Sonata (1798) - Vienna", studyset_id: 1)

Flashcard.create(word: "Op. 10, No. 1", definition: "C minor (1797) - Vienna", studyset_id: 1)
Flashcard.create(word: "Op. 10, No. 2", definition: "F Major (1797) - Vienna", studyset_id: 1)
Flashcard.create(word: "Op. 10, No. 3", definition: "D Major (1798) - Vienna", studyset_id: 1)

Flashcard.create(word: "Op. 13", definition: "C minor Pathetique (1798) - Vienna", studyset_id: 1)
Flashcard.create(word: "Op. 14, No. 1", definition: "E Major (1798) - Vienna", studyset_id: 1)
Flashcard.create(word: "Op. 14, No. 2", definition: "G Major (1799) - Vienna", studyset_id: 1)

Flashcard.create(word: "Op. 22", definition: "B-flat Major (1800) - Leipzig", studyset_id: 1)
Flashcard.create(word: "Op. 26", definition: "A-flat Major (1801) - Vienna", studyset_id: 1)

Flashcard.create(word: "Op. 27, No. 1", definition: "E-flat Major (1801) - Vienna", studyset_id: 1)
Flashcard.create(word: "Op. 27, No. 2", definition: "C-sharp minor (1801) - Vienna", studyset_id: 1)
Flashcard.create(word: "Op. 28", definition: "D Major <strong>Pastoral</strong> (1801) - Vienna", studyset_id: 1)

Flashcard.create(word: "Op. 31, No. 1", definition: "G Major (1802) - Zurich", studyset_id: 2)
Flashcard.create(word: "Op. 31, No. 2", definition: "D minor Tempest(1802) - Zurich", studyset_id: 2)
Flashcard.create(word: "Op. 31, No. 3", definition: "E-flat Major The Hunt (1802) - Zurich & London", studyset_id: 2)
Flashcard.create(word: "Op. 49, No. 1", definition: "G minor (1797) - Vienna", studyset_id: 2)
Flashcard.create(word: "Op. 49, No. 2", definition: "G Major (1796) - Vienna", studyset_id: 2)
Flashcard.create(word: "Op. 53", definition: "C Major <strong>Waldstein</strong> (1804) - Vienna", studyset_id: 2)
Flashcard.create(word: "Op. 54, No. 2", definition: "F Major (1804) - Vienna", studyset_id: 2)
Flashcard.create(word: "Op. 57", definition: "F minor <strong>Appssionata</strong> (1805) - Vienna", studyset_id: 2)
Flashcard.create(word: "Op. 78", definition: "<strong>F-sharp Major <em>A Therese</em> (1809) - Leipzig & London</strong>",studyset_id: 2)
Flashcard.create(word: "Op. 79", definition: "G Major (1809) - Leipzig & London",studyset_id: 2)
Flashcard.create(word: "Op. 81", definition: "E-flat Major <em>Les Adieux</em>(1810) - Leipzig & London",studyset_id: 2)
Flashcard.create(word: "Op. 90", definition: "E minor (1814) - Vienna",studyset_id: 2)
Flashcard.create(word: "Op. 101", definition: "A Major (1816) - Vienna",studyset_id: 2)
Flashcard.create(word: "Op. 106", definition: "B-flat <em>Hammerklavier</em> (1818) - Vienna & London",studyset_id: 2)
Flashcard.create(word: "Op. 109", definition: "E Major (1820) - Berlin",studyset_id: 2)
Flashcard.create(word: "Op. 110", definition: "A-flat Major (1822) - Paris, Berlin, Vienna, London",studyset_id: 2)
Flashcard.create(word: "Op. 111", definition: "C minor (1822) - Paris, Berlin, Vienna, London",studyset_id: 2)

Flashcard.create(word: "What is to thank someone (formal/tenir)", definition: "tenir à faire quelque chose.",studyset_id: 3)
Flashcard.create(word: "Don't brag. You will regret it.", definition: "Ne te vante pas. Tu vas le regrettes.",studyset_id: 3)
Flashcard.create(word: "Don't get your hope up", definition: "Ne vous emballez pas",studyset_id: 3)
Flashcard.create(word: "Let's not sit here", definition: "On ne s'assoit pas ici.",studyset_id: 3)
Flashcard.create(word: "You're kidding me.", definition: "Tu te moques de moi.",studyset_id: 3)
Flashcard.create(word: "Eggs over easy", definition: "Oeufs du plat baveux.",studyset_id: 3)
Flashcard.create(word: "Don't get upset", definition: "Ne te vexe pas",studyset_id: 3)
Flashcard.create(word: "I am jet lagged", definition: "Je suis décalé",studyset_id: 3)
Flashcard.create(word: "You're kidding!", definition: "Tu rigoles.",studyset_id: 3)
Flashcard.create(word: "You're kidding me!", definition: "Tu te moque de moi?",studyset_id: 3)
Flashcard.create(word: "Remember his/her name", definition: "Souviens-toi de son nom",studyset_id: 3)


puts "Done Seeding!"
