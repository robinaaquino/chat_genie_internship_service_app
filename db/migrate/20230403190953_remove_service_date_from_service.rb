class RemoveServiceDateFromService < ActiveRecord::Migration[7.0]
  def change
    remove_reference :services, :service_date, null: false, foreign_key: true
  end
end
