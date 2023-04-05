module Mutations
  class DeleteTimeslot < BaseMutation
    argument :id, ID, required: true

    field :service_timeslot, Types::ServiceTimeslotType, null: true
    field :errors, [String], null: false

    def resolve(id:)
      timeslotObject = ServiceTimeslot.find(id)

      if(timeslotObject.destroy)
        {
          service_timeslot: timeslotObject,
          errors: []
        }
      else
        puts timeslotObject.errors.full_messages
        return {
          service_timeslot: nil,
          errors: timeslotObject.errors.full_messages
        }
      end
    end
  end
end
