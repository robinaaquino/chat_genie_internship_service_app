class AddImageToServiceCategory < ActiveRecord::Migration[7.0]
  def change
    add_column :service_categories, :image, :string
  end
end
