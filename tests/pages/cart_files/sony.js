(function ($) {

  /**Open tabs in mobile**/
  function TabsObject(element) {
    this.element = $(element);
    this.element.each( function(i , element) {
      if(i == 0) {
        $( this ).addClass('active');
        $( this ).next().addClass('open-first');
      }
    });

    this.element.on('click', $.proxy(this.openTabm, this));
  }

   TabsObject.prototype.openTabm = function(event) {
     var target = $(event.target),
         currentItem = this.element.filter('.active'),
         newItem = this.element.eq(target.index()),
         elementUp = target.parent().siblings().children('ul');

     target.siblings().removeClass('active').end().addClass('active');
     currentItem.removeClass('active');

     target.siblings().slideToggle('fast');
     elementUp.slideUp('fast');

     event.preventDefault();

  };

  var tabObj = new TabsObject('.tabs-title');

  /**JS object filter in listing page**/
  function sonyObject(element) {
    this.element = $(element);
  }

  sonyObject.prototype.triggerLink = function() {
    this.element.on('click', function () {
      window.location.href = $(this).find('a').attr('href');
    });
  }

  sonyObject.prototype.toggleFilter = function() {
    this.element.on('click', function (event) {
      var target = $(this),
          elementUp = target.next();

      elementUp.slideToggle('fast');
      target.toggleClass('filter-close');

      event.preventDefault();
    });
  }

  sonyObject.prototype.toggleMobile = function() {

    var elementUp = this.element.parents('.container').find('.product-filter');

    if (window.matchMedia('screen and (max-width: 800px)').matches) {
      this.element.unbind('click');
      this.element.bind('click', function (event) {
        var target = $(this);

        elementUp.slideToggle('fast');
        target.toggleClass('refine-open');

        event.preventDefault();
      });
    }
    if (window.matchMedia('screen and (min-width: 800px)').matches) {
      this.element.unbind('click');
      elementUp.show();
    }

  }

  sonyObject.prototype.showPassword = function() {
    this.element.on('click', function (event) {
      var target = $(this);

      target.toggleClass("show-password");

      var input = $(target.attr("toggle"));

      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }

      event.preventDefault();

    });
  }

  var loadLabel =  new sonyObject('.filter_item .label');
  var toggleObj =  new sonyObject('.filter-title');
  var refineObj =  new sonyObject('.filter-title__all');
  var pwObj     =  new sonyObject('.toggle-password');

  loadLabel.triggerLink();
  toggleObj.toggleFilter();
  refineObj.toggleMobile();
  pwObj.showPassword();

 /**Scroll Pane**/
  if ($("body").hasClass("template-customers-register")) {
    $('.section-term-description').jScrollPane();
  }

  if ($("body").hasClass("trademark--v3")) {
    $('.table-wrapper').jScrollPane();
  }

  $(window).resize(function() {
    if ($("body").hasClass("template-customers-register")) {
      $('.section-term-description').jScrollPane();
    }

    if ($("body").hasClass("trademark--v3")) {
      $('.table-wrapper').jScrollPane();
    }

    refineObj.toggleMobile();
  });

  /**Scroll to Top**/
  function scrollToTop() {
    var positionFooter = $('.footer').offset().top;

    var positionScroll = $('.shopify-section__footer').innerHeight();

    var scrollPositon = $(window).scrollTop()+ $(window).height();

    if ($(window).scrollTop() >= 200 ) {
      $('#scroll-to-top').fadeIn(200);
    } else {
      $('#scroll-to-top').fadeOut(200);
    }

    if(scrollPositon > positionFooter)  {
      $("#scroll-to-top").addClass("back");
    }
    if (scrollPositon < positionFooter) {
      $("#scroll-to-top").removeClass("back");
    }

  }

  $(window).scroll(function() {
    scrollToTop();
  });


  $(window).resize(function() {
   	scrollToTop();
  });

  $('#scroll-to-top').click(function() {
    $('body,html').animate({
      scrollTop : 0
    }, 500);
  });


  /**PDP**/
  if ($("body").hasClass("template-product")) {
//     var productThumbnails = $('.product__thumbnails');
    $('.product__thumbnails').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      dotsClass: 'slider-dots',
      infinite: false,
      prevArrow: '<button title="Prev" class="fs-slideshow__nav-button fs-slideshow__nav-prev slick-prev"><span>Prev</span><svg class="icon icon-arrow-left"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-arrow-left"></use></svg></button>',
      nextArrow: '<button title="Next" class="fs-slideshow__nav-button fs-slideshow__nav-next slick-next"><span>Next</span><svg class="icon icon-arrow-right"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-arrow-right"></use></svg></button>',

      responsive: [
        {
          breakpoint: 800,
          settings: {
            arrows: false,
            dots: true,
            dotsClass: 'slider-dots'
          }
        },
      ]
    });
  }

  /* Update installment rules in Cart */
   /* Update installment rules in Cart */
  $('#pay_installment, #pay_installmentmb,#pay_installment_10, #pay_installmentmb_10' ).on('click', function (e) {
    var id = $(this).attr("id");
    console.log(id);
    $( 'input[name="attributes[installment]"]' ).each(function( index ) {
      if($(this).attr("id") != id) {
      	$(this).prop("checked",false);
      }
    });

    if (this.checked) {
      $(".cart__checkout-button[name='checkout']").addClass("has__installment");
    } else{
      $(".cart__checkout-button[name='checkout']").removeClass("has__installment");
    }
  });
  $("#pay_installment").prop("checked",false);
  $("#pay_installmentmb").prop("checked",false);
  $("#pay_installment_10").prop("checked",false);
  $("#pay_installmentmb_10").prop("checked",false);

  $('body').on('click','.has__installment[name="checkout"]', function() {
    if ($('.cart__items .installment-cart').length > 1 || $('.mini-cart__inner .installment-cart').length > 1 ){
      if ($('.cart__items .installment-cart').hasClass("installment-true") || $('.mini-cart__inner .installment-cart').hasClass("installment-true")){
        $(".installment-modal").addClass("open");
        $('.installment-modal').click(function(e){
          var container = $(".installment-modal .installment_content");
          if (!container.is(e.target) && container.has(e.target).length === 0){
            $('.installment-modal').removeClass('open');
          }

        });

        return false;
      }
    }

  });
  /* Update pre order in Cart */
  $('#pay_installment, #pay_installmentmb, #pay_installment_10, #pay_installmentmb_10').on('click', function (e) {
    if (this.checked) {
      $(".cart__checkout-button[name='checkout']").addClass("has__installment");
    } else{
      $(".cart__checkout-button[name='checkout']").removeClass("has__installment");
    }
  });
  $("#pay_installment").prop("checked",false);
  $("#pay_installmentmb").prop("checked",false);
  $('body').on('click',".cart__checkout-button[name='checkout']", function() {
    var installment_value = $('input[name="attributes[installment]"]').val();
    if($(".cart__checkout-button[name='checkout']").hasClass("has__installment")){
      if ($('.cart__items .installment-cart').length > 1 || $('.mini-cart__inner .installment-cart').length > 1 ){
        if ($('.cart__items .installment-cart').hasClass("installment-true") ||
            $('.mini-cart__inner .installment-cart').hasClass("installment-true")){
          $(".installment-modal").addClass("open");
          $('.installment-modal').click(function(e){
            var container = $(".installment-modal .installment_content");
            if (!container.is(e.target) && container.has(e.target).length === 0){
              $('.installment-modal').removeClass('open');
            }

          });

          return false;

        }
      }
    }
    else {
      installment_value = "No";
      if ($('.cart__items .preorder-cart').length > 1 || $('.mini-cart__inner .preorder-cart').length > 1 ){
        if ($('.cart__items .preorder-cart').hasClass("preorder-true") ||
            $('.mini-cart__inner .preorder-cart').hasClass("preorder-true")){

          $(".preorder-modal").addClass("open");
          $('.preorder-modal').click(function(e){
            var container = $(".preorder-modal .preorder_content");
            if (!container.is(e.target) && container.has(e.target).length === 0){
              $('.preorder-modal').removeClass('open');
            }

          });

          return false;
        }
      }
    }

    $.getJSON('/cart.js', function(cart) {
      var preorder_type = $("#type-pre-order").val();
      if(typeof preorder_type == "undefined"){
         preorder_type = "";
      }

        console.log(preorder_type);
      if(installment_value == "No"){
        $.ajax({
          method: 'POST',
          url: '/cart/update.js',
          data: {
            "attributes[redemption_point]": cart.attributes.redemption_point,
            "attributes[point_with_rate]": cart.attributes.point_with_rate,
            "attributes[customer_id]": cart.attributes.customer_id ,
            "attributes[language]": cart.attributes.language,
            "attributes[type]": preorder_type,
            "attributes[installment]": installment_value
          },
          dataType: 'json'
        });

      }
      else {
      $.ajax({
          method: 'POST',
          url: '/cart/update.js',
          data: {
            "attributes[redemption_point]": cart.attributes.redemption_point,
            "attributes[point_with_rate]": cart.attributes.point_with_rate,
            "attributes[customer_id]": cart.attributes.customer_id ,
            "attributes[language]": cart.attributes.language,
            "attributes[type]": preorder_type
          },
          dataType: 'json'
        });
      }
    });

  });

  /**Show footnotes**/
  $( ".grid-footnotes" ).click(function() {
  	$( ".footnotes-text" ).slideToggle( "fast" );
    $( this ).toggleClass("close");
  });

  /**My Account format datetime and validate**/
  if ($("body").hasClass("trademark--v3")) {
    /**Fix date change wrong SESD-499**/
    var date = new Date()
    ,d = date.getDate()
    ,m = date.getMonth() + 1
    ,y = date.getFullYear()
    ,today = '' + (m<=9 ? '0' + m : m) + '/' + (d <= 9 ? '0' + d : d) + '/' + y;

    var day = new Date(today);
    var nextDay = new Date(day);

    nextDay.setDate(day.getDate()-7);

    var pd =  nextDay.getDate(),
        pm =	nextDay.getMonth() + 1,
        py =	nextDay.getFullYear(),
        pday  =  '' + (pm<=9 ? '0' + pm : pm) + '/' + (pd <= 9 ? '0' + pd : pd) + '/' + py;

    var dateFormat = "mm/dd/yy";

    var from  = $('#fa_date').datepicker({
      maxDate: today,
      dateFormat: "mm/dd/yy",
    }).on( "change", function() {
      to.datepicker( "option", "minDate", getDate( this ) );
    });

    var to = $('#fb_date').datepicker({
      maxDate: '0',
      dateFormat: "mm/dd/yy",
      minDate: pday,

    }).on( "change", function() {
      from.datepicker( "option", "maxDate", getDate( this ) );
    });

    function getDate( element ) {
      var date;
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
      } catch( error ) {
        date = null;
      }
      return date;
    }

    var date_current = new Date();
    date_current = new Date(date_current.getFullYear() -1, 11 , 31);

    $('#birthday').datepicker({
      defaultDate: null,
      changeMonth: true,
      changeYear: true,
      maxDate: date_current,
      yearRange: "-200:+0",
      dateFormat: "mm/dd/yy",
      showOn: "button",
      buttonText: '<span class="ic_calendar"><svg class="icon icon-calendar"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-calendar"></use></svg></span>',
    });

    $("#fb_date").blur(function(){
      var newDate = $(this).val();
      if (!moment(newDate, 'MM/DD/YYYY', true).isValid()){
        $(this).val(today);
        $(this).trigger('change');
      }
    });

    $("#fa_date").blur(function(){
      var newDate = $(this).val();
      if (!moment(newDate, 'MM/DD/YYYY', true).isValid()){
        $(this).val(today);
        $(this).trigger('change');
      }
    });
  };

  // Validate addressed form
  if ($("body").hasClass("trademark--v3")) {
    $(".submit-address").click(function () {

      $(this).parents('.form-address-validate').validate({
        rules: {
          'address[first_name]': {
            required: true,
             maxlength: 50
          },
          'address[last_name]': {
            required: true,
             maxlength: 50
          },
          'address[address1]': {
            required: true,
             maxlength: 120
          },
          'address[address2]': {
            maxlength: 120
          },
          'address[province]': {
            required: true,
          },
          'address[zip]': {
            required: true,
            maxlength: 6
          },
          'address[phone]': {
            required: true,
            maxlength: 15
          }
        },

        submitHandler: function(form) {
          form.submit();

        }

      });
    });
  }

}(jQuery));