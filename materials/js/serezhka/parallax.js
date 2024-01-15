var skrollrInstance;

function superScroll(target, options, skrollr) {
    var $target = $(target);
    var s = skrollr || skrollrInstance;
    if ($target.length && s) {
        var inaccuracy = window.innerHeight / 20;
        var targetOffset = parseInt($target.data('menu-offset') || $target.data('scroll-offset') || 0);
        var counter = 0;
        var lastDiff;

        (function scroll() {
            // var firstOffset = counter === 0 ? -500 : 0;
            var offset = s.relativeToAbsolute($target.get(0), 'top', 'top');
            var duration = lastDiff ? Math.min(500, Math.max(lastDiff, 300)) : options.duration; // Math.min(500, Math.max(lastDiff, 500))
            // console.log(counter, targetOffset, offset, duration, lastDiff);
            s.animateTo(offset + targetOffset, { // + firstOffset
                done: function () {
                    lastDiff = Math.abs(offset - s.relativeToAbsolute($target.get(0), 'top', 'top'));
                    if (counter < 3 && lastDiff > inaccuracy) { //  || firstOffset !== 0
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

    skrollr.menu.init(skrollrInstance, {
        animate: true,
        complexLinks: true,
        updateUrl: false,
        scroller: function (target, offset, options) {
            superScroll(target, options, this);
        }
    });
});