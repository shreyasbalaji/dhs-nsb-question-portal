class QuestionsController < ApplicationController
  before_action :set_question, only: [:show, :edit, :update, :destroy]

  def index
    authenticate_user!
    @question_set = QuestionSet.find(params[:question_set_id])
  end

  def show
    authenticate_user!
    check_has_access!
    @question_list = @question.question_set.questions.order('position ASC')
  end

  def new
    authenticate_user!
    @question_set = QuestionSet.find(params[:question_set_id])
    @question = Question.new
  end

  def create
    authenticate_user!
    @question_set = QuestionSet.find(params[:question_set_id])
    num_questions = @question_set.questions.length
    @question = @question_set.questions.build(question_params)
    @question.position = num_questions + 1
    respond_to do |format|
      if @question.save
        format.html { redirect_to @question, notice: 'Question saved successfully' }
      else
        format.html { render :new }
      end
    end
  end

  def edit
    authenticate_user!
    check_has_access!
  end

  def update
    authenticate_user!
    check_has_access!
    respond_to do |format|
      if @question.update(question_params)
        format.html { redirect_to @question, notice: 'Question set was successfully updated.' }
        format.json { render :show, status: :ok, location: @question_set }
      else
        format.html { render :edit }
        format.json { render json: @question.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    authenticate_user!
  end

  private
  def set_question
    @question = Question.find(params[:id])
  end

  def question_params
    params.require(:question).permit(:subject, :toss_up_class, :bonus_class, :references, :toss_up_text, :bonus_text, :toss_up_answer, :bonus_answer) # list goes here
  end

  def check_has_access!
    if !current_user.admin && current_user.email != @question.question_set.user.email && !@question.question_set.public
      redirect_to question_sets_url, alert: "You don't have permission to access that"
    end
  end
end
