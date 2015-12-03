class AddOrgToWaterparks < ActiveRecord::Migration
  def change
    add_column :waterparks, :ecoli_color, :string
    add_column :waterparks, :aquatic_organism, :string
  end
end
