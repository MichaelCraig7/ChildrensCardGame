class Api::GameboardsController < ApplicationController
  def index
    @gameboards = CreateJoinTableUsersCard.all
    render json: @gameboards
  end

  def show
    @gameboard = CreateJoinTableUsersCard.find(params[:id])
    render json: @gameboard
  end

  def create
    @gameboard = CreateJoinTableUsersCard.create(gameboard_params)
    render json: @gameboard
  end

  def update
  end

  def delete
  end

  private
  def gameboard_params
    params.require(:gameboard).permit(:user_id, :card_id, :apiCard_id)
  end
end
