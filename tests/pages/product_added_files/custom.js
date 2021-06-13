(function ($) {
  /**Menu**/
  function customSubMenu(){
    $( ".nav-dropdown.nav-dropdown--first" ).each(function( index ) {

      if(!$(this).find(".nav-dropdown--second").length){
        $(this).parent().addClass("not-dropdown-second");
      }
    });

  }

  customSubMenu();

  /**Search page**/
  $('.search__form .input-group__submit').on('click', function(){
    var input_search = $(".search__form .form__input").val().replace("/", " ");
    $(".search__form .form__input").val(input_search);
  });

  /**Tooltip**/
  $(".price-tooltip, .point-tooltip").mouseover(function(){
    if($(window).innerWidth() > 800){
      var scrollTop     = $(window).scrollTop(),
          elementOffset = $(this).offset().top,
          distance      = elementOffset - scrollTop,
          tooltip = $(this).next(),
          heightTooltip = tooltip.height(),
          heightWindow = $(window).innerHeight();

      tooltip.removeClass("move-to-top");
      tooltip.removeClass("move-to-bottom");

      if(distance + heightTooltip >= heightWindow ){
        var newPosition = 0;
        //update position tooltip
        tooltip.addClass("move-to-top");
      }
      else if(distance <= heightTooltip){
        tooltip.addClass("move-to-bottom");
      }
      else{
        tooltip.removeClass("new-position");
      }
    }
  });


  /**FOOTER**/
  $('.menu_links > h2').on('click', function(){
    var parent = $(this).parent(),
        windowWidth = window.innerWidth;

    if(windowWidth <= 800){
      parent.toggleClass("open");
    }

  });


  /**Home page**/

  /**New product**/
  var initNewProducts = function(domElement) {
    if (domElement.length === 0) {
      return;
    }

    domElement.slick({
      dots: false,
      //       dotsClass: 'slider-dots',
      arrows: true,
      adaptiveHeight: false,
      mobileFirst: true,
      infinite: false,
      centerMode: false,
      centerPadding: '0',
      slidesToShow: 2,
      slidesToScroll: 1,
      pauseOnHover: false,
      accessibility: false,
      useCSS: true,
      prevArrow: '<button title="Prev" class="fs-slideshow__nav-button fs-slideshow__nav-prev slick-prev"><span>Prev</span><svg class="icon icon-arrow-left"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-arrow-left"></use></svg></button>',
      nextArrow: '<button title="Next" class="fs-slideshow__nav-button fs-slideshow__nav-next slick-next"><span>Next</span><svg class="icon icon-arrow-right"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-arrow-right"></use></svg></button>',
      responsive: [

        {
            breakpoint: 320,
            settings: 'unslick'
          },

        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: false,
            arrows: true,
          }
        },
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            dots: false,
            arrows: true,
          }
        }
      ]

    })
  };



  /**Promotion Products**/
  var initPromotion = function(domElement) {
    domElement.find('.list-products').slick('unslick');
  };

  /**Category Mobile**/
  var initCategoryMobile = function(domElement) {
    if (domElement.length === 0) {
      return;
    }

    domElement.slick({
      dots: false,
      arrows: true,
      adaptiveHeight: false,
      mobileFirst: true,
      infinite: false,
      centerMode: false,
      centerPadding: '0',
      slidesToShow: 4,
      slidesToScroll: 4,
      pauseOnHover: false,
      accessibility: false,
      useCSS: true,
      prevArrow: '',
      nextArrow: '',
      responsive: [
        {
          breakpoint: 320,
          settings: {
            focusOnSelect: false,
            centerPadding: '5px',
            slidesToShow: 4,
            slidesToScroll: 4,
            dots: false,
            arrows: false
          }
        },
        {
          breakpoint: 768,
          settings: {
            centerMode: true,
            centerPadding: '5px',
            slidesToShow: 4,
            slidesToScroll: 4,
            dots: false,
            arrows: false
          }
        },
        {
          breakpoint: 1025,
          settings: 'unslick'
        }
      ]

    })
  };

  if($("body").hasClass("template-index")){
    initPromotion($('.shopify-section__promotions-product'));
    initNewProducts($('.section-new-products .list-products'));
  }


  /**Recently Viewed Item**/
  var initRecentViewed = function(domElement) {
    if (domElement.length === 0) {
      return;
    }

    domElement.slick({
      dots: false,
      arrows: true,
      adaptiveHeight: false,
      mobileFirst: true,
      infinite: false,
      centerMode: false,
      centerPadding: '0',
      slidesToShow: 2,
      slidesToScroll: 1,
      pauseOnHover: false,
      accessibility: false,
      useCSS: true,
      prevArrow: '<button title="Prev" class="fs-slideshow__nav-button fs-slideshow__nav-prev slick-prev"><span>Prev</span><svg class="icon icon-arrow-left"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-arrow-left"></use></svg></button>',
      nextArrow: '<button title="Next" class="fs-slideshow__nav-button fs-slideshow__nav-next slick-next"><span>Next</span><svg class="icon icon-arrow-right"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-arrow-right"></use></svg></button>',
      responsive: [

        {
            breakpoint: 320,
            settings: 'unslick'
          },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 6
          }
        }
      ]

    })
  };

  $(document).ready(function() {
    if($("#recently-viewed-products").hasClass("slick-initialized")){
      $("#recently-viewed-products").slick("unslick");
    }
    initRecentViewed($('#recently-viewed-products'));

    setWidthCategoryMobile();
    $( window ).resize(function() {
      setWidthCategoryMobile();
    });

    $(".fs-slideshow__slide.slick-slide").attr("data-current-time", $.now());

    $(".review-tab-title").on("click", function(){

//       showReview();
    });

    moveReviewToTabs();

    setTimeout(function(){
//       moveReviewToTabs();

      hideNoRating();
    }, 3000);
  });

  var setWidthCategoryMobile = function(){
    var widthBrowser = $( window ).width();

    if(widthBrowser < 768){
      var categoryItem = $(".js-list-category-mobile .category-item");
      var withcategoryItem = categoryItem.width(widthBrowser*0.21);
      $(".shopify-section__category-list-mobile").css('display','block');
      $(".js-list-category-mobile").width(categoryItem.length*withcategoryItem);
    }else{
      $(".js-list-category-mobile").width('auto');
    }
  }

  $(window).scroll(function() {

  });

  /**Disable Scroll on mobile**/

  function disableScroll(){
    $('.header__nav-toggle').on('touchmove', function (evt) {
      evt.preventDefault();
    });
  }
  function enableScroll(){
    $('.header__nav-toggle').off('touchmove', function (evt) {
      evt.preventDefault();
    });
  }

  $('.header__nav-toggle').on('click', function (evt) {
    checkDevice();
  });

  function checkDevice(){
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    if(windowWidth <= 1024 && $('.sidebar-nav').hasClass('sidebar-nav--open')){
      disableScroll();
    }
    else {
      enableScroll();
    }
  }
  function closeMinicart() {
    if(headerSearch.hasClass('header-search--open')) {
      headerSearch.removeClass('header-search--open');
    }
    if(miniCart.hasClass('mini-cart--open')) {
      miniCart.removeClass('mini-cart--open');
    }
    if(userLink.hasClass('open')) {
      userLink.removeClass('open');
      navUser.hide();
    }

    $('.page__overlay').removeClass('page__overlay--open');

    $("body").removeClass('no-scroll');

  }

  $('.page__overlay').bind('touchstart', function(e){
    closeMinicart();
  });

  $(document).on("click", '.close-minicart', function(event) {
    closeMinicart();
  });
  $(window).resize(function() {
    //    	initNewProducts($('.section-new-products .list-products'));
    initRecentViewed($('#recently-viewed-products'));

    if($("body").hasClass("template-index")){
      initNewProducts($('.section-new-products .list-products'));
    }
    checkDevice();
//     showReview();
    moveReviewToTabs();
  });

  /**Nav User Drop Down in Header**/
  var userLink = $('.user__link');
  var userDropdown = userLink.find('.link');
  var navUser = userLink.find('.nav-dropdown');
  var miniCart = $(".mini-cart");
  var headerSearch = $(".header-search");


  $(document).click(function (e) {

    if (!e) e = window.event;

    if($(e.target).hasClass("nav-dropdown__link")){
      //sub menu
      window.location.href = $(e.target).attr("href");
    }
    else if( $(e.target).hasClass("user__link") ||  $(e.target).parents(".user__link").length
            || $(e.srcElement).parents(".user__link").length
            || $(e.srcElement).hasClass("user__link")  ){

      if(headerSearch.hasClass('header-search--open')) {
        headerSearch.removeClass('header-search--open');
      }

      if(miniCart.hasClass('mini-cart--open')) {
        miniCart.removeClass('mini-cart--open');
      }

      if(userLink.hasClass('open')) {
        userLink.removeClass('open');
        $("body").removeClass('no-scroll');
        navUser.hide();
        $('.page__overlay').removeClass('page__overlay--open');
      }
      else {
        userLink.addClass('open');
        $("body").addClass('no-scroll');
        navUser.show();
        $('.page__overlay').addClass('page__overlay--open');
      }
    }
    else if( $(e.target).hasClass("search-form") ||  $(e.target).parents(".search-form").length  ){

      if(miniCart.hasClass('mini-cart--open')) {
        miniCart.removeClass('mini-cart--open');
      }

      if(userLink.hasClass('open')) {
        userLink.removeClass('open');
        navUser.hide();

      }
    }
    else {
      if( $(e.target).hasClass("page__overlay")){
        if(headerSearch.hasClass('header-search--open')) {
          headerSearch.removeClass('header-search--open');
        }
        if(miniCart.hasClass('mini-cart--open')) {
          miniCart.removeClass('mini-cart--open');
        }
        if(userLink.hasClass('open')) {
          userLink.removeClass('open');
          navUser.hide();
        }
        $('.page__overlay').removeClass('page__overlay--open');
        $("body").removeClass('no-scroll');
      }

      else if( $(e.target).hasClass("mini-cart-menu") || $(e.target).parents(".mini-cart-menu").length){
        if(headerSearch.hasClass('header-search--open')) {
          headerSearch.removeClass('header-search--open');
        }
        if(userLink.hasClass('open')) {
          userLink.removeClass('open');
          navUser.hide();
        }
      }
    }

  });

  function phone_validate(phno)
  {
    var regexPattern=new RegExp(/^[0-9]+$/);    // regular expression pattern
    return regexPattern.test(phno);
  }

  //update quantity in cart page
  $(".quantity-selector__current-quantity").keypress( function(){

    $(this).parents(".cart-item__quantity").find('.error_Msg.not_update').hide();
    $(this).parents(".cart-item__quantity").find('.error_Msg.not_update').text("");

  });

  $(".quantity-selector__current-quantity").focusout( function(){
    var link = $(this).attr("data-link"),
        quantity = $(this).val(),
        inventory_quantity = $(this).attr("data-inventory-quantity"),
        product_name = $(this).parents(".cart-item").find(".cart-item__title > a").text();

    inventory_quantity = parseInt(inventory_quantity);
    $(this).parents(".cart-item__quantity").find('.error_Msg.not_update').hide();
    $(this).parents(".cart-item__quantity").find('.error_Msg.not_update').text("");

    if(phone_validate(quantity) && quantity > 0 )
    {
      if(parseInt(quantity) <= inventory_quantity){
        $(this).parent().find('.error_Msg').hide();  // hides error msg if validation is true
        window.location.href = link + "&quantity=" + quantity;
      }
      else {
        let error_Msg_not_update = $(this).parents(".cart-item__quantity").find('.error_Msg.not_update');
        if(error_Msg_not_update.hasClass('ps5')){
          error_Msg_not_update.text(error_Msg_not_update.data('text'));
        }else{
          error_Msg_not_update.text(window.languages.sold_out_message);
        }
        $(this).parents(".cart-item__quantity").find('.error_Msg.not_update').css("display","block");   // shows validation msg if validation is false
        $(this).addClass("has-error");
        event.preventDefault();
      }
    }
    else
    {
      $(this).parent().find('.error_Msg').css("display","block");   // shows validation msg if validation is false
      $(this).addClass("has-error");
      event.preventDefault();

    }

  });

  $(".quantity-selector .increase-quantity").click( function(){
    var shop_link = $(".header__logo-link").attr("href");
    var link = shop_link + $(this).attr("data-link"),
        inventory_quantity = $(this).attr("data-inventory-quantity"),
        quantity = $(this).attr("data-quantity"),
        product_name = $(this).parents(".cart-item").find(".cart-item__title > a").text();
    var current_quantity = $(this).parent().find('input[name="update_quantity"]').val();

    $(this).parent().find('.error_Msg').hide();
    quantity = parseInt(quantity);
    inventory_quantity = parseInt(inventory_quantity);

    if(current_quantity != "" && phone_validate(current_quantity)){
      if(current_quantity >= inventory_quantity){
        let error_Msg_not_update = $(this).parents(".cart-item__quantity").find('.error_Msg.not_update');
        if(error_Msg_not_update.hasClass('ps5')){
          error_Msg_not_update.text(error_Msg_not_update.data('text'));
        }else{
          error_Msg_not_update.text(window.languages.sold_out_message);
        }
        $(this).parents(".cart-item__quantity").find('.error_Msg.not_update').css("display","block");   // shows validation msg if validation is false
        $(this).addClass("has-error");
        event.preventDefault();
      }
      else if(current_quantity > 0)
      {
        var increase_quantity = parseInt(current_quantity) +1;
        window.location.href = shop_link + $(this).parent().find('input[name="update_quantity"]').attr("data-link") + "&quantity=" + increase_quantity;
      }
      else
      {
        $(this).parent().find('.error_Msg').css("display","block");
        $(this).addClass("has-error");
        event.preventDefault();
      }

    }
    else {
      $(this).parent().find('.error_Msg').css("display","block");
      $(this).addClass("has-error");
      event.preventDefault();
    }

  });


  $(".quantity-selector__current-quantity").on('keyup', function(event){
    var link = $(this).attr("data-link"),
        quantity = $(this).val();

    if(phone_validate(quantity) && quantity > 0)
    {
      $(this).parent().find('.error_Msg').hide();  // hides error msg if validation is true
      $(this).removeClass("has-error");

      if ((event.keyCode ? event.keyCode : event.which) == 13 && phone_validate(quantity)) {
        window.location.href = link + "&quantity=" + quantity;
      }
    }

    else
    {
      $(this).parent().find('.error_Msg').css("display","block");   // shows validation msg if validation is false
      $(this).addClass("has-error");
      event.preventDefault();
    }


  });

  $(".cart__checkout-button").on("click", function(){
    if($(".quantity-selector__current-quantity").hasClass("has-error")){
      return false;
    }
  });


  $(".main-menu__links > li").click(function(){

    setTimeout(function(){
      checkDevice();
    }, 500);
  });


  function loginWishlist(){
    if ($('.customer-logout-in').length > 0) {
      $('.wishlist-modal').click(function(e){
        var container = $(".wishlist-modal .content");
        if (!container.is(e.target) && container.has(e.target).length === 0){
          $('.wishlist-modal').removeClass('wishlist-popup-wrapper');
        }
      });

      $(".wishlist_login").on("click", function(e){
        e.preventDefault();
        $(".wishlist-modal").toggleClass('wishlist-popup-wrapper');

        $(".wishlist-modal .close-popup").on("click", function(){
          $(".wishlist-modal").removeClass('wishlist-popup-wrapper');
        });
      });
    }
  }
  loginWishlist();

  function addWishlist(){
    if ($('.customer-logged-in').length > 0) {
      $(document).on('click', '.wishlist_collections:not(.btn-active)', function(e){
        e.preventDefault();
        $(this).addClass("btn-active");

        $(this).find(".tooltip").text(window.languages.added);
        var customer_id = $(this).attr('data-customer-id');
        var product_handle = $(this).attr('product-handle');
        var VariantId = $(this).attr('variantid');
        var $this = $(this);

        /*http.post('wishlist/addasync', {
          "CustomerId": customer_id,
          "Handle": product_handle,
          "VariantId": VariantId
        })
        .done(function(res){

        });*/
      });

      $( ".wishlist_collections" ).mouseover(function() {
        if($(this).hasClass("btn-active")){
          $(this).find(".tooltip").text(window.languages.removeWishlistText);
        } else{
          $(this).find(".tooltip").text(window.languages.addWishlistText);
        }
      });
    }
  }
  addWishlist();

  function removeWishlist(){
    if ($('.customer-logged-in').length > 0) {
      $(document).on('click', '.btn-active', function(e){
        e.preventDefault();
        $(this).removeClass("btn-active");
        $(this).find(".tooltip").text(window.languages.removed);
        var customer_id = $(this).attr('data-customer-id');
        var product_handle = $(this).attr('product-handle');
        var VariantId = $(this).attr('variantid');
        var $this = $(this);

        /*http.post('wishlist/deleteasync', {
          CustomerId: customer_id,
          Handle: product_handle,
          VariantId : VariantId
        })
        .done(function(res){

        });*/

      });
      $(document).on('click', '.wishlist-content .grid__cell .btn-active', function(e){
        $(this).parents(".grid__cell").remove();
      });
    }
  }
  removeWishlist();

  function getWishlist(product){
    if ($('.customer-logged-in').length > 0) {
      var customer_id = $('.header__secondary-nav .wishlist a').attr('data-customer_id'),
          wishlist_content= $(".wishlist-content"),
          varid = [],
          wishlist__count =$(".wishlist__count");
      /*http.get('wishlist/getallbycustomerasync/' + customer_id)
      .done(function(res) {

        var data = res.Data;

        if(data != null){
          for(let i=0; i< data.length; i++){
            var ProductHandle = data[i].Handle;
            var Variantid = data[i].VariantIds;
            for (let j=0; j<Variantid.length; j++ ){
              varid.push(Variantid[j]);
            }
            var wishlistProductPage = $(".template-product .product__details .wishlist_collections").attr("product-handle");
            if(wishlistProductPage == ProductHandle ){
              $(".template-product .input_variants").attr("data_variants",Variantid.toString());
            }

            if(ProductHandle != null && wishlist_content.length > 0){
              $.get('/products/'+ProductHandle+'?view=wishlist', function(data) {
                wishlist_content.append(data).html();

              }).then(function(data){
                for (let k=0; k<varid.length; k++){
                  var n = varid[k].toString();
                  $(".wishlist-page .grid__cell").each(function(){
                    var $this= $(this);
                    var g = $this .attr("data-variant").toString();
                    if(n === g){
                      $this.show();
                      $this.addClass("adding_wishlist");
                    }
                  });

                  // Start get product point in wishlist
                  var variantPrice = $('.mw-show-point[data-id='+ varid[k] +']').attr("data-price");
                  if(!varid[k] || !variantPrice)
                    $('.mw-show-point[data-id='+ varid[k] +']').html(0);
                  else
                  {
                    //http.get('products/getproductpoint?variantId=' + varid[k] + '&price=' + variantPrice)
                    //.done(function(data) {
                    //  $('.mw-show-point[data-id='+ varid[k] +']').html(data.Data);
                    //})
                    //.fail(function() {
                      $('.mw-show-point[data-id='+ varid[k] +']').html(0);
                    //});
                  }
                  // End get product point in wishlist
                }
                $(".wishlist-content > .grid__cell:not(.adding_wishlist)").remove();
              });
            }

            for (let n=0; n<varid.length; n++ ){
              var s = varid[n];

              $(".wishlist_collections").each(function(){
                var $this = $(this);
                var t = $this.attr("variantid");
                if (t == s ){
                  $this.addClass("btn-active");
                  $this.find(".tooltip").text(window.languages.removeWishlistText);
                  //                   return false;
                }
              });
            }

          }

        }
        var count = varid.length;
        $(wishlist__count).text(count);

        $(document).on('click', '.wishlist_collections', function(e){
          if($(this).hasClass("btn-active")){
            var counts = count +=1;
            $.cookie("els", counts);
          }else{
            var counts = count -=1;
            $.cookie("els", counts);
          }
          $(wishlist__count).text(counts);
        });
      });*/

      if ($('.template-product').length > 0) {
        $(".template-product .product__details .wishlist_collections").click(function(){
          var s = $(this).attr("variantid");
          var d = $(".product__details .input_variants").attr("data_variants");
          var wishlistarrays = d.split(",");
          if ($.inArray($(this).attr("variantid"), wishlistarrays) !== -1) {
            d = d.replace(s+",", "").replace(","+s, "").replace(s, "");
            $(".product__details .input_variants").attr("data_variants", d );
          }
          else {
            if(d != ""){
              $(".product__details .input_variants").attr("data_variants", d + "," + s);
            }
            else {
              $(".product__details .input_variants").attr("data_variants", s);
            }

          }
        });
        //         var selected =  $( ".product__variants .styled-select select option:selected" ).val();
        var selected =  $( "#sony-new-variant" ).val();
        $(".template-product .product__details .wishlist_collections").attr('variantid',selected)
      }
    }
  }
  getWishlist();


  function CouponCode(){
    var promotion   = $("#sony-promotion"),
        ProductId   = promotion.attr("productid"),
        VariantIds  =  $("#sony-new-variant").val(),
        ColecionIds = promotion.val(),
        CustomerId  = promotion.attr("customerid"),
        CountryId   = "",
        Currency    = promotion.attr("currency"),
        variantSelector = $(".product__form .single-option-selector"),
        loading = "<div class='loading'><div class='header-search__spinner'></div></div>",
        use_code =$('#use-code');

    /*$.ajax({
      url:"https://store.sony.co.th/apps/middleware_api/Products/GetInfoDiscount",
      method: "POST",
      data: { ProductId : ProductId , VariantIds: VariantIds, ColecionIds : ColecionIds, Currency : Currency ,CustomerId : CustomerId, CountryId: CountryId },
    }).done(function(res){
      var data = res.Data;
      var dataPR = "";
      for (let i=0; i<data.length; i++ ){
        var code = data[i].code,
            type_Code = data[i].typeCode,
            valueGet = data[i].valueGet;
        if (data[i].note != null){
          var note = " - "+data[i].note;
        }else{
          var note ="";
        }
        if (data[i].requirement != null){
          var requirement = " - "+data[i].requirement;
        }else{
          var requirement= "";
        }

        if (data[i].applyToOrder == true){
          var applyToOrder = "entire order";
        }else{
          var applyToOrder = "";
        }

        if (type_Code == "FixedAmount"){

          var  promotion = "Upto "+Shopify.formatMoney(data[i].value, window.myprice)+ " off "+applyToOrder + note + requirement;

        } else if(type_Code == "Percentage"){

          var  promotion = "Upto "+ data[i].value + "% off "+applyToOrder+ note + requirement;
        }else if(type_Code == "FreeShipping"){
          var promotion = "Free shipping";
        } else{
          var promotion = "BuyXGetY with " +  data[i].quantityBuy + " this product(s) to get "+ data[i].quantityGet+" Y in "+ valueGet +" at "+ data[i].value +"% off"+ note + requirement;
        }
        var template = "<p class='use-code'>Use Code: "+code+" <span class='promotion-code'>( "+promotion+" )</span></p>";
        dataPR += template;
        use_code.find(".loading").remove();
      }
      use_code.html(dataPR);
    });*/

    variantSelector.on("change", function() {
      setTimeout(function(){
        var VariantIds = $("#sony-new-variant").val();
        /*use_code.html(loading);
        $.ajax({
          url:"https://store.sony.co.th/apps/middleware_api/Products/GetInfoDiscount",
          method: "POST",
          data: { ProductId : ProductId , VariantIds: VariantIds, ColecionIds : ColecionIds, Currency : Currency ,CustomerId : CustomerId, CountryId: CountryId },
        }).done(function(res){
          var data = res.Data;
          var dataPR = "";
          for (let i=0; i<data.length; i++ ){
            var code = data[i].code,
                type_Code = data[i].typeCode,
                valueGet = data[i].valueGet;
            if (data[i].note != null){
              var note = " - "+data[i].note;
            }else{
              var note ="";
            }
            if (data[i].requirement != null){
              var requirement = " - "+data[i].requirement;
            }else{
              var requirement= "";
            }

            if (data[i].applyToOrder == true){
              var applyToOrder = "entire order";
            }else{
              var applyToOrder = "";
            }

            if (type_Code == "FixedAmount"){

              var  promotion = "Upto "+Shopify.formatMoney(data[i].value, window.myprice)+ " off "+applyToOrder + note + requirement;

            } else if(type_Code == "Percentage"){

              var  promotion = "Upto "+ data[i].value + "% off "+applyToOrder+ note + requirement;
            }else if(type_Code == "FreeShipping"){
              var promotion = "Free shipping";
            } else{
              var promotion = "BuyXGetY with " +  data[i].quantityBuy + " this product(s) to get "+ data[i].quantityGet+" Y in "+ valueGet +" at "+ data[i].value +"% off"+ note + requirement;
            }
            var template = "<p class='use-code'>Use Code: "+code+" <span class='promotion-code'>( "+promotion+" )</span></p>";
            dataPR += template;
            use_code.find(".loading").remove();
          }
          use_code.html(dataPR);
        });*/
      },70)
    })
  }

  function checkoutlink(){
    $(document).on('click', '.mini-cart__buttons .checkout_link, .checkout_link', function(e){
      $.cookie('check_out', "checkout",{expires:1, path:'/'});
    });

    if( $.cookie('check_out') != undefined && $('.check__out').length){
      $('body.template-customers-account').hide();
      window.location.href= "/cart";
      $.cookie('check_out', "checkout",{expires:-1, path:'/'});
    } else{
      $('body.template-customers-account').show();
      if ($('.check__out').length){
        $('head title').text($("#sony-title-page").text());
      }
    }
  }

  if ($("body").hasClass("trademark--v3")) {
    checkoutlink();
     CouponCode();

    var locations = window.location.href;
    var locale = "";
    var language_selected = $("#language-selected").text();
    if(locations != ""){
      var url_data = locations.split("?");
      if(url_data.length > 1){
        var temp = "";
        for (let i=0; i<url_data.length; i++ ){
       		var temp2 = url_data[i];
          if (temp2 == "locale=th" || temp2 == "locale=en" ){
            var temp =  url_data[i];
          	break;
          }else{
          	 var temp =  url_data[1];
          }
        }
        if(temp != ""){
          var temp1 = temp.split("&");
          if(temp1.length > 0 ){
            for (let j=0; j<temp1.length; j++ ){
            	var temp3 = temp1[j];
              if (temp3 == "locale=th" || temp3 == "locale=en" ){
              	locale = temp1[j];
              } else{
              	locale = temp1[0];
              }
            }
          }
        }
      }
    }

    /**Redirect in collection and product detail**/

      if(locale != ""){
        $("#ly-languages-switcher").each(function(){
          $(this).find("a").click(function(e){
            var ulr_locale = $(this).text().toLowerCase();
            var link = locations.replace(locale, "locale="+ulr_locale);
            history.pushState(null, null,link );

          })
        });

        if(locale == "locale=en" && language_selected == "th"){
          //update new language
          setTimeout(function(){
            langify.helper.saveLanguage("ly68452");
          }, 200);

        }
        if(locale == "locale=th" && language_selected == "en"){
          //update new language
          setTimeout(function(){
            langify.helper.saveLanguage("ly68453");
          }, 200);
        }
      }

    //custom product detail
    $( ".product-features .block-3column" ).each(function() {
        var block_3column_wrapper = $(this).html();
      $(this).html("<div>" + block_3column_wrapper + "</div>");
      });

  }

  if ($("body").hasClass("template-customers-order")) {
    /**order detail**/
    var shipping_label = $(".order__items .shipping-method").attr("data-label");

    if(shipping_label != "" && shipping_label.search ("Standard shipping") != -1){
      var shipping_label_new = shipping_label.replace("Standard shipping", window.languages.standard_shipping);
      $(".order__items .shipping-method").attr("data-label",shipping_label_new);
    }
  }

  /**Edit profile**/
  function checkUserLogin(){
    var check = false;
    var user_name = "";
    if($(".user-dropdown__item").find(".user-logined")){
      user_name = $(".user-dropdown__item .user-logined").attr("title");

      if(user_name != undefined && user_name != "") {
        check = true;
      }
    }

    if(check== false){
      window.location.href = $(".header__logo-link").attr("href");
    }
  }

  /**Validate form edit**/
  if ($("body").hasClass("trademark--v3")) {
    $(".edit-profile-btn").click(function () {

      $('.form-edit-validate').validate({
        rules: {
          'customer[first_name]': {
            required: true,
            maxlength: 50
          },

          'customer[last_name]': {
            required: true,
            maxlength: 50
          },

          'customer[email]': {
            required: true,
            maxlength: 50
          },
          'customer[phone]': {
            required: true,
            maxlength: 15
          }
        },

        submitHandler: function(form) {
          var email = $('input[name="customer[email]"]').val();
          var postData = {
            "id": $("#customer-id").val(),
            "origin": "TH",
            "country_locale": "th_TH",
            "first_name": $("#customer-firstname").val(),
            "last_name": $("#customer-lastname").val(),
            "phone": $("#customer-phone").val(),
            "email": $("#customer-email").val()
          }

          var btnSignUp = $('.edit-profile-btn');
          btnSignUp.addClass('button--loading');
          btnSignUp.prop('disabled', true);

          http.post('Shopify/UpdateShopifyCustomer', postData)
          .done(function(res){
            if (res.Status) {
              $('.alert').removeClass("alert--error");
              $('.alert').addClass("alert--success");
              $('.alert__title').text(window.languages.editProfileSuccess);
            }
            else {
              $('.alert').removeClass("alert--success");
              $('.alert').addClass("alert--error");
              if(res.Message == "Invalid phone number."){
                $('.alert__title').text(window.languages.edit_phone_invalid);
              }
              else{
                $('.alert__title').text(window.languages.edit_phone_existed);
              }

            }
          })
          .always(function(e){
            btnSignUp.removeClass('button--loading');
            btnSignUp.prop('disabled', false);
          });

        }
      });


    });

    $(".find_store__form [type='submit']").click(function () {

      $('.find_store__form').validate({
        rules: {
          '#find-store-postcode': {
            required: true
          }
        },

        submitHandler: function(form) {
          var postcode = $('#find-store-postcode').val();
          var url = $(".find_store__form").attr("action");
          url = url + "/?query=" + postcode;
          window.open(url, '_blank');
          return false;
        }
      });


    });

    $("#btnChangePassword").click(function () {
      $('.form-validate').validate({
        rules: {
          'email': {
            required: true,
            email: true
          },

          'current_password': {
            required: true,
            rangelength: [8, 20]
          },

          'new_password': {
            required: true,
            rangelength: [8, 20],
            pwcheck: "Password Valid!"
          }
        },

        submitHandler: function(form) {
          var postData = {
            "email": $('#change-password input[name="email"]').val(),
            "currentPassword": $('#change-password input[name="current_password"]').val(),
            "newPassword": $('#change-password input[name="new_password"]').val()

          }
          var btnChangePassword = $("#btnChangePassword");
          btnChangePassword.addClass('button--loading');
          btnChangePassword.prop('disabled', true);

          http.post('Azure/ChangePassword', postData)
          .done(function(res){
            if (res.Status) {
              res.Message = window.languages.change_password_success;
              $('.reg--error').removeClass("alert--error");
              $('.reg--error').addClass("alert--success");
            }
            else {
              $('.reg--error').show();
              if(res.Message == "Your password is incorrect.") {
                res.Message = window.languages.change_password_wrong_pass;
              }
              else if(res.Message == "No account found with that email.") {
                res.Message = window.languages.change_password_wrong_email;
              }
              else if(res.Message == "Password can not change.") {
                res.Message = window.languages.change_password_fail;
              }

              $('.reg--error').removeClass("alert--success");
              $('.reg--error').addClass("alert--error");
            }

            $('.reg--error--title').text(res.Message);
            $('.reg--error').show();
          })
          .always(function(e){
            btnChangePassword.removeClass('button--loading');
            btnChangePassword.prop('disabled', false);
          });

          return false;
        }
      });

      $.validator.addMethod("pwcheck", function(value, element) {
        return /^[A-Za-z0-9\d=!\-@._#&%*]*$/.test(value) // consists of only these
        && /[a-z]/.test(value) // has a lowercase letter
        && /[A-Z]/.test(value) // has a uppercase letter
        && /\d/.test(value) // has a digit
        && /[!\-@._#&%*]/.test(value) //has one special character without space
      }, window.languages.invalid_password);



    });

    $("#money_vat").text(Shopify.formatMoney($("#money_vat").text(), window.theme.order_money));
  $("#excluded_tax").text(Shopify.formatMoney($("#excluded_tax").text(), window.theme.order_money));

  }

  /**Multi language**/

  $( ".multi-language-selector >span" )
  .mouseover(function() {
    $(this).parent().addClass("open");
  })
  .mouseout(function() {
    $(this).parent().removeClass("open");
  });

  $( ".multi-language-selector ul" )
  .mouseover(function() {
    $(this).parent().addClass("open");
  })
  .mouseout(function() {
    $(this).parent().removeClass("open");
  });

  $("#ly-languages-switcher img").click(function() {
    $(this).parent().find("a").trigger("click");
  });


  /***Delete Address***/
  $(".delete-address").click(function(){
    if (confirm(window.languages.delete_confirm)) {
      // your deletion code
      var address_id = $(this).attr("data-address-id");

      Shopify.postLink('/account/addresses/'+ address_id, {'parameters': {'_method': 'delete'}});
    }
    else{
      event.preventDefault();
    }

    return false;
  });

function showReview(){
    if($(window).innerWidth() > 800){
      if (!$('.product-review-m').is(':empty')){
        //do something
        var html = $(".product-review-m").html();
        $(".product-review").html(html);
      }
    }
    else {
      if (!$('.product-review').is(':empty')){
        var html = $(".product-review").html();
        $(".product-review-m").html(html);

      }
    }



  }

  /**Show review tab after clicking star**/


  window.bvCallback = function(BV) {

   BV.reviews.on('show', function() {
     if($(window).innerWidth() > 800){
       $('.tabs__nav-item.review-tab-title').click();

       setTimeout(function(){
         $('html, body').animate({
           scrollTop: $(".product__tabs.gwt__tab--active").offset().top - 100
         }, 0);

       }, 100);

     }
     else {
       if(!$(".gwt__tab-m--active .tabs__nav-item-m > .review-tab-title").hasClass("active")){
         $('.gwt__tab-m--active .tabs-title.review-tab-title').click();
       }

       setTimeout(function(){
         $('html, body').animate({
           scrollTop: $(".gwt__tab-m--active .tabs-title.review-tab-title").offset().top - 50
         }, 0);

       }, 100);

     }

       return false;

   });

};


  /**Hide no review***/
  function hideNoRating(){
    $(".product-item").each(function(){

      var inline_rating = $(this).find('[data-bv-show="inline_rating"]');
      var bv_text = $(this).find('.bv_text').text();

      if(bv_text == '(0)'){
        inline_rating.hide();
      }

    });

    if($("#num-reviews-button").length && $("#num-reviews-button").text() == '(0)') {
         $('[data-bv-show="rating_summary"]').hide();
      $(".review-tab-title").hide();
      $(".review-tab-m").parents(".tabs__nav-item-m").hide();
    }
  }

  function moveReviewToTabs(){
    var productId = $('#productBVId').val();
    console.log('productId', productId);
    var html = '<div data-bv-show="reviews" data-bv-product-Id="'+productId+'"></div>';

    if($(window).innerWidth() > 800){
      $(".product-review-m").html("");
      $(".product__tabs").each(function(){
        if($(this).hasClass("gwt__tab--active")){
          //move review
          $(this).find(".tabs__content-item.review-tab .product-review").html(html);
        }
        else {
          $(this).find(".tabs__content-item.review-tab .product-review").html("");
        }
      });
    }
    else {
      $(".product-review").html("");
      $(".product__tabs-m").each(function(){
        if($(this).hasClass("gwt__tab-m--active")){
          //move review
          $(this).find(".tabs__content-item-m .review-tab-m .product-review-m").html(html);
        }
        else {
          $(this).find(".tabs__content-item-m .review-tab-m .product-review-m").html("");
        }
      });
    }
  }

  var variantSelector = $(".product__form .single-option-selector");

  variantSelector.on("change", function() {
    $(".tabs__nav-item").removeClass("tabs__nav-item--active");
    $(".tabs__content-item").removeClass("tabs__content-item--active");
    $(".tabs-title.review-tab-title").removeClass("active");

    setTimeout(function(){
      $(".product__tabs.gwt__tab--active").find(".tabs__nav-item:first-child").addClass("tabs__nav-item--active");
      $(".product__tabs.gwt__tab--active").find(".tabs__content-item:first-child").addClass("tabs__content-item--active");
      $(".product__tabs-m.gwt__tab-m--active").find(".tabs__nav-item-m:first-child .tabs-title").addClass("active");
      $(".product__tabs-m.gwt__tab-m--active").find(".tabs__nav-item-m:first-child .tabs-title + ul").show();
      moveReviewToTabs();
    }, 800);
  });


}(jQuery));


