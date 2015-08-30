class Question < ActiveRecord::Base
  default_scope { order('position ASC') }
  validates_inclusion_of :subject, in: VARIABLE_OPTIONS['subject']
  validates_inclusion_of :toss_up_class, in: VARIABLE_OPTIONS['class']
  validates_inclusion_of :bonus_class, in: VARIABLE_OPTIONS['class']

  belongs_to :question_set, touch: true
end
