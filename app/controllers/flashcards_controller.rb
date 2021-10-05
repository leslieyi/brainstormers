class FlashcardsController < ApplicationController
  skip_before_action :authorize, only: :index

  def index
    flashcards = Flashcard.all
    render json: flashcards, status: :ok
  end

  def sanitizer
    Rails::Html::SafeListSanitizer.new
  end

  def show
    flashcard = find_flashcard
    render json: flashcard, status: :ok
  end

  def create
    flashcard = Flashcard.create!(flashcard_params)
    render json: flashcard, status: :created
  end

  def update
    flashcard = find_flashcard
    flashcard.update!(flashcard_params)
    render json: flashcard, status: :accepted
  end

  def destroy
    flashcard = find_flashcard
    flashcard.destroy
    head :no_content
  end

  private

  def find_flashcard
    Flashcard.find(params[:id])
  end

  def flashcard_params
    permitted = params.permit(:word, :definition, :studyset_id)
    sanitized = permitted.to_h
    if sanitized.key?(:definition)
      sanitized[:definition] = sanitizer.sanitize(sanitized[:definition])
    end
    sanitized
  end
end
