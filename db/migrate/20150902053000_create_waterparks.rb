class CreateWaterparks < ActiveRecord::Migration
  def change
    create_table :waterparks do |t|
      t.integer :user_id
      t.float :e_coli
      t.float :coliform_bacteria
      t.float :cod
      t.float :water_temperature
      t.float :total_residual_cl
      t.float :nh3_n
      t.string :weather
      t.datetime :observed
      t.string :place
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
    # add_index :microposts, [:user_id, :created_at]
  end
end
