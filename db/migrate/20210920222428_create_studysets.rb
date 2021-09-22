class CreateStudysets < ActiveRecord::Migration[6.1]
  def change
    create_table :studysets do |t|
      t.string :title
      t.text :description
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
