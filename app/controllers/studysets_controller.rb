class StudysetsController < ApplicationController
  skip_before_action :authorize, only: :index

  def index
    studysets = Studyset.all
    render json: studysets, status: :ok
  end

  def show
    studyset = Studyset.find(params[:id])
    render json: studyset, status: :ok
  end
  

  def create
    studyset = @current_user.studysets.create!(studyset_params)
    render json: studyset, status: :created
  end

  def update
    studyset = find_studyset
    studyset.update!(studyset_params)
    render json: studyset, status: :accepted
  end

  def destroy
    studyset = find_studyset
    studyset.destroy
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
