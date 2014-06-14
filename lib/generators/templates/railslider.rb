class <%= get_class_name %> < Railslider::Image

  #
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

end