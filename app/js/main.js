$(document).ready(function() {

    if ($('#video').length) {
        $("#video")[0].play();
    }

    $('#cause__slider').owlCarousel({
        loop: false,
        margin: 10,
        dots: true,
        items: 1,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        mouseDrag: false
    });



    $('.header__mouse').on('click', function() {
        $('body,html').animate({
            scrollTop: $('.service').offset().top
        }, 800);
        return false;
    });

    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'

        }
    });

    /*var iheight=$(window).height()-129;
    $(window).scroll(function(){
            if ( $('body').scrollTop() > 0) {
                $('.header__top').addClass('fixed');
                $('.header__bottom').addClass('fixed');
            }
            else {
                $('.header__top').removeClass('fixed');
                $('.header__bottom').removeClass('fixed');
            }
        }); */

    $('#partners_slider').owlCarousel({
        loop: true,
        margin: 50,
        responsiveClass: true,
        dots: true,
        items: 6,
        nav: false,
        responsive: {
            0: {
                items: 3

            },
            600: {
                items: 3

            },
            1000: {
                items: 6,
                dots: true

            }
        }
    });

    $('#works_slider').owlCarousel({
        loop: true,
        margin: 40,
        responsiveClass: true,
        dots: true,
        items: 6,
        nav: false,
        responsive: {
            0: {
                items: 1

            },
            659: {
                items: 3

            },
            1320: {
                items: 4,
                dots: false,
                nav: true

            }
        }
    });

    // init controller
    var controller = new ScrollMagic.Controller();

    // Service
    var animate2 = new TimelineMax()
        .add([

            TweenMax.to(".serviceitem__img--1", 0.5, {
                autoAlpha: 1,
                y: -30,
                force3D: true
            }),
            TweenMax.to(".serviceitem__img--2", 0.5, {
                autoAlpha: 1,
                y: -30,
                ease: Power3.easeInOut
            }),
            TweenMax.to(".serviceitem__img--3", 0.5, {
                autoAlpha: 1,
                y: -30,
                delay: 0.25,
                ease: Power3.easeInOut
            }),
            TweenMax.to(".serviceitem__img--4", 0.5, {
                autoAlpha: 1,
                y: -30,
                delay: 0.5,
                ease: Power3.easeInOut
            }),
            TweenMax.to(".serviceitem__img--5", 0.5, {
                autoAlpha: 1,
                y: -30,
                delay: 0.75,
                ease: Power3.easeInOut
            })
        ]);

    if ($('.service').length) {
        var scene2 = new ScrollMagic.Scene({
                triggerElement: ".service",
                triggerHook: 0.7,
                reverse: false
            })
            .setTween(animate2)
            .addTo(controller);
    }

    // Product
    var animate3 = new TimelineMax()
        .add([
            TweenMax.to(".products__list--1", 0.5, {
                autoAlpha: 1,
                y: -30,
                delay: 0.25,
                ease: Power3.easeInOut
            }),
            TweenMax.to(".products__list--2", 0.5, {
                autoAlpha: 1,
                y: -30,
                delay: 0.75,
                ease: Power3.easeInOut
            })

        ]);

    if ($('.products').length) {
        var scene3 = new ScrollMagic.Scene({
                triggerElement: ".products",
                triggerHook: 0.7,
                reverse: false
            })
            .setTween(animate3)
            .addTo(controller);
    }

    // Material
    var animate4 = new TimelineMax()
        .add([

            TweenMax.to(".materials--1", 0.5, {
                autoAlpha: 1,
                y: -30,
                delay: 0.25,
                ease: Power3.easeInOut
            }),
            TweenMax.to(".materials--2", 0.5, {
                autoAlpha: 1,
                y: -30,
                delay: 0.75,
                ease: Power3.easeInOut
            })

        ]);

    if ($('.material').length) {
        var scene4 = new ScrollMagic.Scene({
                triggerElement: ".material",
                triggerHook: 0.7,
                reverse: false
            })
            .setTween(animate4)
            .addTo(controller);
    }
    

    
});
    $(document).on('click', '.menu__trigger', function(e){
        e.preventDefault();

        var clicked = $(this);

        if(clicked.hasClass('close')){
            clicked.removeClass('close');
            $('.mobile__menu__wrap').removeClass('show-menu');      
        }else{
            clicked.addClass('close');
            $('.mobile__menu__wrap').addClass('show-menu'); 
            
        }
    });