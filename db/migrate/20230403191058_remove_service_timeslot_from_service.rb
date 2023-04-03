class RemoveServiceTimeslotFromService < ActiveRecord::Migration[7.0]
  def change
    remove_reference :services, :service_timeslot, null: false, foreign_key: true
  end
end
