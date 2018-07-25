class Api::UsersController < ApplicationController
  def index
  end

  def show
  end

  def create
    @user = User.create(user_params)
    render json: @user
  end

  def update 
  end

  def destroy
  end

  private
  def user_params
    params.require(:user).permit(:userName)
  end

end
