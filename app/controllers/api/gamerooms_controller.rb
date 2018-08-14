class Api::GameroomsController < ApplicationController
  
  def index
    @gamerooms = Gameroom.all
    render json: @gamerooms
  end

  def show
    @gameroom = Gameroom.find(params[:id])
    render json: @gameroom
  end

  def create
    @gameroom = Gameroom.create!(gameroom_params)
    render json: @gameroom
  end

  def update
    @gameroom = Gameroom.find(params[:id])
    @gameroom.update(gameroom_params)
    render json: @gameroom
  end

  def delete
  end

  private
  def gameroom_params
    params.require(:gameroom).permit(:user_id, :p1, :p2, :turn, :key, :p1_life_points, :p2_life_points, :p1_hand_1, :p1_hand_2, :p1_hand_3, :p1_hand_4, :p1_hand_5, :p1_hand_6, :p1_hand_7, :p2_hand_1, :p2_hand_2, :p2_hand_3, :p2_hand_4, :p2_hand_5, :p2_hand_6, :p2_hand_7, :p1_deck_1, :p1_deck_2, :p1_deck_3, :p1_deck_4, :p2_deck_1, :p2_deck_2, :p2_deck_3, :p2_deck_4)
  end

end
