class Api::GamesController < ApplicationController
  def index
    @games = Game.all
    render json: @games
  end

  def show
    @game = Game.find(params[:id])
    render json: @game
  end

  def create
    @game = Game.create(game_params)
    render json: @game
  end

  def update
  end

  def destroy
    @game = Game.destroy(params[:id])
    @game.destroy
    render status: :ok
  end

  private
  def game_params
    params.require(:game).permit()
  end

end
