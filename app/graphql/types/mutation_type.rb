module Types
  class MutationType < Types::BaseObject
    field :signin_user, mutation: Mutations::SignInUser
    field :logout_user, mutation: Mutations::LogOutUser
    field :create_customer_user, mutation: Mutations::CreateCustomerUser
    field :create_admin_user, mutation: Mutations::CreateAdminUser
    # TODO: remove me
    field :create_service_category, mutation: Mutations::CreateServiceCategory
    field :get_current_user, mutation: Mutations::GetCurrentUser

    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World"
    end
  end
end
