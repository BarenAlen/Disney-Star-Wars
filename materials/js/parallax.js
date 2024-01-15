$(function () {
    var skrollrInstance = skrollr.init({
        skrollrBody: 'page-screen',
        // mobileDeceleration: 1,
        // forceHeight: false,
        constants: {
            box: '150p'
        }

    });

    skrollr.menu.init(skrollrInstance, {
        animate: true,
        complexLinks: true,
        updateUrl: false,
        smoothScrolling: true
    });
});