class ReviewsetsController < ApplicationController
 # skip_before_action :authorize, only: :index

  def index
    reviewsets = @current_user.reviewsets
    render json: reviewsets, status: :ok, include: ["studyset.user"]
  end


  def create
    reviewset = Reviewset.create(reviewset_params)
    render json: reviewset, status: :created
  end

  def destroy
    reviewset = find_reviewset
    reviewset.destroy
    head :no_content
  end

  private

  def find_reviewset
    Reviewset.find(params[:id])
  end

  def reviewset_params
    params.permit(:studyset_id, :user_id)
  end
end
