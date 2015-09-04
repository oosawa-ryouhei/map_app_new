class AddPhToWaterpark < ActiveRecord::Migration
  def change
    add_column :waterparks, :ph, :float
  end
end
