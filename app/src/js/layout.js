var $ = require('jquery');
var debounce = require('debounce');
var $head = $('header');
var $main = $('main');
var $tail = $('footer');
var $mobileNavWrapper = $head.find('.js-mobile-nav');
var $mobileNav = $mobileNavWrapper.find('nav');
var $ham = $('header .hamburger');

function actionOnHamburger() {
    if ($ham.hasClass('is-active')) {
        // $overlay.show();
        $mobileNav.slideDown();
    } else {
        $mobileNav.slideUp();
    }
}
var last = $head.outerHeight();

var repadContent = debounce(function repadContent() {
    var top = $head.outerHeight();
    var tail = $tail.outerHeight();

    if (Math.round(top) !== Math.round(last)) {
        window.scrollBy(0, top - last);
    }

    $main.css({
        'padding-top': top,
        'padding-bottom': tail,
        'margin-bottom': -tail
    });
    $main.find('.splash').css({
        'margin-top': -top
    });
});

repadContent();

$mobileNav.css('display', 'none').removeClass('hide');

$ham.on('click', function() {
    $(this).toggleClass('is-active');
    actionOnHamburger();
});

$(window).on('resize', repadContent);
$('footer').on('postequalized.zf.equalizer', repadContent);
$('header').on('load', 'img', repadContent);

// probably not needed anymore
$(window).on('scroll', deactivate);

function deactivate () {
    $mobileNav.slideUp();
    $ham.removeClass('is-active');
}

$('body').on('click tap', 'main', deactivate);
