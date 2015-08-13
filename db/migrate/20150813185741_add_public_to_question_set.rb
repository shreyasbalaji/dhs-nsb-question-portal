class AddPublicToQuestionSet < ActiveRecord::Migration
  def change
    add_column :question_sets, :public, :boolean, :default => false
  end
end
