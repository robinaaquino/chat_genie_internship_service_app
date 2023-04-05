module Mutations
  class UpdateServiceCategory < BaseMutation
    argument :id, ID, required: true
    argument :name, String, required: true
    argument :description, String, required: true
    argument :image, String, required: true

    field :service_category, Types::ServiceCategoryType, null: true
    field :errors, [String], null: false

    def resolve(id:, **args)

      category = ServiceCategory.find(id)

      if(category.update(args))
        {
          service_category: category,
          errors: []
        }
      else
        return {
          service_category: nil,
          errors: category.errors.full_messages
        }
      end

    end
  end
end