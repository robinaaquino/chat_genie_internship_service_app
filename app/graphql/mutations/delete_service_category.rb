module Mutations
  class DeleteServiceCategory < BaseMutation
    argument :id, ID, required: true

    field :service_category, Types::ServiceCategoryType, null: true
    field :errors, [String], null: false

    def resolve(id:)
      category = ServiceCategory.find(id)

      if(category.destroy)
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
