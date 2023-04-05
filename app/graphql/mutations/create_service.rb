module Mutations
  class CreateService < BaseMutation
    argument :details, String, required: true
    argument :store_details, String, required: true
    argument :price, Integer, required: true
    argument :add_on, String, required: true
    argument :image, String, required: true
    argument :service_category_id, ID, required: true

    field :service, Types::ServiceType, null: true
    field :errors, [String], null: false

    def resolve(details: nil, store_details: nil, price: nil, add_on: nil, image: nil, service_category_id: nil)
      service = Service.new(
        details: details, store_details: store_details, price: price, add_on: add_on, image: image, service_category_id: service_category_id
      )
      if service.save
        return {
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