class CreateFlashcards < ActiveRecord::Migration[6.1]
  def change
    create_table :flashcards do |t|
      t.belongs_to :studyset, null: false, foreign_key: true
      t.string :word
      t.text :definition

      t.timestamps
    end
  end
end
