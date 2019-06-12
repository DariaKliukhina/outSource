"use strict";

$(document).ready(function () {
  //Menu
  var body = $('body');
  var menuOpenBtn = $('.jsMenuBtn');
  var nav = $('.jsNav');
  menuOpenBtn.on('click', function () {
    nav.toggleClass('open');
    body.toggleClass('open-menu');
  }); //Tabs

  var tabControl = $('.jsTabControl');
  var tab = $('.jsTab');
  tabControl.on('click', function (e) {
    e.preventDefault();
    var currentId = $(this).data('id');
    tab.removeClass('current');
    tabControl.removeClass('current');
    $(this).addClass('current');
    $("#".concat(currentId)).addClass('current');
  }); //Sliders

  var industrySlider = $('.jsIndustrySlider');

  var sliderInit = function sliderInit(slider, slidesToShow, options) {
    var currentContainer = slider.closest('.jsSliderContainer');
    slider.slick({
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      arrows: false,
      infinite: true,
      dots: false,
      responsive: options
    });
    var allSlides = slider.slick("getSlick").slideCount;
    var countBlock = currentContainer.find('.jsAllSlides');
    countBlock.text(allSlides);
    slider.on("afterChange", function (event, slick, currentSlide, nextSlide) {
      currentContainer.find('.jsCurrentSlide').text(currentSlide + 1);
    });
    var next = currentContainer.find('.jsNext');
    var prev = currentContainer.find('.jsPrev');
    next.click(function () {
      slider.slick("slickNext");
    });
    prev.click(function () {
      slider.slick("slickPrev");
    });
  };

  if (industrySlider.length > 0) {
    var industryToShow = 6;
    var industryOptions = [{
      breakpoint: 1199,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 578,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }];
    sliderInit(industrySlider, industryToShow, industryOptions);
  }

  var pressSlider = $('.jsPressSlider');

  if (pressSlider.length > 0) {
    var pressToShow = 4;
    var pressOptions = [{
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 578,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 478,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }];
    sliderInit(pressSlider, pressToShow, pressOptions);
  }

  var newsSlider = $('.jsNewsSlider');
  var width = $(window).width();

  if (newsSlider.length > 0) {
    if (width < 1199) {
      var newsToShow = 3;
      var newsOptions = [{
        breakpoint: 2600,
        settings: "unslick"
      }, {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 578,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 478,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }];
      sliderInit(newsSlider, newsToShow, newsOptions);
      $(window).resize(function () {
        var width = $(window).width();

        if (width < 1199 && !newsSlider.hasClass('slick-slider')) {
          sliderInit(newsSlider, newsToShow, newsOptions);
        }
      });
    }
  } //inputs


  var input = $('.input-block__input');
  input.focus(function () {
    $(this).parents('.input-block').addClass('focused');
  });
  input.blur(function () {
    if (!$.trim(this.value).length) {
      $(this).removeClass('filled');
      $(this).parents('.input-block').removeClass('focused');
    } else {
      $(this).addClass('filled');
    }
  });
});