function mobileNavH() {
    var windW, windH, headerTopH, headerBottomH, menuH, summaryH;
    windW = $(window).width();
    windH = $(window).height();
    headerTopH = $('.ds-header-left').outerHeight();
    headerBottomH = $('.ds-header-right').outerHeight();
    menuH = $('.ds-header-menu').outerHeight();
    summaryH = menuH + headerBottomH + headerTopH;

    if (windH <= summaryH && windW <= 992) {
        $('.ds-header-middle').css('height', windH - (headerTopH + headerBottomH));
    } else {
        $('.ds-header-middle').css('height', 'auto');
    }
}

$(function(){

  //Variables
  var $colorSwitcher, $bgTypeSwitcher, $iconSwitcher, $layoutSwitcher, $bannerSwitcher, $mobileMenu, headerH, scrollToLink;
  $mobileMenu = $('.ds-header');

   $("body").click(function(e) {
      //outside_click
      if(!$(e.target).is(".ds-style-switcher , .ds-style-switcher *") ) { 
        $('.ds-style-switcher').removeClass('ds-style-switcher_opened');
      }
  });

  //Open switcher
  $('.ds-style-switcher-open').on('click', function(e) {
    e.preventDefault();
    $(this).parents('.ds-style-switcher').toggleClass('ds-style-switcher_opened');
  });

  //Color switcher
  $colorSwitcher = $('.ds-style-switcher__color-switcher__item');
  $colorSwitcher.click(function() {
    var newColorTheme, currentColorTheme;
    newColorTheme = $(this).find('input').data('theme');
    currentColorTheme = $('body').data('current-color-theme');

    $('.ds-style-switcher__color-switcher__item').removeClass('ds-style-switcher__color-switcher__item_current');
    $(this).addClass('ds-style-switcher__color-switcher__item_current');
    $('body').removeClass(currentColorTheme);
    $('body').addClass(newColorTheme);
    $('body').data('current-color-theme', newColorTheme);
  });

  //Icon switcher
  $iconSwitcher = $('.ds-style-switcher__icon-switcher__item');
  $iconSwitcher.click(function() {
    var newIconTheme, currentIconTheme;
    newIconTheme = $(this).find('input').data('theme');
    currentIconTheme = $(this).parents('.ds-main_section').data('current-icon-theme');

    $(this).parents('.ds-main_section').removeClass(currentIconTheme);
    $(this).parents('.ds-main_section').addClass(newIconTheme);
    $(this).parents('.ds-main_section').data('current-icon-theme', newIconTheme);
  });

  //Layout switcher
  $layoutSwitcher = $('.ds-style-switcher__layout-switcher__item');
  $layoutSwitcher.click(function() {
    var newLayoutTheme, currentLayoutTheme;
    newLayoutTheme = $(this).find('input').data('theme');
    currentLayoutTheme = $(this).parents('.ds-has_layout').data('current-layout-theme');

    $(this).parents('.ds-has_layout').removeClass(currentLayoutTheme);
    $(this).parents('.ds-has_layout').addClass(newLayoutTheme);
    $(this).parents('.ds-has_layout').data('current-layout-theme', newLayoutTheme);

    $('.ds-single-element-dot-carousel .carousel-init').slick('setPosition');
    $('.ds-single-element-carousel .carousel-init').slick('setPosition');
    $('.ds-three-elements-carousel .carousel-init').slick('setPosition');
    $('.ds-three-elements-dot-carousel .carousel-init').slick('setPosition');
    $('.ds-four-elements-dot-carousel .carousel-init').slick('setPosition');
    $('.ds-four-elements-carousel .carousel-init').slick('setPosition');

  });

  //Background type switcher
  $bgTypeSwitcher = $('.ds-style-switcher__bg-type-switcher__item');
  $bgTypeSwitcher.click(function() {
    var newLayoutTheme, currentLayoutTheme, bgi;
    newLayoutTheme = $(this).find('input').data('theme');
    currentLayoutTheme = $(this).parents('.ds-main_section').data('current-bg-type-theme');
    bgi = $(this).find('input').data('bgi');

    $(this).parents('.ds-main_section').removeClass(currentLayoutTheme);
    $(this).parents('.ds-main_section').attr('style', 'background-image: url('+bgi+');');
    $(this).parents('.ds-main_section').addClass(newLayoutTheme);
    $(this).parents('.ds-main_section').data('current-bg-type-theme', newLayoutTheme);
  });

  function showMenu() {
    $('body').addClass('ds-start-menu-animation');
    $mobileMenu.addClass('ds-header_compact');
    setTimeout(function() {
      $mobileMenu.addClass('ds-header_blue');
      $('.ds-header-right, .ds-header-middle').show();
      $('.ds-mobile-menu-layout').fadeIn(200);
    }, 400);
    setTimeout(function() {
      mobileNavH();
      $mobileMenu.addClass('ds-header_height-auto');
    }, 800);
    setTimeout(function() {
      $('.ds-header-right, .ds-header-middle').addClass('ds-header-section_width-auto');
    }, 1200);
    setTimeout(function() {
      $('.ds-header-menu, .ds-header .ds-social').addClass('ds-header-section_visible');
      $('body').removeClass('ds-start-menu-animation');
    }, 1600);
  }

  function hideMenu() {
    $('body').addClass('ds-start-menu-animation');
    $('.ds-header-menu, .ds-header .ds-social').removeClass('ds-header-section_visible');
    setTimeout(function() {
      $('.ds-header-right, .ds-header-middle').removeClass('ds-header-section_width-auto');
    }, 400);
    setTimeout(function() {
      $mobileMenu.removeClass('ds-header_height-auto');
    }, 800);
    setTimeout(function() {
      $('.ds-header-right, .ds-header-middle').hide();
      $mobileMenu.removeClass('ds-header_white');
      $('.ds-mobile-menu-layout').fadeOut(200);
    }, 1200);
    setTimeout(function() {
      $mobileMenu.removeClass('ds-header_compact');
      $('body').removeClass('ds-start-menu-animation');
    }, 1600);
  }

  //Main Menu
  $('.ds-mobile-menu').click(function(e) {
    e.preventDefault();

    $(this).toggleClass('menu_opened');
  });

  $('.ds-mobile-menu').click(function() {
    if ($(this).hasClass('menu_opened')) {
      showMenu();
    } else {
      hideMenu();
    }
  });

  $('.ds-mobile-menu-layout').click(function() {
    hideMenu();
    $('.ds-mobile-menu').removeClass('ds-menu_opened');
  });

  //Scroll To
  $(document).ready( onScroll);
  $(document).on('scroll', onScroll);

  $('.ds-header-menu a').on('click', function(e) {

    var headerH, target, menu, $target;
    headerH = $('.ds-header').outerHeight();
    target = this.hash;
    menu = target;
    $target = $(target);

    e.preventDefault();

    $(document).off('scroll');
    $('.ds-header-menu a').each(function() {
      $(this).removeClass('current');
    });
    $(this).addClass('current');
   
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top - headerH
    }, 800, 'swing', function() {
   
      window.location.hash = target;
      $(document).on('scroll', onScroll);
    });
  });
});

function onScroll(event) {

    var scrollPos, headerH;
    scrollPos = $(document).scrollTop();
    headerH = $('.ds-header').outerHeight();

    if (scrollPos >= 10) {
      $('.ds-header').addClass('ds-header_scroll');
    } else {
      $('.ds-header').removeClass('ds-header_scroll');
    }

    $('.ds-header-menu a').each(function() {
      var currLink, refElement, refElementPos;
      currLink = $(this);
      refElement = $(currLink.attr('href'));

      if(refElement.length){

        refElementPos = refElement.position().top - headerH;

        if (refElementPos <= scrollPos && (refElementPos + refElement.outerHeight()) >= scrollPos) {
          $('.ds-header-menu a').removeClass('current');
          currLink.addClass('current');
        } else {
          currLink.removeClass('current');
        }

      }
    });
  }


$(window).on('load', function() {
  var scrollPos, headerH;
  scrollPos = $(document).scrollTop();

  $('.ds-main_section').each(function() {
    var currSectionID, currSectionPosTop;
    currSectionID = $(this).attr('id');
    currSectionPosTop = $(this).position().top - headerH;
    if (currSectionPosTop >= scrollPos - 100 && currSectionPosTop <= scrollPos + 100) {
      $('.ds-header-menu a[href="#' + currSectionID + '"]').addClass('current');
    }
  });


});

$(window).resize(function () {
    mobileNavH();
});
