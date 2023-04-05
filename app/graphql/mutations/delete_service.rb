module Mutations
  class DeleteService < BaseMutation
    argument :id, ID, required: true

    field :service, Types::ServiceType, null: true
    field :errors, [String], null: false

    def resolve(id:)
      service = Service.find(id)

      if(service.destroy)
        {
          service: service,
          errors: []
        }
      else
        puts service.errors.full_messages
        return {
          service: nil,
          errors: service.errors.full_messages
        }
      end
    end
  end
end
