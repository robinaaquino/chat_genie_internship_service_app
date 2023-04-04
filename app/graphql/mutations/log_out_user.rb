# require 'pry'
module Mutations
  class LogOutUser < BaseMutation
    null true

    field :token, String, null: true
    field :user, Types::UserType, null: true
    field :errors, [String], null: false

    def resolve()

      context[:session][:token] = nil
      context[:current_user] = nil

      { user: nil, token: nil, errors: [] }
    end
  end
end