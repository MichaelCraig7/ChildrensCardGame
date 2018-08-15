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
    params.require(:gameroom).permit(:user_id, :p1, :p2, :player1Key, :player2Key, :turn, :key, :p1_life_points, :p2_life_points, :p1_hand_1, :p1_hand_2, :p1_hand_3, :p1_hand_4, :p1_hand_5, :p1_hand_6, :p1_hand_7, :p2_hand_1, :p2_hand_2, :p2_hand_3, :p2_hand_4, :p2_hand_5, :p2_hand_6, :p2_hand_7, :p1_deck_1, :p1_deck_2, :p1_deck_3, :p1_deck_4, :p1_deck_5, :p1_deck_6, :p1_deck_7, :p1_deck_8, :p1_deck_9, :p1_deck_10, :p1_deck_11, :p1_deck_12, :p1_deck_13, :p1_deck_14, :p1_deck_15, :p1_deck_16, :p1_deck_17, :p1_deck_18, :p1_deck_19, :p1_deck_20, :p1_deck_21, :p1_deck_22, :p1_deck_23, :p1_deck_24, :p1_deck_25, :p1_deck_26, :p1_deck_27, :p1_deck_28, :p1_deck_29, :p1_deck_30, :p1_deck_31, :p1_deck_32, :p1_deck_33, :p1_deck_34, :p1_deck_35, :p1_deck_36, :p1_deck_37, :p1_deck_38, :p1_deck_39, :p1_deck_40, :p2_deck_1, :p2_deck_2, :p2_deck_3, :p2_deck_4, :p2_deck_5, :p2_deck_6, :p2_deck_7, :p2_deck_8, :p2_deck_9, :p2_deck_10, :p2_deck_11, :p2_deck_12, :p2_deck_13, :p2_deck_14, :p2_deck_15, :p2_deck_16, :p2_deck_17, :p2_deck_18, :p2_deck_19, :p2_deck_20, :p2_deck_21, :p2_deck_22, :p2_deck_23, :p2_deck_24, :p2_deck_25, :p2_deck_26, :p2_deck_27, :p2_deck_28, :p2_deck_29, :p2_deck_30, :p2_deck_31, :p2_deck_32, :p2_deck_33, :p2_deck_34, :p2_deck_35, :p2_deck_36, :p2_deck_37, :p2_deck_38, :p2_deck_39, :p2_deck_40, :p1Monster1, :p1Monster2, :p1Monster3, :p1Monster4, :p1Monster5, :p1Magic1, :p1Magic2, :p1Magic3, :p1Magic4, :p1Magic5, :p2Monster1, :p2Monster2, :p2Monster3, :p2Monster4, :p2Monster5, :p2Magic1, :p2Magic2, :p2Magic3, :p2Magic4, :p2Magic5)
  end

end
