module Mutations
  class CreateServiceCategory < BaseMutation
    argument :name, String, required: true
    argument :description, String, required: true
    argument :image, String, required: true

    field :service_category, Types::ServiceCategoryType, null: true
    field :errors, [String], null: false

    def resolve(name: nil, description: nil, image: nil)
      category = ServiceCategory.new(name: name,
        description: description,
        image: image)
      if category.save
        return {
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