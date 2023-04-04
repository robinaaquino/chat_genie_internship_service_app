class Service < ApplicationRecord
  belongs_to :service_category
  has_many :service_dates, dependent: :destroy
  has_many :service_categories, dependent: :destroy
end
