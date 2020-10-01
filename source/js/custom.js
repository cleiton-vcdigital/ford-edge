jQuery(document).ready(function ($) {

  $('body').addClass('overflow-hidden')

  // Preload
  $('.btn-preload').click(function () {
    launchFullScreen(document.documentElement)
    $(this).parent().animate({
      opacity: 0
    }, 400, function () {
      $('body').removeClass('overflow-hidden')
      $(this).hide();
    });
  });


  // Menu
  $('#menu .nav-link').click(function (e) {
    e.preventDefault();
    var visible = $('.panel.active');
    var target = "#" + $(this).data('target');

    $('.navbar-collapse').collapse('hide')
    setTimeout(function() {
      visible.removeClass('active')
      $(target).removeClass('hidden')
      $(target).addClass('active')
      $('body').addClass('overflow-hidden')
    }, 500)

  });

  $('.btn-close').click(function (e) {
    e.preventDefault();
    var visible = $('.panel.active')
    visible.removeClass('active')
    visible.addClass('hidden')
    $('body').removeClass('overflow-hidden')
  });


  // Range
  $('output[for=entrada]').val("R$ " + number($('#entrada').val()) + ",00")
  $('output[for=parcelas]').val($('#parcelas').val())
  $('output[for=valor]').val("R$ " + calculo('232800', $('#entrada').val(), $('#parcelas').val()) + ",00")

  $('#entrada').on("input", function () {
    $('output[for=entrada]').val("R$ " + number(this.value) + ",00");
    $('output[for=valor]').val("R$ " + calculo('232800', this.value, $('#parcelas').val()) + ",00");
  }).trigger("change");

  $('#parcelas').on("input", function () {
    $('output[for=parcelas]').val(number(this.value));
    $('output[for=valor]').val("R$ " + calculo('232800', $('#entrada').val(), this.value) + ",00");
  }).trigger("change");


  // Colors
  $('input[name=color]').change(function (e) {
    e.preventDefault()

    var cor = $(this).attr('id')
    var thumbnail = 'images/veiculos/ford-edge-' + cor + '.png'

    $('#figure img').attr('src', thumbnail)
  })

  $('#cliente_veiculo').change(function(){
      if (!this.checked) {
          $('#sendForm fieldset').addClass('disabled').attr('disabled', true)
      } else {
          $('#sendForm fieldset.disabled').removeClass('disabled').attr('disabled', false)
      }
  })


  // Modal

  
  $('#videoModal').on('show.bs.modal', function (event) {
    // var button = $(event.relatedTarget) // Button that triggered the modal
    // var recipient = button.data('video') // Extract info from data-* attributes
    var modal = $(this)
    modal.find('.modal-body').empty().append('<iframe width="560" height="315" src="https://www.youtube.com/embed/RpDtpTPDkBQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')
  })

  $('#videoModal').on('hide.bs.modal', function (event) {
    var modal = $(this)
    modal.find('.modal-body').empty()
  })
  

  $('#confirmaModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);

    var veiculo = 'Edge Titanium AWD 3.5 V6'
    var preco = number('232800')
    var foto = $('#figure img').attr('src')
    var cor = $('input[name=color]:checked').val()
    var acabamento = $('input[name=acabamento]:checked').val()
    var entrada = $('output[for=entrada]').val()
    var parcelas = $('output[for=parcelas]').val()
    var valor = $('output[for=valor]').val()

    var modal = $(this)

    modal.find('h2').empty().text(veiculo)
    modal.find('#foto').attr('src', foto)
    modal.find('#cor').empty().text(cor)
    modal.find('#acabamento').empty().text(acabamento)
    modal.find('#preco').empty().text('R$ '+ preco + ',00')
    modal.find('#entrada').empty().text(entrada)
    modal.find('#parcelas').empty().text(parcelas)
    modal.find('#valor').empty().text(valor)
  })

  $('.btn-enviar').click(function(){
    $(this).parent().append('<span class="feedback" style="position: absolute; color: black; background: white; left:1rem; right: 1rem; padding: .5rem 1rem; text-align: center;"><div class="sk-three-bounce"><div class="sk-child sk-bounce1"></div><div class="sk-child sk-bounce2"></div><div class="sk-child sk-bounce3"></div></div></span>').find('.btn').animate({ opacity: 0}, 200)
    setTimeout(function() {
        $('span.feedback').empty().html('Enviado')
    }, 3000);
    setTimeout(function() {
        $('span.feedback').animate({
            opacity: 0
        }, 800, function(){
            $(this).remove()
            setTimeout(function() {
               $('#confirmaModal').modal('hide')
               $('#confirmaModal').find('.btn').animate({ opacity: 1}, 200)
            }, 300);
        })
    }, 6000);
})

});

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

function launchFullScreen(element) {
  if (element.requestFullScreen) {
    element.requestFullScreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
}

function number(n) {
  var n = '' + n, t = n.length - 1, number = '';

  for (var i = t, a = 1; i >= 0; i--, a++) {
    var ponto = a % 3 == 0 && i > 0 ? '.' : '';
    number = ponto + n.charAt(i) + number;
  }
  return number;
}

function calculo(a, b, c) {
  var subtracao = (a - b)
  var divisao = subtracao / c
  var numero = Math.ceil(divisao)
  var valor = number(numero)
  return valor
}

// Image Lightbox
$(function () {
  var
    // ACTIVITY INDICATOR
    activityIndicatorOn = function () {
      $('<div id="imagelightbox-loading"><div></div></div>').appendTo('body');
    },
    activityIndicatorOff = function () {
      $('#imagelightbox-loading').remove();
    },

    // OVERLAY
    overlayOn = function () {
      $('<div id="imagelightbox-overlay"></div>').appendTo('body');
    },
    overlayOff = function () {
      $('#imagelightbox-overlay').remove();
    },

    // CLOSE BUTTON
    closeButtonOn = function (instance) {
      $('<button type="button" id="imagelightbox-close" title="Close"></button>').appendTo('body').on('click touchend', function () {
        $(this).remove();
        instance.quitImageLightbox();
        return false;
      });
    },
    closeButtonOff = function () {
      $('#imagelightbox-close').remove();
    },


    // ARROWS
    arrowsOn = function (instance, selector) {
      var $arrows = $('<button type="button" class="imagelightbox-arrow imagelightbox-arrow-left"></button><button type="button" class="imagelightbox-arrow imagelightbox-arrow-right"></button>');

      $arrows.appendTo('body');

      $arrows.on('click touchend', function (e) {
        e.preventDefault();

        var $this = $(this),
          $target = $(selector + '[href="' + $('#imagelightbox').attr('src') + '"]'),
          index = $target.index(selector);

        if ($this.hasClass('imagelightbox-arrow-left')) {
          index = index - 1;
          if (!$(selector).eq(index).length)
            index = $(selector).length;
        } else {
          index = index + 1;
          if (!$(selector).eq(index).length)
            index = 0;
        }

        instance.switchImageLightbox(index);
        return false;
      });
    },
    arrowsOff = function () {
      $('.imagelightbox-arrow').remove();
    };

  // WITH OVERLAY & CLOSE BUTTON & ACTIVITY INDICATION
  var seletor = 'a[data-lightbox="fotos"]'
  var foto = $(seletor).imageLightbox({
    onStart: function () {
      overlayOn();
      closeButtonOn(foto);
      arrowsOn(foto, seletor);
    },
    onEnd: function () {
      overlayOff();
      closeButtonOff();
      arrowsOff();
      activityIndicatorOff();
    },
    onLoadStart: function () {
      activityIndicatorOn();
    },
    onLoadEnd: function () {
      $('.imagelightbox-arrow').css('display', 'block');
      activityIndicatorOff();
    }
  });


});
