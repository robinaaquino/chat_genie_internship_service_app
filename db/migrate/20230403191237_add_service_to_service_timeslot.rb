class AddServiceToServiceTimeslot < ActiveRecord::Migration[7.0]
  def change
    add_reference :service_timeslots, :service, null: false, foreign_key: true
  end
end
