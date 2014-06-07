# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'railslider/version'

Gem::Specification.new do |spec|
  spec.name          = 'railslider'
  spec.version       = Railslider::VERSION
  spec.authors       = ['gotqn']
  spec.email         = ['george_27@abv.bg']
  spec.description   = 'Do not download it - just reserving the name'
  spec.summary       = 'The first version will be released soon'
  spec.homepage      = ''
  spec.license       = 'MIT'

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ['lib']

  spec.add_development_dependency 'bundler', '~> 1.3'
  spec.add_development_dependency 'rake'
end
