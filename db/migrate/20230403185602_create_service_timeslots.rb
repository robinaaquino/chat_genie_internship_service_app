class CreateServiceTimeslots < ActiveRecord::Migration[7.0]
  def change
    create_table :service_timeslots do |t|
      t.string :time
      t.integer :slots

      t.timestamps
    end
  end
end
