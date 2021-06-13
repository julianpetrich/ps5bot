(function ($) {
  const MIDDLEWARE_HOST = "https://smartoscplus.myshopify.com/apps/";
  const GET_INFO_ENDPOINT = "middlewareapi/Products/GetProductTechSpecAndFeature";
  
  var highlightTabTitle = $('#highlight-tabs-title');
  var techSpecTabTitle = $('#specification-tabs-title');
  var featureTabTitle = $('#feature-tabs-title');
  var supportTabTitle = $('#support-tabs-title');
  
  var productHighlight = $("#product-highlight");
  var productTechSpec = $("#product-techspec");
  var productFeatures = $("#product-features");
  var productSupport = $("#product-support");
  
  var productHighlightMobile = $("#product-highlight-m");
  var productTechSpecMobile = $("#product-techspec-m");
  var productFeaturesMobile = $("#product-features-m");
  var productId = $("#product-id").attr("data-value");//1966168604761;
  var specificationsIndex = 2;
  var featuresIndex = 3;
  
  function GetTechSpecAndFeature(productId)
  { 
  	DisplayHighlight();
    DisplayTechSpecs();
    DisplayFeatures();
    
    http.get('products/getproducttechspecandfeature?productId=' + productId)
    .done(function (res) {
      if(res.Status)
      {
      	var products = res.Data;
       	
        if(products === undefined || products.length == 0)
        {
          supportTabTitle.addClass("tabs__nav-item--active");
          productSupport.addClass("tabs__content-item--active");
          
          return false;
        }
      
        products.forEach(function(product) {
          if(product.Highlight)
          {
            DisplayHighlight(true);
            var highlight = product.Highlight;
            productHighlight.html(RenderHighlight(highlight));
            productHighlightMobile.html(RenderHighlight(highlight));
          }
          else DisplayHighlight();
          
          if(product.Specifications)
          {
            DisplayTechSpecs(true);
            productTechSpec.html(RenderTechSpec(product.Specifications));
            productTechSpecMobile.html(RenderTechSpec(product.Specifications));
          }
          else DisplayTechSpecs();
          
          if(product.Features)
          {
            DisplayFeatures(true);
            productFeatures.html(RenderFeatures(product.Features));
            productFeaturesMobile.html(RenderFeatures(product.Features));
          }
          else DisplayFeatures();
        });
      }
    })
    .fail(function (ex) {
      supportTabTitle.addClass("tabs__nav-item--active");
      productSupport.addClass("tabs__content-item--active");
    });
  }
  
  /** ----------APPEND DATA TO TABS ---------- **/
  function RenderProductTabTitle(title, index)
  {
    var isActive = index == 0 ? "tabs__nav-item--active" : "";
  	return '<li class="tabs__nav-item '+ isActive +'" data-tab-index="'+ index +'" role="tab">'+ title +'</li>';
  }
  /** ----------END APPEND DATA TO TABS ---------- **/
  
  /** ----------TECH SPEC RENDER SECTION---------- **/
  function RenderTechSpec(content)
  {
    var html = "";
  	for(var i = 0; i < content.length; i++)
    {
      html += RenderTechSpecOption(content[i]);
    }
    return html;
  }
  
  function RenderTechSpecOption(option)
  {
    var optionLength = option.specs.length;
    var firstColumnItemsNumber = Math.ceil(option.specs.length / 2);
    
    var firstColumnHtml = RenderTechSpecOptionColumn(0, firstColumnItemsNumber, option.specs);
    var secondColumnHtml = RenderTechSpecOptionColumn(firstColumnItemsNumber, option.specs.length, option.specs);
    
  	return '<div class="grid__block"><div class="block-3column"><p><b>' + option.displayName + '</b></p></div>'+ firstColumnHtml + secondColumnHtml +'</div>';
  }
  
  function RenderTechSpecOptionColumn(fromIndex, toIndex, optionSpecs)
  {
    var optionSpec = "";
  	for(var i = fromIndex; i < toIndex; i++)
    {
      var currentOptionValues = optionSpecs[i].value;
      optionSpec += '<div><b>'+ optionSpecs[i].displayName +'</b><p>'+ currentOptionValues.join(', ') +'</p></div>';
    }
    return '<div class="block-3column">'+ optionSpec +'</div>';
  }
  
  function DisplayTechSpecs(isDisplay = false)
  {
    if(isDisplay)
    {
      techSpecTabTitle.show();
    }
    else
    {
      techSpecTabTitle.hide();
    }
    
  }
  /** ----------END TECH SPEC RENDER SECTION---------- **/
  
  /** ----------FEATURES RENDER SECTION---------- **/
  function RenderFeatures(content)
  {
    var html = "";
  	for(var i = 0; i < content.length; i++)
    {
      html += RenderFeaturesOption(content[i]);
    }
    return `<div class="grid__block">` + html + `</div>`;
  }
  
  function RenderFeaturesOption(option)
  { 
    var optionsHtml = '';
    var optionImage = option.shot ? '<div class="grid__img"><img src="'+ option.shot.imageFamily.images.desktop.externalUrl +'" /></div>' : '';
  	return '<div class="block-3column">'+ optionImage  +'<p><b>' + option.headline + '</b></p><p>'+ option.bodyCopy +'</p </div>';
  }
  
  function DisplayFeatures(isDisplay = false)
  {
    if(isDisplay)
    {
      featureTabTitle.show();
    }
    else
    {
      featureTabTitle.hide();
    }
  }
  /** ----------END FEATURES RENDER SECTION---------- **/
  
  /** ----------HIGHLIGHT RENDER SECTION---------- **/
  function RenderHighlight(highlight)
  {
    var html = "";
    if(highlight.FeatureIcons)
      html += RenderFeatureIcons(highlight.FeatureIcons)
    if(highlight.KeyTechSpecs)
      html += RenderKeyTechSpecs(highlight.KeyTechSpecs);
    if(highlight.DimensionShots)
      html += RenderDimensionShots(highlight.DimensionShots);
  	return `<div class="grid__block">` + html + `</div>`;
  }
  
  function RenderFeatureIcons(content)
  {
    var html = '';
    for(var i = 0; i < content.length; i++)
    {
      html += '<p>'+ content[i].copy +'</p>'
    }
  	return '<div class="block-3column">'+ html +'</div>';	
  }
  
  function RenderKeyTechSpecs(content)
  {
  var html = '';
    for(var i = 0; i < content.length; i++)
    {
      html += '<b>'+ content[i].displayName +'</b><p>'+ content[i].value.join('; ')+'</p>';
    }
  	return '<div class="block-3column">'+ html +'</div>';	
  }
  
  function RenderDimensionShots(content)
  {
  var html = '';
    for(var i = 0; i < content.length; i++)
    {
      html += '<div class="grid__img"><img src="'+ content[i].imageUrl +'" /></div>';
    }
    return '<div class="block-3column">'+ html +'</div>';	
  }
  
  function DisplayHighlight(isDisplay = false)
  {
    if(isDisplay)
    {
      highlightTabTitle.show();
      productHighlight.parent().show();
    }
    else
    {
      highlightTabTitle.hide();
      productHighlight.parent().hide();
    }
  }
  /** ----------END HIGHLIGHT RENDER SECTION---------- **/
  
   //GetTechSpecAndFeature(productId);
}(jQuery));