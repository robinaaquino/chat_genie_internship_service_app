module Mutations
  class GetCurrentUser < BaseMutation
    null true

    argument :token, String, required: true

    field :user, Types::UserType, null: true
    field :errors, [String], null: false

    def resolve(token: nil)
      crypt = ActiveSupport::MessageEncryptor.new(Rails.application.credentials.secret_key_base.byteslice(0..31))
      token = crypt.decrypt_and_verify(token)
      user_id = token.gsub('user-id:', '').to_i

      user = User.find user_id

      if user
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