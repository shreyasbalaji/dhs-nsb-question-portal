module QuestionsHelper
  def toss_up_type(question)
    if question.toss_up_class == "MC"
      return "Multiple Choice"
    else
      return "Free Response"
    end
  end

  def bonus_type(question)
    if question.bonus_class == "MC"
      return "Multiple Choice"
    else
      return "Free Response"
    end
  end
end
