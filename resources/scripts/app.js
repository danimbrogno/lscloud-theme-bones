//
// Theme scripts
//

(function ($) {

  $(document).ready(function() {
    // 
    // Handle thumbnail clicks on the Product page
    //
    $('#product-page').on('click', 'div.item-images ul a', function(){
      $('div.big-image img', $(this).closest('.item-images')).attr('src', this.href);

      return false;
    })

    //
    // Handle the Enter key in the Coupon field
    //
    $('#cart-content').on('keydown', 'input#coupon', function(ev) {
      if (ev.keyCode == 13) {
        $(this).sendRequest('shop:cart', {
          update: {'#cart-content': 'shop-cart-content', '#mini-cart': 'shop-minicart'},
          extraFields: {'set_coupon_code': 1}
        });
      }
    }) 

    //
    // Handle the Enter key in the Quantity field
    //
    $('#cart-content').on('keydown', 'input.quantity', function(ev) {
      if (ev.keyCode == 13) {
        $(this).sendRequest('shop:cart', {
          update: {'#cart-content': 'shop-cart-content', '#mini-cart': 'shop-minicart'}
        });
      }
    });

    //
    // Apply Foundation form customization to payment forms
    //
    function foundationCustomizePaymentForms() {
      $('#payment_form form').addClass('custom');
      $(document).foundationCustomForms();
      $('#payment_form form div.custom.dropdown').css('width', '100%');
      $('#payment_form form input[type=button], #payment_form form input[type=submit]').addClass('button');
    }

    if ($('#payment_form').length) {
      foundationCustomizePaymentForms();
    }

    $(document).on('change', '#payment_method', function() {
      $(this).sendRequest('shop:onUpdatePaymentMethod', {
          update: {'#payment_form' : 'partial-paymentform'},
          onAfterUpdate: foundationCustomizePaymentForms
      });
    })

    //
    // Handle the shipping option radio button clicks
    //
    $('#checkout-page').on('change', '#shipping-methods input', function(){
      // When the shipping method is shipping we want to update the 
      // order totals area on the Checkout page. The native Checkout 
      // action does all the calculations.
      //
      $(this).sendRequest('shop:onCheckoutShippingMethod', {
        update: {'#checkout-totals': 'shop-checkout-totals', '#mini-cart':'shop-minicart'},
                  update: {'#payment_form' : 'partial-paymentform'}
      })

    });

    $(document).on('click', '#copy_billing_to_shipping', function (){
      //data-ajax-handler="shop:onCopyBillingToShipping" data-ajax-update="#checkout-page=shop-checkoutaddress"
      $(this).sendRequest('shop:onCheckoutBillingInfo', {
          onAfterUpdate: function() {
            $(this).sendRequest('shop:onCopyBillingToShipping', {
              update: {'#checkout-page' : 'shop-checkout-address', '#mini-cart':'shop-minicart'}
            });
          }
      });
    })
    
  });
})(jQuery);