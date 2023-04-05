module Mutations
  class UpdateService < BaseMutation
    argument :id, ID, required: true
    argument :details, String, required: false
    argument :store_details, String, required: false
    argument :price, Integer, required: false
    argument :add_on, String, required: false
    argument :image, String, required: false
    argument :service_category_id, ID, required: true

    field :service, Types::ServiceType, null: true
    field :errors, [String], null: false

    def resolve(id:, **args)

      service = Service.find(id)

      if(service.update(args))
        {
          service: service,
          errors: []
        }
      else
        return {
          service: nil,
          errors: service.errors.full_messages
        }
      end

    end
  end
end