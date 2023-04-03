class CreateServiceDates < ActiveRecord::Migration[7.0]
  def change
    create_table :service_dates do |t|
      t.string :date

      t.timestamps
    end
  end
end
