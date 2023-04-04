module Mutations
    class SignInUser < BaseMutation
      null true

      argument :credentials, Types::AuthProviderCredentialsInput, required: false

      field :token, String, null: true
      field :user, Types::UserType, null: true
      field :errors, [String], null: false

      def resolve(credentials: nil)
        if credentials.nil?
          return {
            token: nil,
            user: nil,
            erors: ['No credentials']
          }
        end

        user = User.find_by username: credentials[:username]

        if user.nil?
          return {
            token: nil,
            user: nil,
            erors: ['User not found']
          }
        end

        if user.authenticate(credentials[:password]).nil?
          return {
            token: nil,
            user: nil,
            erors: ['Error with authentication']
          }
        end

        crypt = ActiveSupport::MessageEncryptor.new(Rails.application.credentials.secret_key_base.byteslice(0..31))
        token = crypt.encrypt_and_sign("user-id:#{ user.id }")

        context[:session][:token] = token
        return { user: user, token: token, errors: [] }
      end
    end
  end