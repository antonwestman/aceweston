# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!

ActiveSupport.on_load(:after_initialize) do
  ArkivITInitialized = true
  ArkivIT::Application.reload_routes! # this time with devise
end