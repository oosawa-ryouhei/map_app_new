class CreateWaterparks < ActiveRecord::Migration
  def change
    create_table :waterparks do |t|
      t.float :escherichia_coli #大腸菌
      t.float :coliform_bacteria #大腸菌群
      t.float :COD
      t.float :water_temperature
      t.float :total_residual_chlorine #総残留塩素
      t.float :ammonium_nitrogen #アンモニウム態窒素
      t.float :pH
      t.string :weather
      t.datetime :observed
      t.string :place
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
