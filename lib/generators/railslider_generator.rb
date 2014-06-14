class ThumbnailGenerator < Rails::Generators::Base
  source_root File.expand_path('../templates', __FILE__)

  desc  'Generates ruby class and css classes for rails CSS3 animations image slider'

  argument :name, type: 'string', required: true,
           desc: 'specifies generated ruby class name'

  class_option :width, type: 'numeric', default: 329, aliases: '-w',
               desc: 'specifies image width'

  class_option :height, type: 'numeric', default: 425, aliases: '-h',
               desc: 'specifies image height'

  def generate_layout
    template 'thumbnail.rb',
             "app/railslider/#{get_file_name}.rb"
    template 'transitions.css.sass.erb',
             "vendor/assets/stylesheets/railslider/#{get_file_name}/transitions.css.sass"
  end

  private

  def get_file_name
    name.underscore
  end

  def get_class_name
    name.camelize
  end

  def get_width
    options[:width]
  end

  def get_height
    options[:height]
  end

end