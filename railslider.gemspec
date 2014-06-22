# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'railslider/version'

Gem::Specification.new do |spec|
  spec.name          = 'railslider'
  spec.version       = Railslider::VERSION
  spec.authors       = ['gotqn']
  spec.email         = ['george_27@abv.bg']
  spec.description   = 'Introduces simple image slider for rails applications using CSS3 animations for image transitions.'
  spec.summary       = 'The idea is inspired by [this great codedrops article] (http://tympanus.net/codrops/2011/12/19/experimental-css3-animations-for-image-transitions/).'
  spec.homepage      = 'https://github.com/gotqn/railslider'
  spec.license       = 'MIT'

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ['lib']

  spec.add_development_dependency 'bundler', '~> 1.3'
  spec.add_development_dependency 'rake'
end
