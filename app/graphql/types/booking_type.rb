# frozen_string_literal: true

module Types
  class BookingType < Types::BaseObject
    field :id, ID, null: false
    field :booking_date, String
    field :name_of_customer, String
    field :service_id, Integer, null: false
    field :amount, Integer
    field :status, String
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :date, String
    field :time, String
  end
end
