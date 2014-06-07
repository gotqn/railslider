# This gem contains an engine class which inherits from Rails::Engine. By doing this, Rails is
# informed that the directory for this gem may contain assets and the app/assets, lib/assets
# and vendor/assets directories of this engine are added to the search path of Sprockets.
# Official reference: http://guides.rubyonrails.org/asset_pipeline.html#adding-assets-to-your-gems

module Railslider
  class Engine < ::Rails::Engine
  end
end
