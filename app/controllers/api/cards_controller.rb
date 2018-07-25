class Api::CardsController < ApplicationController
  def index
    @cards = Card.all
    render json: @cards
  end

  def show
    @card = Card.find(params[:id])
    render json: @card
  end

  def create
  end

  def update
  end

  def destroy
  end
end
