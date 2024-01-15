var skrollrInstance;

$(function () {
    skrollrInstance = skrollr.init({
        constants: {
            box: '150p'
        },
        skrollrBody: 'page-screen'
    });

    skrollr.menu.init(skrollrInstance, {
        animate: true,
        complexLinks: true,
        updateUrl: false,
    });
});