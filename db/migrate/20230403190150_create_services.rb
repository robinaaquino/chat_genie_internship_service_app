class CreateServices < ActiveRecord::Migration[7.0]
  def change
    create_table :services do |t|
      t.string :details
      t.string :store_details
      t.integer :price
      t.string :add_on
      t.references :service_category, null: false, foreign_key: true
      t.references :service_date, null: false, foreign_key: true
      t.references :service_timeslot, null: false, foreign_key: true

      t.timestamps
    end
  end
end
