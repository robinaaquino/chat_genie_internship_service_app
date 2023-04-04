# frozen_string_literal: true

module Types
  class ServiceDateType < Types::BaseObject
    field :id, ID, null: false
    field :date, String
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :service_id, Integer, null: false
  end
end
