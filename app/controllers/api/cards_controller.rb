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
    @card = Card.create()
    render json: @card
  end

  def update
  end

  def destroy
  end
end
