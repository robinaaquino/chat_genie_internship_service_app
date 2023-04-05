module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.
    field :all_users, [Types::UserType], null: false, description: "Return all users"
    field :user_find_by_id, Types::UserType, "Find user by ID" do
      argument :id, ID
    end

    field :all_service_categories, [Types::ServiceCategoryType], null: false, description: "Return all service categories"
    field :service_category_find_by_id, Types::ServiceCategoryType, "Find service category by ID" do
      argument :id, ID
    end

    field :all_services, [Types::ServiceType], null: false, description: "Return all services"
    field :service_find_by_id, Types::ServiceType, "Find service by ID" do
      argument :id, ID
    end

    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World!"
    end

    def all_users
      User.all
    end

    def user_find_by_id(id:)
      User.find(id)
    end

    def all_service_categories
      ServiceCategory.all
    end

    def service_category_find_by_id(id:)
      ServiceCategory.find(id)
    end

    def all_services
      Service.all
    end

    def service_find_by_id(id:)
      Service.find(id)
    end
  end
end
