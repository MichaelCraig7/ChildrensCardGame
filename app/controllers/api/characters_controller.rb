class Api::CharactersController < ApplicationController
  def index
  end

  def show
    @character = Character.find(params[:id])
    render json: @character
  end

  def create
  end

  def update
  end

  def destroy
  end
end
