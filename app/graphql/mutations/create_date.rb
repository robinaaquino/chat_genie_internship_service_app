module Mutations
  class CreateDate < BaseMutation
    argument :date, String, required: true
    argument :service_id, ID, required: true

    field :service_date, Types::ServiceDateType, null: true
    field :errors, [String], null: false

    def resolve(date: nil, service_id: nil)
      dateObject = ServiceDate.new(
        date: date,
        service_id: service_id,
      )

      if dateObject.save
        return {
          service_date: dateObject,
          errors: []
        }
      else
        return {
          service_date: nil,
          errors: dateObject.errors.full_messages
        }
      end
    end
  end
end