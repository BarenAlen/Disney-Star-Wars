$(function() {

    $(".main-nav-toggler").click(function() {

        $("#main-nav-toggler").toggleClass("close");

        if ($(this).attr("data-type") === "static") {
            $("body").toggleClass("main-nav-opened");
        }
     });

    if($(".index-page-wrapper").width()<500){
        var fh = $(".page-screen > .container").height();
        $(".section.helper").css("margin-bottom",fh-(fh*1.0225)+"vh");
    }

    if($(".index-page-wrapper").width()>=500 && $(".index-page-wrapper").width()<767){
        var fh = $(".page-screen > .container").height();
        $(".section.helper").css("margin-bottom",fh-(fh*1.0255)+"vh");
    }

    if($(".index-page-wrapper").width()<1300 && $(".index-page-wrapper").width()>1200 && $(".index-page-wrapper").height()>600 && $(".index-page-wrapper").height()<800){
          var fh = $(".page-screen > .container").height();
          $(".section.helper").css("margin-bottom",fh-(fh*1.02987)+"vh");
          $("#login-page").addClass("notefix");
          $(".page-bg").addClass("notefix")
      }

    $('.j-signout-test').click(function() {
        $(".section.section-social").toggleClass('authorized');
    });


    $('.main-nav_menu a.a-close').click(function () {
        $("#main-nav-toggler").removeClass("close");
        $("body").removeClass("main-nav-opened");
    });
});

var closeOrNot = false;

var fancyConfigMain = {
    autoCenter: true,
    autoSize: false,
    autoResize: true,
    margin: 0,
    padding: 0,
    width: 700,
    minWidth: 0,
    height: '100%',
    maxHeight: 700,
    minHeight: 700,
    wrapCSS: 'center-content-wrap',
    tpl: {
        closeBtn : '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>',
    },
    beforeClose: function() {
        return (function() {
            if (!closeOrNot) {
                closeOrNot = true;
                $(".fancybox-skin").removeClass("opening").addClass("closing");
                setTimeout(function() {
                    $.fancybox.close();
                }, 1000);

                return false;
            }
        })();
    },
    afterClose: function () {
        resetForms(this.content);
        $(".fancybox-skin").removeClass("closing");
    },
    afterShow: function () {
        preventSkrollrScroll();

        setTimeout(function() {
            $(".fancybox-skin").addClass("opening");
        }, 100);

        closeOrNot = false;
    }
};
var fancyConfigFaq = {
    wrapCSS: 'faq-popup-wrap',
    helpers : {
        overlay : {
            css : {
                'background-image': 'url(/materials/img/fancybox/overlay.png)',
                'background-repeat': 'repeat',
                'background-position': '0 0'
            }
        }
    },
    tpl: {
        closeBtn : '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>',
    },
    afterClose: function () {
        resetForms(this.content);
    },
    afterShow: function () {
        preventSkrollrScroll();
    }
};

var fancyConfigGame = {
    autoCenter: false,
    autoResize: true,
    autoSize: false,
    margin: 0,
    padding: 0,
    width: 718,
    maxWidth: 718,
    height: '100%',
    minHeight: 800,
    maxHeight: 800,
    openEffect: 'none',
    closeEffect: 'none',
    wrapCSS: 'game-fancybox-wrap',
    tpl: {
        closeBtn : '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>',
    },
    beforeClose: function() {
        return (function() {
            if (!closeOrNot) {
                closeOrNot = true;
                $(".fancybox-skin").removeClass("opening").addClass("closing");
                setTimeout(function() {
                    $.fancybox.close();
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
        resetForms(this.content);
        $(".fancybox-skin").removeClass("closing");
    }
};

$(function() {
    $(document).on('click', '.fancybox_main', function (e) {
        e.preventDefault();
        openFancyboxInternal(this, fancyConfigMain);
    });
    $(document).on('click', '.fancybox_faq', function (e) {
        e.preventDefault();
        openFancyboxInternal(this, fancyConfigFaq);
    });
    $(document).on('click', '.fancybox', function (e) {
        e.preventDefault();
        openFancyboxInternal(this, fancyConfigGame);
    });

    $(document).on('click', '.fancy-close', function (e) {
        e.preventDefault();
        $.fancybox.close();
    });
});

function resetForms(popup) {
    $('form', popup).each(function () {
        this.reset();
    });
}

function preventSkrollrScroll() {
    if ($('html').hasClass('skrollr-mobile')) {
        $('.fancybox-wrap.fancybox-mobile, .fancybox-wrap.fancybox-mobile + .fancybox-overlay').on('touchstart touchmove touchcancel touchend', function (e) {
            e.stopPropagation();
        });
    }
}

function openFancyboxInternal(target, config) {
    if ($.fancybox.isOpen) {
        $(document).one('afterClose', function () {
            $.when(isFancyboxCompletelyClosed()).done(function () {
                $.fancybox.open(target, config || {});
            });
        });
        $.fancybox.close();
    } else {
        $.fancybox.open(target, config || {});
    }
}

function isFancyboxCompletelyClosed(attempts) {
    var $deffered = $.Deferred();
    var counter = 0;
    attempts = attempts || 20;

    var interval = setInterval(function () {
        var needResolve = false;
        counter++;
        if (counter >= attempts) {
            needResolve = true;
        }
        if (!needResolve && !$('.fancybox-overlay').length) {
            needResolve = true;
        }

        if (needResolve) {
            clearInterval(interval);
            $deffered.resolve();
        }
    }, 100);

    return $deffered;
}