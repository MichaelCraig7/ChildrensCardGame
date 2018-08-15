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
    params.require(:gameroom).permit(:user_id, :p1, :p2, :turn, :key, :p1_life_points, :p2_life_points, :p1_hand_1, :p1_hand_2, :p1_hand_3, :p1_hand_4, :p1_hand_5, :p1_hand_6, :p1_hand_7, :p2_hand_1, :p2_hand_2, :p2_hand_3, :p2_hand_4, :p2_hand_5, :p2_hand_6, :p2_hand_7, :p1_deck_1, :p1_deck_2, :p1_deck_3, :p1_deck_4, :p2_deck_1, :p2_deck_2, :p2_deck_3, :p2_deck_4, :p1Monster1, :p1Monster2, :p1Monster3, :p1Monster4, :p1Monster5, :p1Magic1, :p1Magic2, :p1Magic3, :p1Magic4, :p1Magic5, :p2Monster1, :p2Monster2, :p2Monster3, :p2Monster4, :p2Monster5, :p2Magic1, :p2Magic2, :p2Magic3, :p2Magic4, :p2Magic5)
  end

end
