class AddColorToWaterparks < ActiveRecord::Migration
  def change
    add_column :waterparks, :electric_conductivity, :float
    add_column :waterparks, :color, :string
  end
end
