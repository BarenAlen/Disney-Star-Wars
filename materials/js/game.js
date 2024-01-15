var closeOrNot = false;

var fancyStarMapConfig = {
	  autoCenter: true,
	  autoSize: false,
	  autoResize: true,
	  margin: 5,
	  padding: 0,
	  width: 720,
	  height: '100%',
	  maxHeight: 675,
	  wrapCSS: 'star-map-game-wrap',
		tpl: {
	        closeBtn : '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>',
	    },
	    beforeClose: function() {

        return (function() {
            if (!closeOrNot) {
                closeOrNot = true;
                $(".fancybox-skin").removeClass("opening");
                setTimeout(function() {
                    $.fancybox.close();
                }, 600);

                return false;
            }
        })();
      },
      afterShow: function() {
          setTimeout(function() {
              $(".fancybox-skin").addClass("opening");
          }, 100);

          closeOrNot = false;
      }
	};

var fancyGemsConfig = {
	  autoCenter: true,
	  autoSize: false,
	  margin: 5,
	  padding: 0,
	  width: 720,
	  height: '100%',
	  maxHeight: 685,
	  wrapCSS: 'gems-game-wrap',
	  tpl: {
          closeBtn : '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>',
      },
      beforeClose: function() {

        return (function() {
            if (!closeOrNot) {
                closeOrNot = true;
                $(".fancybox-skin").removeClass("opening");
                setTimeout(function() {
                    $.fancybox.close();
                }, 600);

                return false;
            }
        })();
      },
      afterShow: function() {
          setTimeout(function() {
              $(".fancybox-skin").addClass("opening");
          }, 100);

          closeOrNot = false;
      }
	};

var fancyConfigImagePreview = {
    autoCenter: true,
    autoResize: true,
    autoSize: false,
    margin: 0,
    padding: 0,
    width: 600,
    maxWidth: 600,
    // minWidth: 718,
    height: '100%',
    minHeight: 800,
    maxHeight: 800,
    openEffect: 'none',
    closeEffect: 'none',
    wrapCSS: 'postcard-fancybox-wrap',
    tpl: {
        closeBtn : '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>',
    },
    beforeClose: function() {
        return (function() {
            if (!closeOrNot) {
                closeOrNot = true;
                $(".fancybox-skin").removeClass("opening").addClass("closing");
                setTimeout(function() {
                	// закроет автоматом
                    openFancyboxInternal('#last-mission', fancyConfigGame);
				}, 1000);

                return false;
            }
        })();
    },
    afterShow: function() {
        setTimeout(function() {
            $(".fancybox-skin").addClass("opening");
        }, 100);

        closeOrNot = false;
    },
    afterClose: function () {
        $(".fancybox-skin").removeClass("closing");
    }
};

$(function() {
	var $slider = $('#game-slider');

	$slider.slick({
	  infinite: false,
	  initialSlide: $slider.data('initial-slide') || 0,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  centerMode: true,
	  variableWidth: true,
	  vertical: false,
	  centerPadding: "0px",
	  speed: 180,
	  nextArrow: $("#game-slider-next"),
	  prevArrow: $("#game-slider-prev"),
	  responsive: [
	  	{
	  		breakpoint: 420,
	  		settings: {
	  			variableWidth: false
	  		}
	  	}
	  ]
	});

	$('#game-slider').on('beforeChange', function(e, slick, currentSlide, nextSlide){
	  	$("#game-slider-nav").addClass("blink");

	});

	$('#game-slider').on('afterChange', function(){
	  	$("#game-slider-nav").removeClass("blink");
	});

	var moveForce = 300; // max popup movement in pixels
	var rotateForce = 1; // max popup rotation in deg

	$(document).mousemove(function(e) {
	    var docX = $(document).width();
	    var docY = $(document).height();

	    var rotateY = (e.pageX / docX * .2*2) - .2;
	    var rotateX = -((e.pageY / docY * .4*2) - .4);

	    $('.distort-bg')
	        .css({ transform: `rotate(${rotateY}deg) skew(${rotateX}deg)` });
	});

    $(document).on('click', '.star-map-game', function (e) {
        e.preventDefault();
        openFancyboxInternal(this, fancyStarMapConfig);
    });
    $(document).on('click', '.gems-game', function (e) {
        e.preventDefault();
        openFancyboxInternal(this, fancyGemsConfig);
    });

    $(document).on('click', '.fancybox-postcard-preview', function (e) {
        e.preventDefault();
        openFancyboxInternal(this, fancyConfigImagePreview);
    });

	new Clipboard('.btn-clip');


	// РУКА //

	var $arm = $(".arm");

	$(".game-slider-toggler").click(function() {
	    if ($arm.hasClass('static-up')) {
	        return;
        }

	    if ($arm.data('animating')) {
	        return;
	    } else {
	        $arm.data('animating', true);
	    }

	    $arm.removeClass("arm-down").addClass("arm-up");

	    $(".game-slider").delay(1620).animate({opacity: 1}, {
            done: function () {
                $arm.data('animating', false);
            }
        });

	    $(this).addClass("hide");

	    $arm.addClass("active");
	});

	$('#game-slider').on('click', '.game-preview-close', function () {
	    if (!$arm.is(':visible')) {
	        return;
		}

		if ($arm.data('animating')) {
	        return;
	    } else {
	        $arm.data('animating', true);
	    }

	    $(".game-slider").animate({opacity: 0});

        $arm.removeClass("active");

        setTimeout(function() {

	        $arm.removeClass("arm-up static-up").addClass("arm-down");
	    }, 1000);

	    setTimeout(function() {
	        $(".game-slider-toggler").animate({'background-position-y': '0px'}, {
                done: function () {
                    $arm.data('animating', false);
                }
            });

        	$(".game-slider-toggler").removeClass("hide");

	    }, 1500);

	});
});