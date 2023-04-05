module Mutations
  class UpdateServiceCategory < BaseMutation
    argument :id, ID, required: true
    argument :name, String, required: false
    argument :description, String, required: false
    argument :image, String, required: false

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