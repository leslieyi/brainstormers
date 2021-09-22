class UsersController < ApplicationController

    skip_before_action :authorize, only: :create

    def create 
        user = User.create!(user_params)
        session[:user_id] = user.id  #saves the user's ID in the session hash
        render json: user, status: :created 
    end

    def show 
        render json: @current_user, status: :accepted 
    end


    private 
    def user_params 
        params.permit(:email, :username, :password, :bio)
    end
end
