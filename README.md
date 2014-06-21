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
    
### CSS3 Animations Module Usage

The CSS3 animations used for images transitions are defined in *railslider/class_name/transitions.css.sass* file. These animations depend on the following global variables defined in the given file:

   * image width 
   * image height 
   * slices count

1. Why should I changed the images *width* and *height*?

  The CSS3 animations depends on image size. You need to use images with same width and height and set these values in the corresponding *railslider/class_name/transitions.css.sass* file.

  If the images are uploaded by client users, you can check [this railscast] (http://railscasts.com/episodes/253-carrierwave-file-uploads) in order to learn how to upload and resize images.

2. How to change images width and height default values?

  Open the *railslider/class_name/transitions.css.sass* file and change the default values (declared on the top):

       $image_width: 329
       $image_height: 425

3. How to use several *rails sliders* displaying images with different dimensions on the same web page?

  Firstly, generate several *rails sliders* files using the gem generator. 
  Then, change the dimensions of each images group in theirs *railslider/class_name/transitions.css.sass* files.
  Finally, rendered the sliders as usual.

4. How many transitions effects are implemented?

  For now, there are 25 transitions effects. All effects from [this great codedrops article] (http://tympanus.net/codrops/2011/12/19/experimental-css3-animations-for-image-transitions/) are available.

5. How to set initial transition effect?

  You can set initial effect using the *effect* property when slider is rendered like follows:

        ClassName.new({
              id: 'sliderID',
              effect: 'flip04',
              images_urls: @images_url
        }).render

  This is initial effect only and can be changed later using JavaScript or sliders controls.

6. Which are the possible values for *initial effect* property?
  
  * flips: flip01, flip02, flip03, flip04
  * rotations: rotation01, rotation02, rotation03, rotation04, rotation05
  * multi-flips: multi-flip01, multi-flip02, multi-flip03
  * cubes: cube01, cube02, cube03, cube04
  * unfolds: unfold01, unfold02
  * others: other01, other02, other03 ,other04 ,other05 ,other06 ,other07

   Note: The default value of the *initial effect* is *flip01*.
   
7. How to change numbers of pieces used by *multi-flips* effects?

  The *multi-flips* effects are special as the image is divided in N flipping parts. The default value is 7.
  If you need to change it follow the steps below:

  First, open the *railslider/class_name/transitions.css.sass* file and change the default value (declared on the top):

    $slices_count: 7

  Then, open the *app/railslider/class_name.rb* file and changed the *render_multi_flips* method definition:

      def render_multi_flips
        @result_html = ''
        for index in 1 .. 7
          @result_html +=
              "
            <div class=\"rs-multi-flip rs-card rs-flip#{index}\">
              <div class=\"rs-front\"></div>
              <div class=\"rs-back\"></div>
            </div>
            "
        end
        @result_html
      end

  For example if you need to have 12 flipping part, change the for loop from *1..7* to *1..12*.

  Note: The *slices_count* value should be odd number.

8. Should I edit the gem CSS files if I need?

  Of course. These are ordinary CSS files and you are free to change them as you like in order to get better performance.

### JavaScript Module Usage

Some of the important *RailSlider* JavaScript object properties are:

  * type - holds current animation value
  * isAutoSlidingEnabled - default is true
  * direction - show "next" or "prev" image
  * timeInterval - auto sliding time interval im milliseconds (default is 5000)
  * controls - reference to current slider controls panel

You are able to use this properties in order to control the *rails slider* behavior.
