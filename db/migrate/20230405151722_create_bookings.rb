class CreateBookings < ActiveRecord::Migration[7.0]
  def change
    create_table :bookings do |t|
      t.string :booking_date
      t.string :name_of_customer
      t.references :service, null: false, foreign_key: true
      t.integer :amount
      t.string :status

      t.timestamps
    end
  end
end
