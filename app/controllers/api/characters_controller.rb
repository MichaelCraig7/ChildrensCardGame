class Api::CharactersController < ApplicationController
  def index
    @characters = Character.all
    render json: @characters
  end

  def show
    @character = Character.find(params[:id])
    render json: @character
  end

  def create
    @character = Character.create(character_params)
    render json: @character
  end

  def update
  end

  def destroy
  end

  private
  def character_params 
    params.require(:character).permit(:name, :image)
  end

end
