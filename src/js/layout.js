var $ = require('jquery');
var debounce = require('debounce');
var Headroom = require('headroom.js');

var $head = $('header');
var $main = $('main');
var $tail = $('footer');
var $mobileNavWrapper = $head.find('.js-mobile-nav');
var $mobileNav = $mobileNavWrapper.find('nav');
var $ham = $('header .hamburger');

var header = new Headroom($head[0], {
    tolerance: {
        up : 5,
        down : 5
    }
});

function actionOnHamburger() {
    if ($ham.hasClass('is-active')) {
        // $overlay.show();
        $mobileNav.slideDown();
    } else {
        $mobileNav.slideUp();
    }
}

function repadContent() {
    var top = $head.outerHeight();
    var tail = $tail.outerHeight();
    $main.css({
        'padding-top': top,
        'padding-bottom': tail,
        'margin-bottom': -tail
    });
    $main.find('.splash').css({
        'margin-top': -top
    });
}

header.init();
repadContent();

$mobileNav.css('display', 'none').removeClass('hide');

$ham.on('click', function() {
    $(this).toggleClass('is-active');
    actionOnHamburger();
});

$(window).on('resize', debounce(repadContent));

// probably not needed anymore
$(window).on('scroll', debounce(function() {
    $mobileNav.hide();
    $ham.removeClass('is-active');
}));


