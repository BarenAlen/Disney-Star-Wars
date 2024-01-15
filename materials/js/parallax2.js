var skrollrInstance;

function superScroll(target, skrollr) {
    var $target = $(target);
    var s = skrollr || skrollrInstance;
    if ($target.length && s) {
        var inaccuracy = window.innerHeight / 20;
        var targetOffset = parseInt($target.data('scroll-offset') || 0);
        var counter = 0;
        var lastDiff;

        (function scroll() {
            var offset = s.relativeToAbsolute($target.get(0), 'top', 'top');
            var duration = lastDiff ? Math.max(lastDiff * 0.5, 300) : undefined;
            // console.log(counter, targetOffset, offset, duration, lastDiff);
            s.animateTo(offset + targetOffset, {
                done: function () {
                    lastDiff = Math.abs(offset - s.relativeToAbsolute($target.get(0), 'top', 'top'));
                    if (counter < 3 && lastDiff > inaccuracy) {
                        counter++;
                        scroll();
                    }
                },
                duration: duration
            });
        })();
    }
}

$(function () {
    skrollrInstance = skrollr.init({
        constants: {
            box: '150p'
        }
    });

    $('.black-rectangle').click(function (e) {
        e.preventDefault();
        superScroll($(this).data('target'));
    });
});

