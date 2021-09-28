class ReviewcardsController < ApplicationController
  skip_before_action :authorize, only: :index

  def index
    reviewcards = Reviewcard.all
    render json: reviewcards, status: :ok
  end

  def show
    reviewcard = find_reviewcard
    render json: reviewcard, status: :ok
  end

  def create
    reviewcard = Reviewcard.create(reviewcard_params)
    render json: reviewcard, status: :created
  end

  def destroy
    reviewcard = find_reviewcard
    reviewcard.destroy
    head :no_content
  end

  private

  def find_reviewcard
    Reviewcard.find(params[:id])
  end

  def reviewcard_params
    params.permit(:flashcard_id, :user_id)
  end
end
