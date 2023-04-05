module Types
  class MutationType < Types::BaseObject
    field :signin_user, mutation: Mutations::SignInUser
    field :logout_user, mutation: Mutations::LogOutUser
    field :create_customer_user, mutation: Mutations::CreateCustomerUser
    field :create_admin_user, mutation: Mutations::CreateAdminUser
    field :get_current_user, mutation: Mutations::GetCurrentUser

    field :create_service_category, mutation: Mutations::CreateServiceCategory
    field :update_service_category, mutation: Mutations::UpdateServiceCategory
    field :delete_service_category, mutation: Mutations::DeleteServiceCategory

    field :create_service, mutation: Mutations::CreateService
    field :update_service, mutation: Mutations::UpdateService
    field :delete_service, mutation: Mutations::DeleteService

    field :create_date, mutation: Mutations::CreateDate
    field :delete_date, mutation: Mutations::DeleteDate

    field :create_timeslot, mutation: Mutations::CreateTimeslot
    field :delete_timeslot, mutation: Mutations::DeleteTimeslot
    field :update_timeslot, mutation: Mutations::UpdateTimeslot

    field :create_booking, mutation: Mutations::CreateBooking
    field :update_booking, mutation: Mutations::UpdateBooking

    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World"
    end
  end
end
