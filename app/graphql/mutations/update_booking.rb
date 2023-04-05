module Mutations
  class UpdateBooking < BaseMutation
    argument :id, ID, required: true
    argument :status, String, required: true

    field :booking, Types::BookingType, null: true
    field :errors, [String], null: false

    def resolve(id:, **args)
      bookingObject = Booking.find(id)

      if (bookingObject.update(args))
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