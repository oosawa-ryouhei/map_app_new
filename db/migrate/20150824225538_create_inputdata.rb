class CreateInputdata < ActiveRecord::Migration
  def change
    create_table :inputdata do |t|
      t.float :Escherichia_coli #大腸菌
      t.float :Coliform_bacteria #大腸菌群
      t.float :COD
      t.float :Temperature
      t.float :Total_residual_hlorine #総残留塩素
      t.float :Ammonium_nitrogen #アンモニウム態窒素
      t.float :pH
      t.string :weather

      t.timestamps
    end
  end
end
