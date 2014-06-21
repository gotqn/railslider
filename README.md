# Railslider

Introduces simple image slider for rails applications using CSS3 animations for image transitions.
The idea is inspired by [this great codedrops article] (http://tympanus.net/codrops/2011/12/19/experimental-css3-animations-for-image-transitions/).

## Support

Tested on:

1. Google Chrome (Version 35.0.1916.153)
2. Chromium (Version 34.0.1847.116)
3. Safari (Version 5.1.7)

Coming soon:

1. Internet Explorer 10
2. Internet Explorer 11
3. Mozzila Firefox 30

## Installation

Add this line to your application's Gemfile:

    gem 'railslider'

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install railslider
    
## Creating demonstration rails slider

In order to get known with the *rails slider* options you can create a demo image slider following the steps below:

__Creating demo slider files__ 

Executing the following line in your rails application console:

    rails generate railslider demo

is generating the files below:
    
   * app/railslider/demo.rb
   * vendor/assets/stylesheets/railslider/demo.rb/transitions.css.sass
   
__Loading demo slider css and javascript files__

Add the following line in your *application.js* file:

    //= require railslider.js

Add the following lines in your *application.css* file:

    *= require railslider.css.sass
    *= require railslider/demo/transitions.css.sass
 
__Rendering demo slider using default images__

Add the following line in some *model/show.html.erb*:

    Demo.new({id:demo}).render
    
Add the following lines in the corresponding *model.js*:

    //Checking if jQuery function is loaded
    (function IsjQueryLoaded(){
        if(window.jQuery){
            //Waiting for all elements to be rendered
            $(document).ready(function(){
                //Creating new instance of "RailSlider"
                demo = new RailSlider({'containerID':'demo'});
                demo.init();
            });
        }else{
            setTimeout(IsjQueryLoaded(),1000);
        }
    })();
    
Execute the following line In your browser console:

    demo.controls.show()
    
__Result__

You should end up with a demo rails slider image gallery rendered and controls for changing the animations visible.

## Usage

### Basic Usage

In order to implement the *rails slider* in your rails application follow the steps below:

__Creating rails slider files__ 

Executing the following line in your rails application console:

    rails generate railslider class_name

is generating the files below:
    
   * app/railslider/class_name.rb
   * vendor/assets/stylesheets/railslider/class_name.rb/transitions.css.sass
   
__Loading *rails slider* and *class_name* css and javascript files__

Add the following line in your *application.js* file:

    //= require railslider.js

Add the following lines in your *application.css* file:

    *= require railslider.css.sass
    *= require railslider/class_name/transitions.css.sass
 
__Rendering *rails slider*__

Add the following line in your *model/show.html.erb*:

     ClassName.new({
                      id: 'sliderID',
                      images_urls: @images_url
                   }).render
                  
where:

   * __id__ - defines slider HTML container ID and is use for additional JavaScript manipulations after slider is rendered
   * __images_urls__ - is array containing valid images urls
    
Add the following lines in the corresponding *model.js*:

    //Checking if jQuery function is loaded
    (function IsjQueryLoaded(){
        if(window.jQuery){
            //Waiting for all elements to be rendered
            $(document).ready(function(){
                //Creating new instance of "RailSlider"
                myFirstSlider = new RailSlider({'containerID':'sliderID'});
                myFirstSlider.init();
            });
        }else{
            setTimeout(IsjQueryLoaded(),1000);
        }
    })();
    
### Advanced Usage
