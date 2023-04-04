# frozen_string_literal: true

module Types
  class ServiceTimeslotType < Types::BaseObject
    field :id, ID, null: false
    field :time, String
    field :slots, Integer
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :service_id, Integer, null: false
  end
end
