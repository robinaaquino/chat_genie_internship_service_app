module Mutations
  class CreateTimeslot < BaseMutation
    argument :time, String, required: true
    argument :slots, Integer, required: true
    argument :service_id, ID, required: true

    field :service_timeslot, Types::ServiceTimeslotType, null: true
    field :errors, [String], null: false

    def resolve(time: nil, slots: nil, service_id: nil)
      timeslotObject = ServiceTimeslot.new(
        time: time,
        slots: slots,
        service_id: service_id,
      )

      if timeslotObject.save
        return {
          service_timeslot: timeslotObject,
          errors: []
        }
      else
        return {
          service_timeslot: nil,
          errors: timeslotObject.errors.full_messages
        }
      end
    end
  end
end