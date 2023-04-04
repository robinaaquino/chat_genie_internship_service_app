class AddServiceCategoryToService < ActiveRecord::Migration[7.0]
  def change
    add_reference :services, :service_category, null: false, foreign_key: true
  end
end
