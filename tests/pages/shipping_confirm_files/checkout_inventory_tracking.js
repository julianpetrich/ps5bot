(function ($) {

  const inventory_tracking_checkbox = window.theme.inventory_tracking_checkbox;
  const inventory_tracking_models = window.theme.inventory_tracking_models;
  const inventory_tracking_timeout = window.theme.inventory_tracking_timeout;
  let inventory_tracking_msg_failed = window.theme.inventory_tracking_msg_failed;
  let inventory_tracking_msg_waiting = window.theme.inventory_tracking_msg_waiting;
  let inventory_tracking_msg_success = window.theme.inventory_tracking_msg_success;

  if ($('html').attr('lang') == 'th') {
    inventory_tracking_msg_failed = window.theme.inventory_tracking_msg_failed_th;
    inventory_tracking_msg_waiting = window.theme.inventory_tracking_msg_waiting_th;
    inventory_tracking_msg_success = window.theme.inventory_tracking_msg_success_th;
  }

  inventory_tracking_msg_success = inventory_tracking_msg_success.replace(`{param_minutes}`, (inventory_tracking_timeout / 60));

  const ele_continue_button = $("#continue_button");
  const ele_loading_cover = $('#cover-spin');

  const btn_continue_button = $("#continue_button");

  $(document).ready(function () {

    if ($(".main .step").attr("data-step") == "payment_method") {
      handleInventoryTracking();
    }

    // checkout Inventory Tracking
    function checkoutInventoryTracking() {
      ele_loading_cover.addClass('active');
      callAjaxCart.then(result => {
        if (result.length) {
          let dataPost = {
            "TimeoutSecond": inventory_tracking_timeout,
            "CartItems": result,
            "TrackingConfiguration": inventory_tracking_models,
            "CustomerId": window.theme.customerId
          };
          http.post(`Orders/ValidateInventoryTracking`, dataPost)
            .done(function (res) {
              console.log('inventory_tracking', res);
            })
            .fail(function () {
            })
        }
      })
    }

    // call ajax get product from cart
    const callAjaxCart = new Promise(function (resolve, reject) {
      $.ajax({
        type: 'GET',
        url: '/cart.js',
        cache: false,
        dataType: 'json',
        success: function (cart) {
          let arrProduct = [];
          if (cart.item_count > 0) {
            cart.items.map(function (item) {
              arrProduct.push({ ProductId: item.product_id, VariantId: item.variant_id, Quantity: item.quantity });
            })
          }
          resolve(arrProduct);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          reject([]);
        },
      })
    });

    // inventory tracking
    function handleInventoryTracking() {
      if (inventory_tracking_checkbox) {
        btn_continue_button.attr('type', 'button');
        checkoutSocketInventory();
        btn_continue_button.on('click', function () {
          checkoutInventoryTracking();
        })
      }
    }

    function checkoutSocketInventory() {
      $.getScript("https://link.sony-asia.com/signalr/hubs", function () {
        $.connection.hub.url = 'https://link.sony-asia.com/signalr';
        $.connection.hub.qs = `customer_id=${window.theme.customerId}`;

        // Declare a proxy to reference the hub.
        var simpleHubProxy = $.connection.inventory_tracking;

        //Reigster to the "AddMessage" callback method of the hub
        //This method is invoked by the hub
        simpleHubProxy.client.sendAsync = function (response) {
          console.log('[Log] Message received: ', response);
          const response_code = response.code.toLowerCase();
          switch (response_code) {
            case 'waiting':
              ele_loading_cover.text(inventory_tracking_msg_waiting);
              break;
            case 'failed':
              ele_loading_cover.removeClass('active');
              alert(inventory_tracking_msg_failed);
              break;
            case 'succeed':
              alert(inventory_tracking_msg_success);

              $('.step__sections .edit_checkout').append(`<input name="checkout[note_attributes][Transaction ID]" value="${response.data}" type="hidden">`);
              ele_continue_button.attr('type', 'submit');
              $('.step__sections .edit_checkout').submit();
              break;
          }
        };

        //Connect to hub
        $.connection.hub.start().done(function () {
          console.log("Connected.");
        });
      });
    }

    function handleBtnContinue(val) {
      // Disable #x
      // $("#x").prop("disabled", true);

      // Enable #x
      // $("#x").prop("disabled", false);
      btn_continue_button.prop("disabled", val)
    }

  })

}(jQuery));
