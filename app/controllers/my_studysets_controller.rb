class MyStudysetsController < ApplicationController
  #skip_before_action :authorize, only: :index

  def index #show only my studysets
    all_my_studysets = @current_user.studysets
    render json: all_my_studysets, status: :ok
  end

  def show #show only ONE my studysets
    my_studyset = find_studyset
    render json: my_studyset, status: :ok
  end

  private

  def find_studyset
    @current_user.studysets.find(params[:id])
  end
end
