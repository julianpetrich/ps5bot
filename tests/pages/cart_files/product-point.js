(function ($) {
  /*const MIDDLEWARE_HOST = "https://smartoscplus.myshopify.com/apps/";
  const GET_INFO_ENDPOINT = "middlewareapi/Products/GetProductPoint";*/

  var earnPoint = $('.mw-show-point');
  var newVariant = $("#sony-new-variant");
  var variantSelector = $(".product__form .single-option-selector");
  var pdpProductPoint = $("#pdp-product-point");
  var productId = $("#product-id").attr("data-value");

  function GetProductPoint(variantId, price, element, point)
  {
    if(!variantId || !price){
        // element.html(0);
    }
    else{
      element.html(point);
      // http.get('products/getproductpoint?variantId=' + variantId + '&price=' + price)
      // .done(function(data) {
      //   element.html(data.Data);
      // })
      // .fail(function() {
      //   element.html(0);
      // });

      /*$.ajax({
        url: MIDDLEWARE_HOST + GET_INFO_ENDPOINT,
        method: "GET",
        data: { variantId : variantId , price: price }
      })
      .done(function(data) {
        element.html(data.Data);
      })
      .fail(function() {
        element.html(0);
      });*/
    }
  }

  function UpdateProductTab(productId, variantId)
  {
    // Desktop
    $(".gwt__tab").removeClass("gwt__tab--active");
    $("#gwt_" + productId + "_" + variantId).addClass("gwt__tab--active");

    // Mobile
    $(".gwt__tab-m").removeClass("gwt__tab-m--active");
    $("#gwt_" + productId + "_" + variantId + "-m").addClass("gwt__tab-m--active");
  }

  earnPoint.each(function() {
    var variantId = $(this).attr("data-id");
  	var variantPrice = $(this).attr("data-price");
    var currentTemplate = $(this).attr("data-template");

  	GetProductPoint(variantId, variantPrice, $(this));

    // Break to reduce request if current page is PDP
    if(currentTemplate == "product")
      return false;
  });

  variantSelector.on("change", function() {
    // TODO: Check current variant

    var variantId;
    var variantPrice;
    var point = $(this).parent().data('point');
    if(point == undefined){
      console.log($(this).val());
      point = $(this).find(":selected").data('point');
    }
    setTimeout(function(){
      variantId = newVariant.val();
      variantPrice = newVariant.attr("data-price");
      GetProductPoint(variantId, variantPrice, pdpProductPoint, point);
      UpdateProductTab(productId, variantId);
       updateFeatureProduct();
    }, 700);


  });

  function updateFeatureProduct(){
    var j = 0;

    if($(window).outerWidth() >= 800){

      $(".gwt__tab--active .tabs__content-item .product-features .block-3column").each(function(){
        var $this= $(this);
        var index = $this.index();

        var X = 0, Y=0, Z=0, columns = 1;
        var style = "position: absolute; top: 0;left:0; ";
        var transform = "transform: translate3d("+ X + "px," + Y + "px, 0px) scale3d(1, 1, 1)";
        var padding = 0;
        var grid__block_w = $(".gwt__tab--active .tabs__nav").innerWidth();
        var block_3column_w = 0;

        columns = 3;
        grid__block_w = parseInt(grid__block_w);
        block_3column_w = grid__block_w*32/100;
        block_3column_w = parseInt(block_3column_w);
        padding = (grid__block_w - (block_3column_w*3))/2;
        padding = parseInt(padding);

        if(index < columns){
          Y = 0;

          if(index == 0) {
            X = 0;
          }
          else {
            X = (block_3column_w + padding)*index;
          }
        }
        else{
          Y = parseInt($(".gwt__tab--active .tabs__content-item .product-features .block-3column").eq(index-3).outerHeight()) + 20;
          var translateY = $(".gwt__tab--active .tabs__content-item .product-features .block-3column").eq(index-3).attr("data-y");
          Y += parseInt(translateY);

          if(index%columns == 0){
            X = 0;
            j++;
          }
          else {
            X = (block_3column_w + padding)*(index - j*columns);

          }
        }

        transform = "transform: translate3d("+ X + "px," + Y + "px, 0px) scale3d(1, 1, 1)";
        style +=  transform;
        $this.attr("style", style);
        $this.attr("data-y", Y);

      });

      var index = $(".gwt__tab--active .tabs__content-item .product-features .block-3column").last().index();
      var column_1 = parseInt($(".gwt__tab--active .tabs__content-item .product-features .block-3column").eq(index-2).outerHeight());
      column_1 += parseInt($(".gwt__tab--active .tabs__content-item .product-features .block-3column").eq(index-2).attr("data-y"));
      var column_2 = parseInt($(".gwt__tab--active .tabs__content-item .product-features .block-3column").eq(index-1).outerHeight());
      column_2 += parseInt($(".gwt__tab--active .tabs__content-item .product-features .block-3column").eq(index-1).attr("data-y"));
      var column_3 = parseInt($(".gwt__tab--active .tabs__content-item .product-features .block-3column").eq(index).outerHeight());
      column_3 += parseInt($(".gwt__tab--active .tabs__content-item .product-features .block-3column").eq(index).attr("data-y"));

      var grid__block_h = Math.max(column_1, column_2, column_3);

      $(".gwt__tab--active .tabs__content-item .product-features .grid__block").css("height", grid__block_h + "px");
      $(".gwt__tab-m--active .product-features .grid__block").css("height", "auto");

    }
    else if($(window).outerWidth() >= 560 && $(window).outerWidth() < 800){
      $(".gwt__tab-m--active .tabs__content-item-m .product-features .block-3column").each(function(){
        var $this= $(this);
        var index = $this.index();

        var X = 0, Y=0, Z=0, columns = 1;
        var style = "position: absolute; top: 0;left:0;";
        var transform = "transform: translate3d("+ X + "px," + Y + "px, 0px) scale3d(1, 1, 1)";
        var padding = 0;
        var grid__block_w = $(".gwt__tab-m--active .tabs__nav").innerWidth();
        var block_3column_w = 0;

        columns = 2;
        grid__block_w = parseInt(grid__block_w);
        block_3column_w = grid__block_w*48/100;
        block_3column_w = parseInt(block_3column_w);
        padding = grid__block_w - block_3column_w;
        padding = parseInt(padding);

        if(index < columns){
          Y = 0;

          if(index == 0) {
            X = 0;
          }
          else {
            X = grid__block_w - block_3column_w;
          }
        }
        else{
          Y = parseInt($(".gwt__tab-m--active .tabs__content-item-m .product-features .block-3column").eq(index-2).outerHeight()) + 20;
          var translateY = $(".gwt__tab-m--active .tabs__content-item-m .product-features .block-3column").eq(index-2).attr("data-y");
          Y += parseInt(translateY);

          if(index%columns == 0){
            X = 0;
          }
          else {
            X = grid__block_w - block_3column_w;

          }

        }

        transform = "transform: translate3d("+ X + "px," + Y + "px, 0px) scale3d(1, 1, 1)";
        style +=  transform;
        $this.attr("style", style);
        $this.attr("data-y", Y);

      });

      var index = $(".gwt__tab-m--active .tabs__content-item-m .product-features .block-3column").last().index();
      var column_1 = parseInt($(".gwt__tab-m--active .tabs__content-item-m .product-features .block-3column").eq(index-1).outerHeight());
      column_1 += parseInt($(".gwt__tab-m--active .tabs__content-item-m .product-features .block-3column").eq(index-1).attr("data-y"));
      var column_2 = parseInt($(".gwt__tab-m--active .tabs__content-item-m .product-features .block-3column").eq(index).outerHeight());
      column_2 += parseInt($(".gwt__tab-m--active .tabs__content-item-m .product-features .block-3column").eq(index).attr("data-y"));

      var grid__block_h = Math.max(column_1, column_2);
      $(".gwt__tab-m--active .tabs__content-item-m .product-features .grid__block").css("height", grid__block_h + "px");
      $(".gwt__tab-m--active .tabs__content-item .product-features .grid__block").css("height", "auto");
    }
    else{
      $(".product-features .block-3column").each(function(){
        $(this).removeAttr("style");
      });

      $(".gwt__tab-m--active .tabs__content-item-m .product-features .grid__block").css("height", "auto");
      $(".gwt__tab--active .tabs__content-item .product-features .grid__block").css("height", "auto");
    }
  }

}(jQuery));
