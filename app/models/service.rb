class Service < ApplicationRecord
  belongs_to :service_category, optional: true
  has_many :service_date
  has_many :service_timeslot
end
