(function ($) {
  var shopifyGiftCardRow = $(".total-line.total-line--reduction[data-giftcard-success]");
  var orderSummaryTable = $('tbody.total-line-table__tbody');
  var totalLine = $(".order-summary__section.order-summary__section--total-lines");
  var totalPrice = $(".payment-due__price");
  var cartAttributes = $("#cart-attributes");
  var currentUrl = window.location.href;

  function ApplyGiftCard() {
    $(".section--payment-method").show();
    // Complete order page
    if(currentUrl.indexOf("/thank_you") > -1 || currentUrl.indexOf("/orders/") > -1)
    {
      HandleCompleteOrderPage();
    }
    // Checkout page
    else
    {
      // Remove giftcard tag
      $( ".visually-hidden:contains('Clear gift card')" ).closest('.tag').remove();
      $( ".visually-hidden:contains('ลบบัตรของขวัญ')" ).closest('.tag').remove();

      HandleCheckoutPage();
    }
  }

  function ApplyOrUpdateGiftCard(checkoutToken, customerId, redemptionPoint, pointWithRate, newTotal,language,preorder,slop_agree, installment)
  {
    $(".section--payment-method").hide();
    $(".loading-page").addClass("show");

    http.get('customers/applygiftcardtocheckout?checkoutToken=' + checkoutToken + '&customerId=' + customerId + '&redeemPoint=' + redemptionPoint).done(function(data) {

      if(data.Status)
      {
//       	$('.total-line.total-line--reduction[data-giftcard-success] .total-line__name form span').first().html("Hello World");
        if(pointWithRate > 0){
          orderSummaryTable.append(RenderRedeemedPointRow(pointWithRate + "00"));
        }

        $.getJSON('/cart.js', function(cart) {
          $.ajax({
              method: 'POST',
              url: '/cart/update.js',
              data: {
                "attributes[redemption_point]": cart.attributes.redemption_point,
                "attributes[point_with_rate]": cart.attributes.point_with_rate,
                "attributes[customer_id]": cart.attributes.customer_id,
                "attributes[language]": language,
                "attributes[type]": preorder,
                "attributes[SLOP_Agree]": slop_agree,
                "attributes[installment]": installment
              },
              dataType: 'json'
            });
        });

        location.reload();
        $(".loading-page").removeClass("show");
      }

      ShowPointAndTotal(pointWithRate, newTotal, false);

//       if(data.Data.isApplyNewGiftCard)
//       {
//         //totalPrice.html(ShowPrice(newTotal));
//         ShowPointAndTotal(pointWithRate, newTotal);
//       }
//       else
//       {
//       	ShowPointAndTotal(pointWithRate, newTotal);
//       }
//       $(".total-line.total-line--reduction[data-giftcard-success]").empty();
//       $(".total-line.total-line--reduction-point").empty();
//       var discountNumber = $(".order-summary__emphasis[data-checkout-discount-amount-target]").attr("data-checkout-discount-amount-target");
//       //$(".total-line.total-line--reduction[data-giftcard-success] .order-summary__emphasis").html("- "+ ShowPrice(pointWithRate + "00")).show();
//       if(pointWithRate > 0)
//       $('tbody.total-line-table__tbody').append(RenderRedeemedPointRow(pointWithRate + "00"));
//       $(".payment-due__price").html(ShowPrice(newTotal - (discountNumber ? discountNumber : 0)));


      totalLine.fadeIn();
    });
  }

  function RenderRedeemedPointRow(redeemedPoint)
  {
    return '<tr class="total-line total-line--reduction-point"><th class="total-line__name" scope="row"><span>' + window.languages.gift_card_label +
      '</span></th><td class="total-line__price"><span class="order-summary__emphasis" data-sony >- ' + ShowPrice(redeemedPoint) + '</span></td></tr>';
  }

  function ShowPointAndTotal(pointWithRate, subTotal, isNewCard)
  {
    var pointWithRate = pointWithRate > 0 ? Number(pointWithRate + "00") : 0;
    // Remove gift card tag
    $( ".visually-hidden:contains('Clear gift card')" ).closest('.tag').remove();
    $( ".visually-hidden:contains('ลบบัตรของขวัญ')" ).closest('.tag').remove();

    // Remove gift card Shopify default label
  	$(".total-line.total-line--reduction[data-giftcard-success]").empty();
    $(".total-line.total-line--reduction-point").empty();

    // Show total price
    var discountNumber = $(".order-summary__emphasis[data-checkout-discount-amount-target]").attr("data-checkout-discount-amount-target");

    var shippingFee = $(".order-summary__emphasis[data-checkout-total-shipping-target]").attr("data-checkout-total-shipping-target");
    if(pointWithRate > 0){
    	$('tbody.total-line-table__tbody').append(RenderRedeemedPointRow(pointWithRate));
    }

    var totalPrice = Number(subTotal) - Number(discountNumber ? discountNumber : 0) - Number(pointWithRate) + Number(shippingFee ? shippingFee : 0);

    $(".payment-due__price").html(ShowPrice(totalPrice));


     $('span.order-summary__emphasis').each(function () {
      var array = ["data-checkout-total-shipping-target", "data-checkout-subtotal-price-target"];
      for(var i = 0; i < array.length; i++)
      {
        if($("#previous_step").val() == "shipping_method"){

          $(this).removeAttr(array[i]);

        var t = $(this).text();
        t = t.replace(".00", '');
        $(this).text(t);
        }
      }
    });

    if($("#previous_step").val() == "shipping_method"){

      setTimeout(function(){
        var s = $(".payment-due__price").text();
        s = s.replace(".00", '');
        $('.payment-due__price').removeAttr('data-checkout-payment-due-target').text(s);
      }, 300);
    }


  }

  function ShowPrice(money)
  {
  	return Shopify.formatMoney(money, window.myprice);//.replace(".00", "");
  }

  function HandleCheckoutPage()
  {
  	var pathArr = $(location).attr('pathname').split("/");
    var checkoutToken = pathArr.pop();

    $(".order-summary__section.order-summary__section--total-lines").hide();
    $(".total-line.total-line--reduction[data-giftcard-success]").empty();
    var txt = 1;

    var cartAttribute = $("#checkout-attributes");
    var redemptionPoint = cartAttribute.attr("data-redeem-point");
    var pointWithRate = cartAttribute.attr("data-point-with-rate");
    var customerId = cartAttribute.attr("data-customer");
    var appliedPoint = cartAttribute.attr("data-gc");
    var language = cartAttribute.attr("data-language");
    var preorder = cartAttribute.attr("data-preorder");
    var slop_agree = cartAttribute.attr("data-slop-agree");
    var installment = cartAttribute.attr("data-installment");


    var newTotal = $("span[data-checkout-subtotal-price-target]").attr("data-checkout-subtotal-price-target");
//     UpdateCartAttributes(cart);

    if(Number(pointWithRate + "00") != Number(appliedPoint))  {
    	ApplyOrUpdateGiftCard(checkoutToken, customerId, redemptionPoint, pointWithRate, newTotal,language,preorder,slop_agree, installment);
    }
    else
    {
      $(".loading-page").removeClass("show");
      ShowPointAndTotal(pointWithRate, newTotal, false);
      totalLine.fadeIn();
    }

    $(document).on('page:load page:change', function() {

      var updateTotal = $("span[data-checkout-subtotal-price-target]").attr("data-checkout-subtotal-price-target");
      ShowPointAndTotal(pointWithRate, updateTotal, false);
    });
  }

  function HandleCompleteOrderPage()
  {
    $(".total-line.total-line--reduction[data-giftcard-success] .order-summary__emphasis").css("display", "block");
  	$(".total-line.total-line--reduction[data-giftcard-success] .total-line__name span").html(window.languages.gift_card_label);

    $(".payment-method-list__item .payment-icon.payment-icon--gift-card.payment-method-list__item-icon").parent().remove();
  }

  function UpdateCartAttributes(cart)
  {
    var cartAttribute = cart.attributes;
  	var itemsArray = "";
    var allItems = cart.items;
    var currentCartVariantIds = [];
    var formAttributes = $("#cart-attributes").serializeArray();

    $.each(allItems, function(index, value) {
      currentCartVariantIds.push('pid_' + value.variant_id);
    });

    // Get removable product to remove from cart attribute
    var allDeletedAttribute = Object.keys(cartAttribute).filter(function(k) {
        return k.indexOf('pid_') == 0;
    }).reduce(function(newData, key) {
      var existAttr = currentCartVariantIds.indexOf(key);
//       console.log(newData);
      if(existAttr == -1)
      {
        newData["name"] = "attributes[" + key +"]";
        newData["value"] = "";
      }
      return newData;
    }, {});

    if(Object.keys(allDeletedAttribute).length !== 0 && allDeletedAttribute.constructor === Object){
      formAttributes.push(allDeletedAttribute);
    }

//     console.log(formAttributes);

    var updateAttributes = {};
    $.map(formAttributes , function (n, i) {
        updateAttributes[n.name] = n.value;
    });


    $.ajax({
      method: 'POST',
      url: '/cart/update.js',
      data: updateAttributes,
      dataType: 'json'
    });
  }

  ApplyGiftCard();


//       $(document).on('page:load page:change', function() {
//         $.getJSON('/cart.js', function(cart) {
//           var redemptionPoint = cart.attributes.redemption_point;
//           $(".total-line.total-line--reduction[data-giftcard-success] .order-summary__emphasis").text("- " + ShowPrice(redemptionPoint + "00")).show();
//           $(".payment-due__price").html(ShowPrice(newTotal));
//         });
//       });

}(jQuery));