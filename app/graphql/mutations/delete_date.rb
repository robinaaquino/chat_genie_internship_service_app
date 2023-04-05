module Mutations
  class DeleteDate < BaseMutation
    argument :id, ID, required: true

    field :service_date, Types::ServiceDateType, null: true
    field :errors, [String], null: false

    def resolve(id:)
      dateObject = ServiceDate.find(id)

      if(dateObject.destroy)
        {
          service_date: dateObject,
          errors: []
        }
      else
        puts dateObject.errors.full_messages
        return {
          service_date: nil,
          errors: dateObject.errors.full_messages
        }
      end
    end
  end
end
