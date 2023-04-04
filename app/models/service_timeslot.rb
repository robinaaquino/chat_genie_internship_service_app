class ServiceTimeslot < ApplicationRecord
  belongs_to :service, optional: true
end
