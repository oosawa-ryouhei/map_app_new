class CreateWaterparks < ActiveRecord::Migration
  def change
    create_table :waterparks do |t|
      t.float :escherichia_coli
      t.float :coliform_bacteria
      t.float :COD
      t.float :water_temperature
      t.float :total_residual_chlorine
      t.float :ammonium_nitrogen
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
