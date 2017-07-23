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

    $main.css({
        'padding-top': top,
        'padding-bottom': tail,
        'margin-bottom': -tail
    });
    $main.find('.splash').css({
        'margin-top': -top
    });

    var $sticky = $('[data-sticky]');
    if ($sticky.length) {
        var offset = top / parseInt($sticky.css('font-size').replace('px$', ''), 10);
        var stickyPlugin = $sticky.data('zfPlugin');

        if (stickyPlugin.isStuck) {
            $sticky.css('margin-top', offset + 'em');
        }

        stickyPlugin.options.marginTop = '' + offset;
        $('[data-magellan]').data('zfPlugin').options.barOffset = top;
    }
    
    if (Math.round(top) !== Math.round(last)) {
        window.scrollBy(0, top - last);
        last = top;
    }
});

$('body').on('click', 'a', function(evt) {
    var $el = $(this);

    if ($el[0] && $el[0].nodeName === 'A') {
        var href = $el.attr('href');

        if (href.indexOf('#') === 0) {
            evt.preventDefault();


        }
    }
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
