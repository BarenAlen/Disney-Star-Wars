function grs(length) {
    length = length || 32;
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ:`|\'';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

function getPuzzleCompleteCallback(url, gameData) {
    return function () {
        var score = grs(12);
        var token = grs(32);
        var postData = $.extend(
            {
                action: 'complete',
                score: score,
                token: token,
                target: md5(score + token)
            },
            gameData
        );

        $.post({
            url: url,
            data: postData,
            dataType: 'json'
        }).done(function (data) {
            if (data.success) {
                if (data.updateScreenData) {
                    parent.updateGameScreen(data.updateScreenData);
                }
                setTimeout(function () {
                    parent.openGameFancybox('#star-map-complete');
                }, 2000);
            }
        });
    };
}

function makeDiamandComplate(data) {
    getGemsCompleteCallback('/tasks/task4', data).call();
}

function getGemsCompleteCallback(url, gameData) {
    return function () {
        var postData = $.extend(
            {
                action: 'complete'
            },
            gameData
        );

        $.post({
            url: url,
            data: postData,
            dataType: 'json'
        }).done(function (data) {
            if (data.success) {
                if (data.updateScreenData) {
                    parent.updateGameScreen(data.updateScreenData);
                }

                var $popup = $('#crystal-energy-complete', parent.document);
                if ($popup.length) {
                    $('.count', $popup).html(data.gemsCount);
                    $('.accent', $popup).html(data.scoreText);
                    parent.openGameFancybox($popup);
                }
            }
        });
    };
}

function updateGameScreen(data) {
    if (data.profile) {
        updateProfile(data.profile);
    }

    if (data.slides) {
        $.each(data.slides, function (index, slideData) {
            updateSlide(slideData);
        });
    }
}

function updateProfile(profile) {
    if (profile.score) {
        $('.profile .profile_points').html(profile.score);
    }
    if (profile.photo) {
        $('.profile #profile-img image').attr('xlink:href', profile.photo);
    }
}

function updateSlide(slideData) {
    var id = slideData.id;
    var selector = '.game-slider_item[data-slide-id="' + id + '"]';
    var $slides = $(selector);
    if ($slides.length) {
        $slides.html($(slideData.html).html());
        reInitSlideJs($slides);
    }
}

function reInitSlideJs($slide) {

}

function openGameFancybox(target, config) {
    openFancyboxInternal(target, config || fancyConfigGame);
}

function openMainFancybox(target, config) {
    openFancyboxInternal(target, config || fancyConfigMain);
}

function openFaqFancybox(target, config) {
    openFancyboxInternal(target, config || fancyConfigFaq);
}

$(function () {
    $(document).on('popup:close', function (e, data) {
        if (data) {
            if (data.action === 'update-game-screen') {
                updateGameScreen(data);
            }
        }
    });

    $('.btn-light-side, .btn-dark-side', '#two-sides').click(function (e) {
        e.preventDefault();
        var $links = $('.btn-light-side, .btn-dark-side', '#two-sides');
        if ($(this).data('pending')) {
            return;
        }
        $links.data('pending', true);

        var url = $(this).data('url') || $(this).attr('href');
        $.post({
            url: url,
            dataType: 'json'
        }).done(function (data) {
            if (data.success) {
                if (data.updateScreenData) {
                    updateGameScreen(data.updateScreenData);
                }
                var popupSelector = '#two-sides-' + data.side + '-complete';
                $.each(data.shareUrls, function (key, value) {
                    $('.social-link.' + key, popupSelector).data('url', value);
                });
                openGameFancybox(popupSelector);
            }
        }).always(function () {
            $links.data('pending', false);
        });
    });

    $('#form-abonus-card').on('beforeSubmit', function () {
        var $form = $(this);
        if ($form.data('pending')) {
            return false;
        }
        $form.data('pending', true);

        $.post({
            url: $form.attr('action'),
            data: $form.serialize(),
            dataType: 'json'
        }).done(function (data) {
            if (data.success) {
                openGameFancybox('#lost-coordinates-next');
            }
            if (data.updateScreenData) {
                updateGameScreen(data.updateScreenData);
            }
        }).always(function () {
            $form.data('pending', false);
        });

        return false;
    });

    $('#ticket-decline').click(function (e) {
        e.preventDefault();
        var $that = $(this);
        if ($that.data('pending')) {
            return;
        }
        $that.data('pending', true);

        var url = $that.data('url') || $that.attr('href');
        $.post({
            url: url,
            dataType: 'json'
        }).done(function (data) {
            if (data.success) {
                if (data.updateScreenData) {
                    updateGameScreen(data.updateScreenData);
                }
            }
        }).always(function () {
            $that.data('pending', false);
        });
    });

    $('#form-tickets-share-link').on('beforeSubmit', function () {
        var $form = $(this);
        if ($form.data('pending')) {
            return false;
        }
        $form.data('pending', true);

        $.post({
            url: $form.attr('action'),
            data: $form.serialize(),
            dataType: 'json'
        }).done(function (data) {
            if (data.success) {
                if (data.updateScreenData) {
                    updateGameScreen(data.updateScreenData);
                }

                var popupSelector = '#last-jedi-accept';
                $('#tickets-share-link', popupSelector).text(data.shortLink).attr('title', data.link);
                openGameFancybox(popupSelector);
            }
        }).always(function () {
            $form.data('pending', false);
        });

        return false;
    });

    $('#send-ticket-to-email').click(function (e) {
        e.preventDefault();
        var $that = $(this);
        if ($that.data('pending')) {
            return;
        }
        $that.data('pending', true);

        var url = $that.data('url') || $that.attr('href');
        $.post({
            url: url,
            dataType: 'json'
        }).done(function (data) {
            if (data.success) {
                var $next = $that.next('p').not('.accent');
                if ($next.length) {
                    var oldText = $next.html();
                    $that.next('p').addClass('accent').html('Письмо отправлено.');
                    setTimeout(function () {
                        $next.removeClass('accent').html(oldText);
                    }, 5000);
                }
            }
        }).always(function () {
            $that.data('pending', false);
        });
    });

    $(document).on('click', '#accept-ticket, #decline-ticket', function (e) {
        e.preventDefault();
        var $links = $('#accept-ticket, #decline-ticket');
        if ($(this).data('pending')) {
            return;
        }
        $links.data('pending', true);

        var url = $(this).data('url') || $(this).attr('href');
        $.post({
            url: url,
            dataType: 'json'
        }).done(function (data) {
            if (data.success) {
                if (data.updateScreenData) {
                    updateGameScreen(data.updateScreenData);
                }
            }
        }).always(function () {
            $links.data('pending', false);
        });
    });

    $('input', '#last-mission').change(function () {
        if (this.checked) {
            if (this.id === 'postcard-light') {
                $('#postcard-dark-share').hide();
                $('#postcard-light-share').show();
            } else {
                $('#postcard-light-share').hide();
                $('#postcard-dark-share').show();
            }
        }
    });

    $('.social-link', '#last-mission').click(function () {
        var $container = $('#last-mission');
        var $cardInput = $('input:checked', $container);
        var card = $cardInput.length && $cardInput.attr('id') === 'postcard-light' ? 2 : 1;
        var sn = $(this).data('type');

        if ($container.data('remember') && !$container.data('pending')) {
            $container.data('pending', true);

            $.post({
                url: $container.data('remember-url'),
                data: {
                    card: card,
                    sn: sn
                },
                dataType: 'json'
            }).always(function () {
                $container.data('pending', false);
            });
        }
    });
});