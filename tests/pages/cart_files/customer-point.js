(function ($) {
  var applyPointBtn = $("#apply-point-btn");
  var applyPointText =  $("#apply-point-text");
  var applyPointTextMobile = $("#apply-point-text-mb");
  var redeemPoint = $("#redeem-point");
  var usablePoint = $("#mw-usable-point");
  var expiryDate = $("#mw-expiry-date");
  var customerId =  $("#loged-in-customer");
  var cartCustomerId =  $("#cart-customer");
  var errorMsg =  $("#point-error-message");
  var successMsg =  $("#point-success-message");
  var cartTotal = $("#cart__totalprice");
  var cartTotalMobile = $("#cart__totalprice-mb");
  var subTotal = cartTotal.attr("data-total");
  var shopCurrency = cartTotal.attr("data-currency");
  var pointNote =  $("#mw-point-note");

  var usablePointValue = 0;
  var inputedPoint = 0;

  function GetPointFromMiddleware(customerId) {
    http.get('customers/getmemberpointbycustomerid?customerId=' + customerId)
    .done(function(res){
      console.log(res);
      if(res.Status)
      {
      	usablePointValue = res.Data.UsablePoint;

       	if(redeemPoint.attr("data-point") > 0)
          usablePoint.html(usablePointValue - redeemPoint.attr("data-point"));
      	else usablePoint.html(usablePointValue < 0 ? 0 : usablePointValue);

        if(usablePointValue > 0)
          expiryDate.html(window.languages.expiry_date + ": " +  res.Data.ExpiryDate);

        var pointRate = res.Data.PointRate > 0 ? res.Data.PointRate : 1;
        pointNote.append(pointRate);
      }
    });
  }

  function ValidateCustomerRedeemPoint(customerId, redeemPoint) {
    errorMsg.hide();
    successMsg.hide();

    http.get(['customers/validatecustomerredeempoint?customerId=', customerId, '&redeemPoint=', redeemPoint].join(''))
    .done(function(res){
      // TODO: Validate frontend and Show error after validate on backend applyPointBtn

      if(!res.Status)
      {
        // Error message from backend
        errorMsg.show();
        if(res.Message == "Please redeem your point.") {
        	res.Message = window.languages.point_error_message;
        }
        errorMsg.html(res.Message);
      }
      else
      {
        successMsg.show();
        if(redeemPoint > 1)
          successMsg.html(window.languages.redeem  + " " + redeemPoint + " "  + window.languages.success);
        if(Number(redeemPoint) == 1)
          successMsg.html(window.languages.one_point);
        if(Number(redeemPoint) == 0)
          successMsg.html(window.languages.zero_point);
		usablePoint.html(usablePointValue - Number(redeemPoint));

//         applyPointText.html(ShowPrice(res.Data * 100));

//         var newTotal = subTotal - Number(res.Data)*100;
//         cartTotal.html(ShowPrice(newTotal));

        RenderTotal(res.Data);

        $.ajax({
          method: 'POST',
          url: '/cart/update.js',
          data: {
            "attributes[redemption_point]": redeemPoint,
            "attributes[point_with_rate]": res.Data,
            "attributes[customer_id]": customerId,
            "attributes[language]":  $("#current-language").text(),
          },
          dataType: 'json'
        });
      }
    })
    .fail(function() {
      usablePoint.html(0);
    });
  }

  function ValidateFrontend(redeemPoint)
  {
    if(redeemPoint < 0
       || isNaN(redeemPoint)
       || (redeemPoint * 100) > subTotal
       || usablePointValue < redeemPoint
       || redeemPoint.indexOf(".") > -1 )
    {
      errorMsg.fadeIn();
      errorMsg.html(window.languages.invalid_point);
      return false;
    }
  	return true;
  }

  function ShowPrice(money)
  {
  	return Shopify.formatMoney(money, window.myprice).replace(".00", "");
  }

  function CheckCartCustomer(customerId, cartCustomerId)
  {
    console.log('CheckCartCustomer');
    var currentUrl = window.location.href;
    if(currentUrl.indexOf('/cart') > -1)
    {
      if(customerId != cartCustomerId || !customerId)
      {

        $.ajax({
          method: 'POST',
          url: '/cart/update.js',
          data: {
            "attributes[redemption_point]": 0,
            "attributes[point_with_rate]": 0,
            "attributes[customer_id]": customerId,
            "attributes[language]": $("#current-language").text()
          },
          dataType: 'json'
        }).done(function() {
          RenderTotal(0);
        });
      }
    }
  }

  function RenderTotal(pointWithRate)
  {
  	applyPointText.html(ShowPrice(Number(pointWithRate) * 100));
    applyPointTextMobile.html(ShowPrice(Number(pointWithRate) * 100));

    var newTotal = Number(subTotal) - Number(pointWithRate)*100;
    cartTotal.html(ShowPrice(newTotal));
    cartTotalMobile.html(ShowPrice(newTotal));
  }

  CheckCartCustomer(customerId.val(), cartCustomerId.val());
  GetPointFromMiddleware(customerId.val());

  applyPointBtn.click(function() {
    errorMsg.hide();
    successMsg.hide();
    if($("#redeem-point").val().length > 6) {
      errorMsg.fadeIn();
      errorMsg.html(window.languages.invalid_max_length_point);
    }
    else{
      // TODO: Validate fronend here
      if(ValidateFrontend(redeemPoint.val()))
        ValidateCustomerRedeemPoint(customerId.val(), redeemPoint.val());
    }
  });

}(jQuery));
