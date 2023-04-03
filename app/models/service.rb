class Service < ApplicationRecord
  belongs_to :service_category
  belongs_to :service_date
  belongs_to :service_timeslot
end
