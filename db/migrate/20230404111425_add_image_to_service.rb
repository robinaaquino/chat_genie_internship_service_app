class AddImageToService < ActiveRecord::Migration[7.0]
  def change
    add_column :services, :image, :string
  end
end
