module Railslider
  #
  class Image

    # image use if such is not specified
    DEMO_IMAGES = ['/assets/demo/1.jpg',
                   '/assets/demo/2.jpg',
                   '/assets/demo/3.jpg',
                   '/assets/demo/4.jpg',
                   '/assets/demo/5.jpg']

    # class attributes
    attr_accessor :id,             #  elements id
                                   #
                  :images_urls,    #  array holding images urls
                                   #
                  :effect          #  initial effect to be used:
                                   #
                                   #    flips: flip01, flip02, flip03, flip04
                                   #    rotations: rotation01, rotation02, rotation03, rotation04, rotation05
                                   #    multi-flips: multi-flip01, multi-flip02, multi-flip03
                                   #    cubes: cube01, cube02, cube03, cube04
                                   #    unfolds: unfold01, unfold02
                                   #    others: other01, other02, other03 ,other04 ,other05 ,other06 ,other07

    # extracting input parameters and using defaults if necessary
    def initialize(parameters = {})
      @id = parameters.fetch(:id, 'demo')
      @images_urls = parameters.fetch(:images_urls, DEMO_IMAGES)

      @effect = parameters.fetch(:effect, 'flip01')
    end

    # rendering images without rails slider effects
    def to_s
      @result_html = ''
      @images_urls.each do |url|
        @result_html += "<img src=\"#{url}\"/>"
      end
      @result_html.html_safe
    end

    # rendering images with rails slider effects
    def render
      @result_html = ''
      @result_html += "<div class=\"rs-container #{self.class.name}\" id=\"#{@id}\">"
        @result_html += render_controls.gsub("<option value=\"rs-#{@effect}\">",
                                             "<option value=\"rs-#{@effect}\" selected=\"selected\">")
        @result_html += "<div class=\"rs-wrapper\">"
         @result_html += "<div class=\"rs-shadow\"></div>"
         @result_html += '<div class="rs-images">'
          @images_urls.each do |url|
            @result_html += "<img src=\"#{url}\"/>"
          end
          @result_html += '</div>'
          @result_html += '<div class="rs-cover">'
            @result_html += '<a class="rs-animation-command rs-pause" href="javascript:void(0)">Play/Pause</a>'
            @result_html += "<img src=\"#{@images_urls.first}\"/>"
          @result_html += '</div>'
          @result_html += '<div class="rs-transition">'
            @result_html += render_flips
            @result_html += render_multi_flips
            @result_html += render_cubes
            @result_html += render_unfolds
          @result_html += '</div>'
        @result_html += '</div>'
      @result_html += render_bullets
      @result_html += '</div>'

      @result_html.html_safe
    end

    def render_controls
      "
      <div class=\"rs-controls\">
            <label for=\"rs-effects\">
                <select class=\"rs-effects\">
                    <optgroup label=\"rs-flips\">
                        <option value=\"rs-flip01\">flip 01</option>
                        <option value=\"rs-flip02\">flip 02</option>
                        <option value=\"rs-flip03\">flip 03</option>
                        <option value=\"rs-flip04\">flip 04</option>
                    </optgroup>
                    <optgroup label=\"rs-rotations\">
                        <option value=\"rs-rotation01\">rotation 01</option>
                        <option value=\"rs-rotation02\">rotation 02</option>
                        <option value=\"rs-rotation03\">rotation 03</option>
                        <option value=\"rs-rotation04\">rotation 04</option>
                        <option value=\"rs-rotation05\">rotation 05</option>
                    </optgroup>
                    <optgroup label=\"rs-multi-flips\">
                        <option value=\"rs-multi-flip01\">multi-flip 01</option>
                        <option value=\"rs-multi-flip02\">multi-flip 02</option>
                        <option value=\"rs-multi-flip03\">multi-flip 03</option>
                    </optgroup>
                    <optgroup label=\"rs-cubes\">
                        <option value=\"rs-cube01\">Cube 01</option>
                        <option value=\"rs-cube02\">Cube 02</option>
                        <option value=\"rs-cube03\">Cube 03</option>
                        <option value=\"rs-cube04\">Cube 04</option>
                    </optgroup>
                    <optgroup label=\"rs-unfolds\">
                        <option value=\"rs-unfold01\">Unfold 01</option>
                        <option value=\"rs-unfold02\">Unfold 02</option>
                    </optgroup>
                    <optgroup label=\"rs-others\">
                        <option value=\"rs-other01\">Other 01</option>
                        <option value=\"rs-other02\">Other 02</option>
                        <option value=\"rs-other03\">Other 03</option>
                        <option value=\"rs-other04\">Other 04</option>
                        <option value=\"rs-other05\">Other 05</option>
                        <option value=\"rs-other06\">Other 06</option>
                        <option value=\"rs-other07\">Other 07</option>
                    </optgroup>
                </select>
            </label>
            <a class=\"rs-next\" href=\"#\">next</a>
            <a class=\"rs-prev\" href=\"#\">back</a>
        </div>
      "
    end

    def render_flips
      "
      <div class=\"rs-flip rs-card\">
        <div class=\"rs-front\"></div>
        <div class=\"rs-back\"></div>
      </div>
      "
    end

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

    def render_cubes
      "
      <div class=\"rs-cube rs-cube-front rs-cube-face rs-front\"></div>
      <div class=\"rs-cube rs-cube-top rs-cube-face rs-back\"></div>
      <div class=\"rs-cube rs-cube-bottom rs-cube-face rs-back\"></div>
      <div class=\"rs-cube rs-cube-right rs-cube-face rs-back\"></div>
      <div class=\"rs-cube rs-cube-left rs-cube-face rs-back\"></div>
      "
    end

    def render_unfolds
      "
      <div class=\"rs-unfold rs-front rs-front1\"></div>
      <div class=\"rs-unfold rs-front rs-front2\"></div>
      <div class=\"rs-unfold rs-front rs-front3\"></div>
      <div class=\"rs-unfold rs-back rs-back1\"></div>
      <div class=\"rs-unfold rs-back rs-back2\"></div>
      <div class=\"rs-unfold rs-back rs-back3\"></div>
      "
    end

    def render_bullets
      @result_html = ''
      @result_html += '<ul class="rs-bullets">'

      @images_urls.each_with_index do |url, index|
        @result_html += "<li><a data-position=\"#{index+1}\" href=\"#\">hidden text</a></li>"
      end
      @result_html += '</ul>'
    end
  end
end