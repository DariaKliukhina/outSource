$(document).ready(function () {
  //Menu
  let body = $('body');
  let menuOpenBtn = $('.jsMenuBtn');
  let nav = $('.jsNav');

  menuOpenBtn.on('click', function () {
    nav.toggleClass('open');
    body.toggleClass('open-menu')
  });

  //Tabs
  let tabControl = $('.jsTabControl');
  let tab = $('.jsTab');

  tabControl.on('click', function (e) {
    e.preventDefault();

    let currentId = $(this).data('id');
    tab.removeClass('current');
    tabControl.removeClass('current');

    $(this).addClass('current');
    $(`#${currentId}`).addClass('current');
  });

  //Sliders

  let industrySlider = $('.jsIndustrySlider');

  let sliderInit = (slider, slidesToShow, options) => {
    let currentContainer = slider.closest('.jsSliderContainer');

    slider.slick({
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      arrows: false,
      infinite: true,
      dots: false,
      responsive: options
    });

    let allSlides = slider.slick("getSlick").slideCount;
    let countBlock =  currentContainer.find('.jsAllSlides');
    console.log(countBlock);
    countBlock.text(allSlides);


    slider.on("afterChange", function (event, slick, currentSlide, nextSlide) {
      currentContainer.find('.jsCurrentSlide').text(currentSlide+1);
    });

    let next = currentContainer.find('.jsNext');
    let prev = currentContainer.find('.jsPrev');

    next.click(function () {
      slider.slick("slickNext");
    });

    prev.click(function () {
      slider.slick("slickPrev");
    });
  };

  if (industrySlider.length > 0) {
    let industryToShow = 6;
    let industryOptions = [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 578,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
    ];

    sliderInit(industrySlider, industryToShow, industryOptions);
  }

  let pressSlider = $('.jsPressSlider');

  if (pressSlider.length > 0) {
    let pressToShow = 4;
    let pressOptions = [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 578,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 478,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
    ];

    sliderInit(pressSlider, pressToShow, pressOptions);
  }


});
