(function ($) {
  /***Features Product**/
  if ($("body").hasClass("trademark--v3")) {
    
    $(".gwt__tab-m .tabs__nav-item-m .tabs-title, .gwt__tab .tabs__nav-item").click(function(){     
     
      updateFeatureProduct();
    });
    
    
    
    $(window).resize(function() { 
      updateFeatureProduct();
    });
  }
  
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


