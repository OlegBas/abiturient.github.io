$(function () {
  $("#btnGetConsult").on("click", function (e) {
    alert(
      "Заявка успешно зарегистрирована! В блиджайшее время с Вами свяжется специалист приемной комиссии!"
    );
    e.preventDefault();
  });
  $("header").addClass("header-scrolled");
  $(".zoom").magnificPopup({
    type: "image",
  });
  $(".zoom-gal").magnificPopup({
    type: "image",
    gallery: { enabled: true },
  });
  $(".modal-window").magnificPopup({
    type: "inline",
  });
  $(".ajax-link").magnificPopup({
    type: "ajax",
  });

  // // Слайдер
  // $(".slider").slick({
  //   autoplay: true,
  //   speed: 2000,
  //   autoplaySpeed: 7000,
  //   fade: true,
  //   arrows: false,
  //   dots: false,
  //   adaptiveHeight: false,
  //   pauseOnHover: false,
  //   swipe: false,
  //   touchMove: false,
  //   prevArrow: '<button type="button" class="slick-prev"></button>',
  //   nextArrow: '<button type="button" class="slick-next"></button>',
  // });

  // Слайдер этапы работы
  $(".vertical-slider").slick({
    dots: true,
    infinite: true,
    arrows: false,
    fade: true,
    autoplay: false,
    pauseOnHover: false,
    swipe: false,
    touchMove: false,
    autoplaySpeed: 7000,
    adaptiveHeight: true,
  });

  // Навигация
  $(".nav").onePageNav({
    currentClass: "active",
    changeHash: false,
    scrollSpeed: 750,
    scrollThreshold: 0.5,
    filter: "",
    easing: "swing",
  });

  $(".nav a").on("click", function () {
    $(".menu-btn").removeClass("active");
    $(".navigation").removeClass("active");
  });

  $(".menu-btn").on("click", function () {
    $(this).toggleClass("active");
    $(".navigation").toggleClass("active");
  });

  // Стрелочка вниз
  $(".arrow-down-wrapper").onePageNav();

  // Плавный якорь
  $("a.smoothScroll").click(function () {
    var elementClick = $(this).attr("href");
    var destination = $(elementClick).offset().top;
    jQuery("html:not(:animated),body:not(:animated)").animate(
      { scrollTop: destination },
      800
    );
    return false;
  });

  // Галерея
  $(".gallery-list").isotope({
    itemSelector: ".gallery-item",
  });
  var $gallery = $(".gallery-list").isotope({});
  $(".filters-button-group").on("click", "span", function () {
    var filterValue = $(this).attr("data-filter");
    $gallery.isotope({ filter: filterValue });
  });
  $(".filters-button-group").on("click", "span", function () {
    $(this).addClass("active").siblings().removeClass("active");
  });

  // Анимация для блоков
  new WOW().init();

  // Слайдер отзывы
  $(".reviews-slider").slick({
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 7000,
    dots: true,
    infinite: false,
    arrows: false,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
  });

  $(document).on("af_complete", function (event, response) {
    if (response.success) {
      $(".success-form-wrapper").fadeIn(300);
      setTimeout(function () {
        $(".success-form-wrapper").fadeOut(300);
        $.magnificPopup.close();
      }, 5000);
    } else {
      AjaxForm.Message.error("В форме содержатся ошибки!");
    }
    response.message = "";
  });

  $(".success-form-wrapper").click(function () {
    $(".success-form-wrapper").fadeOut(300);
    $.magnificPopup.close();
  });

  // Конвертация
  jQuery("img.svg").each(function () {
    var $img = jQuery(this);
    var imgID = $img.attr("id");
    var imgClass = $img.attr("class");
    var imgURL = $img.attr("src");

    jQuery.get(
      imgURL,
      function (data) {
        var $svg = jQuery(data).find("svg");
        if (typeof imgID !== "undefined") {
          $svg = $svg.attr("id", imgID);
        }
        if (typeof imgClass !== "undefined") {
          $svg = $svg.attr("class", imgClass + " replaced-svg");
        }
        $svg = $svg.removeAttr("xmlns:a");
        if (
          !$svg.attr("viewBox") &&
          $svg.attr("height") &&
          $svg.attr("width")
        ) {
          $svg.attr(
            "viewBox",
            "0 0 " + $svg.attr("height") + " " + $svg.attr("width")
          );
        }
        $img.replaceWith($svg);
      },
      "xml"
    );
  });
});

$(function () {
  var toTopButton = $("#button-to-top");
  var edgeValue = 100;
  var wind = $(window);

  $(window)
    .scroll(function (e) {
      toTopButton.toggle(wind.scrollTop() > edgeValue);
    })
    .trigger("scroll");
  toTopButton.click(function () {
    $("html, body").animate({ scrollTop: 0 }, 300);
  });
});
