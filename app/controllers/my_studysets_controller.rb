class MyStudysetsController < ApplicationController
  def index #show only my studysets
    all_my_studysets = @current_user.studysets
    render json: all_my_studysets, status: :ok
  end

  def show #show only ONE my studysets
    my_studyset = find_studyset
    render json: my_studyset, include: :flashcards, status: :ok, serializer: MyStudysetsSerializer
  end

  def my_ordered_studysets
    all_my_studysets = @current_user.studysets.reorder(:title)
    render json: all_my_studysets, status: :ok
  end

  def update
    my_studyset = find_studyset
    my_studyset.update!(studyset_params)
    render json: my_studyset, status: :accepted
  end

  def destroy
    my_studyset = find_studyset
    my_studyset.destroy
    head :no_content
  end

  private

  def find_studyset
    @current_user.studysets.find(params[:id])
  end

  def studyset_params
    params.permit(:title, :description)
  end
end
