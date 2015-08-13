class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.string :subject
      t.string :toss_up_class
      t.string :bonus_class
      t.text :toss_up_text
      t.text :bonus_text
      t.string :toss_up_answer
      t.string :bonus_answer
      t.text :references
      t.boolean :flagged, default: false
      t.boolean :randomize, default: false
      t.belongs_to :question_set, index: true

      t.timestamps null: false
    end
  end
end
