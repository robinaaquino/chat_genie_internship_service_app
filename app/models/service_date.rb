class ServiceDate < ApplicationRecord
  belongs_to :service, optional: true
end
