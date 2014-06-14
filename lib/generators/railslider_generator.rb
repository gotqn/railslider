class RailsliderGenerator < Rails::Generators::Base
  source_root File.expand_path('../templates', __FILE__)

  desc  'Generates ruby class and css classes for rails CSS3 animations image slider'

  argument :name, type: 'string', required: true,
           desc: 'specifies generated ruby class name'

  def generate_layout
    template 'railslider.rb',
             "app/railslider/#{get_file_name}.rb"
    template 'transitions.css.sass',
             "vendor/assets/stylesheets/railslider/#{get_file_name}/transitions.css.sass"
  end

  private

  def get_file_name
    name.underscore
  end

  def get_class_name
    name.camelize
  end

end