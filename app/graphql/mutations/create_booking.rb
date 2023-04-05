module Mutations
  class CreateBooking < BaseMutation
    argument :booking_date, String, required: true
    argument :name_of_customer, String, required: true
    argument :service_id, ID, required: true
    argument :amount, Integer, required: true
    argument :status, String, required: true
    argument :date, String, required: true
    argument :time, String, required: true

    field :booking, Types::BookingType, null: true
    field :errors, [String], null: false

    def resolve(booking_date: nil, name_of_customer: nil, service_id: nil, amount: nil, status: nil, date: nil, time: nil)
      bookingObject = Booking.new(
        booking_date: booking_date, name_of_customer: name_of_customer, service_id: service_id, amount: amount, status: status, date: date, time: time
      )

      if bookingObject.save
        return {
          booking: bookingObject,
          errors: []
        }
      else
        return {
          booking: nil,
          errors: bookingObject.errors.full_messages
        }
      end
    end
  end
end