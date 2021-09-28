class FlashcardsController < ApplicationController
  #before_action :find_flashcard, only: [:show, :update, :destroy]
  #runs everytime the action runs

  skip_before_action :authorize, only: :index

  def index
    flashcards = Flashcard.all
    render json: flashcards, status: :ok
  end

  def show
    flashcard = find_flashcard
    render json: flashcard, status: :ok
  end
  
  def ordered_flashcards
    flashcards = Flashcard.reorder(:word)
    render json: flashcards, status: :ok
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
    params.permit(:word, :definition, :studyset_id)
  end
end
