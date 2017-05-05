$(function () {

  //Variables
  var carouselClass, animatedElements, svg_timer,
      //Detect a 'touch screen' device
      isTouchDevice = 'ontouchstart' in window || navigator.MaxTouchPoints || navigator.msMaxTouchPoints;

  //SVG Draw and animate
  setTimeout(
      function () {
        my_draw();
      }
      , 650);

  $(window).on('resize scroll', function (e) {
    clearTimeout(svg_timer);
    svg_timer = setTimeout(
        function () {
          my_draw(e.type);
        }
        , 650);
    // setTimeout

    if (e.type == "resize") {
      $('.ds-border_bottom_colored, .ds-container_border_colored').each(function () {
        $(this).removeClass('animated').addClass('ds-svg_not_visible');
      });
    }

  });

  //SVG Draw and animate function
  function my_draw(type) {

    //Draw first screen "about" bottom line
    $('.ds-border_bottom_colored:in-viewport').each(function () {
      if (!$(this).hasClass("animated") || type == 'resize') {

        $(this).removeClass('ds-svg_not_visible');

        var $element = $(this);
        $element.find('svg').remove();

        var draw = $element.data('svg') || SVG($element[0]),
            element_width = $element.outerWidth() - 1,
            element_half_width = $element.outerWidth() / 2 - 1,
            element_height = 150;

        // draw bottom line
        draw.path()
            .M(element_half_width, element_height) //move to
            .h(element_half_width) // half horizontal line
            .M(element_half_width, element_height) //move to
            .h(-element_half_width) // half horizontal line
            .drawAnimated({delay: 200});

        // draw two side lines
        draw.path()
            .M(1, 149) //move to
            .v(-element_height) //vertical line
            .M(element_width - 2, element_height - 1) //move to
            .v(-element_height) //vertical line
            .M(element_half_width - 2, 260) //move to
            .v(-element_height) //vertical bottom line
            .drawAnimated({delay: 200});

        $(this).addClass("animated");
      }
    });

    //Draw five screen "testimonials" circle border
    $('.ds-testimonial__ava.svg:in-viewport').each(function (index, currentElement) {

      if (!$(this).hasClass("animated") || type == 'resize') {

        var $element = $(this);
        $element.find('svg').remove();

        var draw = SVG($element[0]),
            element_width = $element.outerWidth();

        //CIRCLE
        draw.path()
            .attr({fill: 'none'})
            .M({x: 92, y: 32}) //move to
            .a(72/*radius*/, 72/*radius*/, 0, 1, 0, {x: 1, y: 0}) //end point
            .Z() //closepath
            .drawAnimated({delay: 200});

        //CIRCLE big
        draw.path()
            .attr({fill: 'none'})
            .M(35, 36) //move to
            .A(90, /*radius*/ 90, /*radius*/ 0, 1, 0, {x: 150, y: 36}) //end point
            .drawAnimated({delay: 400});

        $(this).addClass("animated");
      }

    });

    $('.ds-title__top_line:in-viewport').each(function (index, currentElement) {

      if (!$(this).hasClass("animated") || type == 'resize') {
        var $element = $(this);
        $element.find('svg').remove();

        var draw = SVG($element[0]),
            element_width = $element.outerWidth();
        element_height = 160;
        //Top line for title
        draw.size(2, element_height)
            .path()
            .M({x: 1, y: element_height})
            .V(-element_height)
            .drawAnimated({delay: 0})

        $(this).addClass("animated");
      }

    });

    $('.ds-container_border_colored:in-viewport').each(function (index, currentElement) {

      if (!$(this).hasClass("animated") || type == 'resize') {

        $(this).removeClass('ds-svg_not_visible');

        var $element = $(this);
        $element.find('svg').remove();
        var draw = SVG($element[0]);


        if (!$(this).hasClass("ds-container_border_bottom")) {
          var shift_value = 0;
          line_bottom_height = 135;
        }
        else {
          var shift_value = 22;
          line_bottom_height = 175;
        }

        if ($(this).hasClass("ds-container_border_bottom")) {

          element_height = $element.outerHeight() - 2;
          element_width = $element.outerWidth();
          element_half_width = $element.outerWidth() / 2;
          element_height = element_height - line_bottom_height + (shift_value * 2);

          // draw bottom line
          draw.path()
              .M(element_half_width, element_height) //move to
              .h(element_half_width) // half horizontal line
              .M(element_half_width, element_height) //move to
              .h(-element_half_width) // half horizontal line
              .drawAnimated({delay: 800});

          // draw two side lines
          draw.path()
              .M(1, element_height) //move to
              .v(-line_bottom_height) //vertical line
              .M(element_width - 1, element_height - 1) //move to
              .v(-line_bottom_height) //vertical line
              .drawAnimated({delay: 1000});
        }

        shift_w = shift_value * 2;
        shift_h = shift_value * 2;

        var element_width = $element.outerWidth() - 1 - shift_w,
            element_height = $element.outerHeight(),
            line_top_height = 35,
            line_top_dashed_height = 55;

        x_left_coord = 1 + shift_value;
        x_right_coord = element_width + shift_value;

        y_top_coord = line_top_height;
        y_bottom_coord = element_height - line_bottom_height - 3 + shift_value;


        element_line_height = element_height - line_bottom_height - line_top_height - 3 + shift_value;

        //Rectangle
        draw.path()

            .M({x: x_left_coord, y: y_top_coord}) //move to
            .h(element_width) //horizontal top line

            .M({x: x_right_coord, y: y_top_coord}) //move to
            .v(element_line_height) //vertical right line

            .M({x: x_right_coord, y: y_bottom_coord}) //move top
            .h(-(element_width)) //horizontal bottom line

            .M({x: x_left_coord, y: y_bottom_coord}) //move top
            .v(-element_line_height)

            .drawAnimated({delay: 100});

        if (!$(this).hasClass("ds-dashed_lines")) {
          var $y = line_top_height;
          var $x = element_width / 2 + shift_value;
        }
        else {
          var $y = 55;
          var $x = element_width / 2 + shift_value;
          line_bottom_height = line_bottom_height - shift_value;
        }

        //Line top
        draw.path()
            .M({x: $x, y: $y})
            .L({x: $x, y: -$y})
            .drawAnimated({delay: 700})

        //Line bottom
        draw.path()
            .M({x: $x, y: element_height/*y_bottom_coord - shift_value*/})
            .v(-(line_bottom_height + shift_value + 2))
            .drawAnimated({delay: 700})

        $(this).addClass("animated");
      }
    });
  }

  //Animation elements
  if (!isTouchDevice) {
    //Animated blocks
    var options = {
      animateThreshold: 100,
      scrollPollInterval: 20
    };
    $('.js-anim').AniView(options);
  }

  // Function call slick carousel
  // Parametrs: '.class', countElements(int), arrows(bool), dots(bool), fade(bool), responsiveBreakPoint(bool)
  runCarousel('.ds-single-element-carousel', 1, true, false, true, false);
  runCarousel('.ds-single-element-dot-carousel', 1, false, true, true, false);

  runCarousel('.ds-three-elements-carousel', 3, true, false, false, true);
  runCarousel('.ds-three-elements-dot-carousel', 3, false, true, false, true);

  runCarousel('.ds-four-elements-carousel', 4, true, false, false, true);
  runCarousel('.ds-four-elements-dot-carousel', 4, false, true, false, true);

  //Background video
  if ($('video').length) {
    var myVideo = document.getElementById('bgVideo');

    var myVideoParent = $('#bgVideo').parents('.ds-video-html5');

    myVideo.addEventListener('ended', function () {
      myVideoParent.removeClass('is-playing');
      myVideoParent.find('.ds-video__play').addClass('is-ended');
    });

    myVideoParent.find('.ds-video__play').on('click', function (e) {
      e.preventDefault();

      myVideoParent.addClass('is-playing');

      myVideo.play();
    });

    myVideoParent.find('.ds-video__play-pause').on('click', function (e) {
      e.preventDefault();

      $(this).toggleClass('is-played');

      if (myVideo.paused) {
        myVideo.play();
      } else {
        myVideo.pause();
      }
    });

    myVideoParent.find('.ds-video__volume').on('click', function (e) {
      e.preventDefault();

      $(this).toggleClass('is-muted');

      if ($('#bgVideo').prop('muted')) {
        $('#bgVideo').prop('muted', false);
      } else {
        $('#bgVideo').prop('muted', true);
      }
    });

    var myVideo2 = document.getElementById('bgVideo2');

    var myVideo2Parent = $('#bgVideo2').parents('.ds-video-html5');

    myVideo2.addEventListener('ended', function () {
      myVideo2Parent.removeClass('is-playing');
      myVideo2Parent.find('.ds-video__play').addClass('is-ended');
    });

    myVideo2Parent.find('.ds-video__play').on('click', function (e) {
      e.preventDefault();

      myVideo2Parent.addClass('is-playing');

      myVideo2.play();
    });

    myVideo2Parent.find('.ds-video__play-pause').on('click', function (e) {
      e.preventDefault();

      $(this).toggleClass('is-played');

      if (myVideo2.paused) {
        myVideo2.play();
      } else {
        myVideo2.pause();
      }
    });

    myVideo2Parent.find('.ds-video__volume').on('click', function (e) {
      e.preventDefault();

      $(this).toggleClass('is-muted');

      if ($('#bgVideo2').prop('muted')) {
        $('#bgVideo2').prop('muted', false);
      } else {
        $('#bgVideo2').prop('muted', true);
      }
    });
  }


  //Validation
  $('.js-validate').each(function () {
    $(this).validate({
      rules: {
        name: {
          required: true
        },
        email: {
          required: true,
          email: true
        },
        subject: {
          required: true,
          minlength: 5
        },
        message: {
          required: true,
          minlength: 10
        }
      },

      // Do not change code below
      errorPlacement: function (error, element) {
        return true;
      },

      submitHandler: function () {
        $('#successPopup').fadeIn(400);

        setTimeout(function () {
          $('#successPopup').fadeOut(400);
        }, 3000);
      }
    });

  });

});

//Carousel function
function runCarousel(carouselClass, countElements, arrows, dots, fade, responsiveBreakPoint) {

  if (carouselClass) {

    $(carouselClass).each(function (index) {

      //Set custom breakPoints
      if (responsiveBreakPoint === true) {
        var responsive = [{
          breakpoint: 1350,
          settings: {
            slidesToShow: 3
          }
        },
          {
            breakpoint: 768,
            settings: {
              centerMode: false,
              slidesToShow: 2
            }
          },
          {
            breakpoint: 500,
            settings: {
              centerMode: false,
              slidesToShow: 1
            }
          }];
      } else {
        var responsive = null;
      }

      var currentCarousel = $(carouselClass).eq(index);
      var slick = $(currentCarousel).find('.carousel-init');

      slick.slick({
        fade: fade,
        slidesToShow: countElements,
        arrows: arrows,
        dots: dots,
        speed: 300,
        prevArrow: '<a class="slick-prev"><span class="icon-left"></span></a>',
        nextArrow: '<a class="slick-next"><span class="icon-right"></span></a></div>',
        responsive: responsive
      });

    }); // $(carouselClass).each(function(index)

  } // if (carouselClass.length >= 1) 

} //runCarousel function
