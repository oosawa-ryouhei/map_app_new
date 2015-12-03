class AddDatasetToWaterparks < ActiveRecord::Migration
  def change
    add_column :waterparks, :dataset, :string
  end
end
