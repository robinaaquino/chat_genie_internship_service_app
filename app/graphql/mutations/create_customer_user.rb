module Mutations
  class CreateCustomerUser < BaseMutation
    argument :username, String, required: true
    argument :password, String, required: true

    field :user, Types::UserType, null: true
    field :errors, [String], null: false

    def resolve(username: nil, password: nil)
      user = User.new(
        username: username,
        password: password,
        role: "customer"
      )

      if user.save
        return {
          user: user,
          errors: []
        }
      else
        return {
          user: nil,
          errors: user.errors.full_messages
        }
      end
    end
  end
end