(function ($) {
  $(document).ready(function () {
    
    let validateAPI = false;
    const locale_theme = window.theme.locale;
    const textErr = {
      'err': locale_theme == 'th' ? 'บางอย่างผิดพลาด' : 'There was some error',
      'invalid_email': locale_theme == 'th' ? 'อีเมลไม่ถูกต้อง' : 'Invalid email',
      'not_found_email': locale_theme == 'th' ? 'ไม่พบบัญชีที่มีอีเมล' : 'The account with that email was not found.',
      'required': locale_theme == 'th' ? 'ฟิลด์นี้จำเป็น' : 'This field is required',
      'title': locale_theme == 'th' ? 'กู้คืนรหัสผ่าน' : 'Recover Password',
      'missed_captcha': locale_theme == 'th' ? 'โปรดตรวจสอบ reCAPTCHA' : 'Please check the reCAPTCHA.'
    }

    if ($('#recover-password-section').length) {
    	$('#recover-password-section').show();
      	$('#login-section').hide();

      $("title").text(textErr.title);
      $(window).keydown(function(event){
        if(event.keyCode == 13) {
          event.preventDefault();
          return false;
        }
      });
      recoverPassword();
    }

    function recoverPassword() {
      $('.submit-form-recover').on('click', function () {
        let eleThis = this;
        $('.alert--error').remove();
        
        let valEmail = ($('.form-recover').find('[name="email"]').val() + '').trim();
        if (!valEmail || !validateEmailRegex(valEmail)) {
          let err_html = `<div class="alert alert--error"><span class="alert__title">${textErr.err}:</span><ul class="alert__errors"><li class="alert__error">${textErr.invalid_email}</li></ul></div>`;
          $(err_html).insertBefore($("input[name='form_type']"));
          return false;
        }
        else {
        	$('.alert--error').remove();
        }
        
        var token = $('textarea[name="g-recaptcha-response"]').val();
        if (token == undefined || token == null || token == '') {
          let err_html = `<div class="alert alert--error"><span class="alert__title">${textErr.err}:</span><ul class="alert__errors"><li class="alert__error">${textErr.missed_captcha}</li></ul></div>`;
          $(err_html).insertBefore($("input[name='form_type']"));
          return false;
        }
        else {
        	$('.alert--error').remove();
        }
          
        let data = { "email": valEmail, "reCAPTCHA": token };
          if ($('.loader-forgot-password').length) {
            $('.loader-forgot-password').show();
          } else {
            $(".form-recover .button-wrapper").append('<span class="loader-forgot-password"></span>');
          }
          $(eleThis).hide();
        
        http.post('customers/validateemail', data)
          .done(function(res){
            if (res.Status) {
              // fbq('trackCustom', 'CompleteRegistration');
              $(".form-recover").submit();
            }
            else {
              let err_html = `<div class="alert alert--error"><span class="alert__title">${textErr.err}:</span><ul class="alert__errors"><li class="alert__error">${textErr.not_found_email}</li></ul></div>`;
              $(err_html).insertBefore($("input[name='form_type']"));
            }
          });
        
          /*$.ajax({
            url: "https://link.sony-asia.com/Customers/ValidateEmail",
            type: "post",
            data: data,
            success: function(res){
              $(eleThis).show();
                  $('.loader-forgot-password').hide();
                  if (res.status||res.Status) {
                    $(".form-recover").submit();
                  } else {
                    let err_html = `<div class="alert alert--error"><span class="alert__title">${textErr.err}:</span><ul class="alert__errors"><li class="alert__error">${textErr.not_found_email}</li></ul></div>`;
                    $(err_html).insertBefore($("input[name='form_type']"));
                  }
            }
          })*/

          // http.post('customers/validate_email', data)
          //   .done(function (res) {
          //     $(eleThis).show();
          //     $('.loader-forgot-password').hide();
          //     validateAPI = res.status;
          //     if (res.status) {
          //       $(".form-recover").submit();
          //     } else {
          //       let err_html = `<div class="alert alert--error"><span class="alert__title">${textErr.err}:</span><ul class="alert__errors"><li class="alert__error">${textErr.not_found_email}</li></ul></div>`;
          //       $(err_html).insertBefore($(".form-recover .form__control"));
          //     }
          //   })
          //   .fail(function() {
          //     console.log('fail');
          //   });
      })
    }

    function forgotPassword() {
      if ($('#recover-password-section').length) {
        validateEmail($('#recover-password-section'));
      }
    }

    function validateEmail(ele) {
      $('#btnRecover').on('click', function () {
        let valEmail = $(ele).find('[name="email"]').val().trim();
        if (!valEmail) {
          $('.error').remove();
          $(ele).find('[name="email"]').parent().append(`<span class="error error-forgot-pass">${textErr.required}</span>`);
        } else {
          let data = { "email": valEmail }
          // http.post('customers/validate_email', data)
          //   .done(function (res) {
          //     console.log(res);
          //     if (!res.status) {
          //       $('.error').remove();
          //       $(ele).find('[name="email"]').parent().append(`<span class="error error-forgot-pass">${textErr.not_found_email}</span>`);
          //     }
          //   });

          $.ajax({
            url: "https://link.sony-asia.com/Customers/ValidateEmail",
            type: "post",
            data: data,
            success: function(res){
              console.log(res);
            }
        });
        }

      })
    }

    function validateEmailRegex(email) {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  })
}(jQuery));
