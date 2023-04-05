module Mutations
  class UpdateTimeslot < BaseMutation
    argument :id, ID, required: true
    argument :slots, Integer, required: true

    field :service_timeslot, Types::ServiceTimeslotType, null: true
    field :errors, [String], null: false

    def resolve(id:, **args)
      timeslotObject = ServiceTimeslot.find(id)

      if (timeslotObject.update(args))
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