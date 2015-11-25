class WaterparksController < ApplicationController
  # before_action :signed_in_user, only: [:create, :destroy]
  # before_action :correct_user,   only: :destroy
  
  def index
    @waterparks = Waterpark.all
  end
  
  def import
    # fileはtmpに自動で一時保存される
    Waterpark.import(params[:file])
    redirect_to root_url, notice: "データを追加しました。"
  end

  # def create
  #   @waterpark = current_user.waterparks.build(waterpark_params)
  #   if @waterpark.save
  #     flash[:success] = "Waterpark created!"
  #     redirect_to root_url
  #   else
  #     render 'users/index'
  #   end
  # end

  # def destroy
  #   @waterpark.destroy
  #   redirect_to root_url
  # end
  
  
  # private

  #   def waterpark_params
  #     params.require(:waterpark).permit(:place)
  #   end
    
  #   def correct_user
  #     @waterpark = current_user.waterparks.find_by(id: params[:id])
  #     redirect_to root_url if @waterpark.nil?
  #   end
end