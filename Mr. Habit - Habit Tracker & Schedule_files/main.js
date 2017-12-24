/*
 * Apperle | Responsive App Landing Page.
 * Author: perleTheme Template
 * Copyright: 2017;
 * This is a premium product available exclusively here : https://themeforest.net/user/perletheme
 */

(function ($) {
    "use strict";

    var $window = $(window);

    //Fading Out Loader
    $window.on("load", function() {
        $(".pre-loader").fadeOut("slow");
        AOS.refresh();
    });

    $(document).ready(function () {


        var $icon4 = $("#hamburger-menu"),
            $socialHamburger = $('#social-hamburger'),
            $buttonCollapse = $(".button-collapse"),
            header = $("#main-header"),
            height = header.outerHeight(),
            offset = height / 2,
            navColor = $("#nav-color"),
            range = 200,
            didScroll,
            lastScrollTop = 0,
            delta = 5,
            $mainNav = $("#main-nav"),
            $mainNavHeight = $mainNav.outerHeight(),
            ww = $window.width(),
            scrollTop;

        /*----- Close SideNav when on resize width-----*/

        $window.on('resize', function(){
            if( ww != $window.width() ){
                ww = $window.width();
                $buttonCollapse.sideNav("hide");
            }
        });

        //Toggle Social Hamburger Icon on click
        $socialHamburger.on('click', function () {
            $(this).toggleClass('open')
        });

        /*----- Materialize JS Setup-----*/

        // SideNav Initialize
        $buttonCollapse.sideNav({
            draggable: true,
            closeOnClick: true,
            //Toggle the hamburger icon
            onOpen: function () {
                $icon4.addClass("open");
            },
            onClose: function () {
                $icon4.removeClass("open");
            }
        });

        // SideNav DropDown Initialize
        $(".dropdown-button").dropdown({
            belowOrigin: true,
            constrainWidth: false
        });

        // Header Slider Initialize
        $(".slider").slider();

        // Screenshots Carousel Initialize
        $(".carousel").carousel({
            dist: -70,
            fullWidth: false,
            shift: 0,
            padding: -100
        });

        //Auto Play the Carousel
        setInterval(function() {
            $(".carousel").carousel("next");
        }, 10000);

        $("#screenshot-next").on("click", function () {
            $(".carousel").carousel("next");
        });
        $("#screenshot-prev").on("click", function () {
            $(".carousel").carousel("prev");
        });

        // FAQ Collapsible Initialize
        $(".collapsible").collapsible();



        /*----- Fade Header and NavColor on Scroll-----*/

        $window.on("scroll", function () {
            var maxOpacity = 0.9
            didScroll = true;
            scrollTop = $(this).scrollTop();
            if(scrollTop > 1000) {
                navColor.css({ "opacity": maxOpacity});
                return;
            }
            var calc = maxOpacity - (offset - scrollTop + range) / range + 1;
            if(calc < maxOpacity) {
                navColor.css({ "opacity": calc});
            } else {
                navColor.css({ "opacity": maxOpacity});
            }
        });

        // Set nav bar opacity to 0 if on top of page
        if($(document).scrollTop() === 0) {
            navColor.css({ "opacity": 0});
        }


        setInterval(function() {
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }
        }, 200);

        function hasScrolled() {
            if(Math.abs(lastScrollTop - scrollTop) <= delta) {
                return;
            }
            if (scrollTop > lastScrollTop && scrollTop > $mainNavHeight){
                // $mainNav.removeClass("nav-down").addClass("nav-up");
            } else {
                if(scrollTop + $(window).height() < $(document).height()) {
                    $mainNav.removeClass("nav-up").addClass("nav-down");
                }
            }
            lastScrollTop = scrollTop;
        }



        /*----- ScrollIt JS Setup-----*/

        $.scrollIt({
            easing: "ease-out",
            topOffset: -1
        });


        /*----- Owl Carousal Setup-----*/

        // Initialize Header Carousel
        $(".owl-header").owlCarousel({
            loop: true,
            responsiveClass: true,
            items: 1,
            nav: false,
            dots: true,
            autoplay: true,
            margin: 30,
            animateOut: "bounceOutRight",
            animateIn: "bounceInLeft"
        });

        // Features Owl Carousal initialize
        var $owlFeatures = $(".owl-features"),
            $featureLinks = $(".feature-link");

        function highLightFeature($singleFeatureLink) {
            $featureLinks.removeClass("active");
            $singleFeatureLink.addClass("active");
        }

        // Initialize Features Carousel
        $owlFeatures.owlCarousel({
            loop: true,
            responsiveClass: true,
            margin: 20,
            autoplay: true,
            items: 1,
            nav: false,
            dots: false,
            animateOut: "slideOutDown",
            animateIn: "fadeInUp"
        });

        //Highlight the current link when owl changes
        $owlFeatures.on("changed.owl.carousel", function(event) {
            //Fix the current link
            var current = (event.item.index + 1) - event.relatedTarget._clones.length / 2;
            var allItems = event.item.count;
            if (current > allItems || current == 0) {
                current = allItems - (current % allItems);
            }
            current--;
            var $featureLink = $(".feature-link:nth("+ current + ")");
            highLightFeature($featureLink);
        });

        //Highlight the current link when feature clicked
        $featureLinks.on("click", function () {
            var $item = $(this).data("owl-item");
            $owlFeatures.trigger("to.owl.carousel", $item);
            highLightFeature($(this))
        });

        // Testimonials Owl Carousal
        $(".owl-testimonials").owlCarousel({
            loop: true,
            responsiveClass: true,
            dots: true,
            items:1
        });


        /*----- AOS Setup-----*/

        AOS.init({
            disable: "mobile",
            once: true,
            duration: 400,
            easing: "ease-in-sine"
        });


        /*----- Same Height Plugin Setup-----*/

        $(".same-height").matchHeight({
            property: "min-height",
            byRow: false
        });
    });




	
	// scroll to contact form
	if (window.location.hash.substr(1) == "contacts") {		
		$(window).on("load", function() {
			setTimeout(function() {
                $('html, body').animate({
                    scrollTop: $("#contacts").offset().top
                }, 2000);
			}, 100);
		})
	}

	var emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
	
	// notifications
	var showSubmitDataNotification = function(success, isConfirmRequired) {
		var options = {
			positionClass: 'toast-top-center',
			timeOut: 5000
		}

		if (success) {
			if (isConfirmRequired) {
				toastr.warning($('#submit-data-status .confirm').html(), null, options);
			} else {toastr
				toastr.success($('#submit-data-status .success').html(), null, options);
			}
		} else {			
			toastr.error($('#submit-data-status .error').html(), null, options);
		}
	}
	var showUnsubscribeUserNotification = function(success) {
		var options = {
			positionClass: 'toast-top-center',
			timeOut: 5000
		}

		if (success) {
			toastr.warning($('#unsubscribe-user-status .success').html(), null, options);
		} else {			
			toastr.error($('#unsubscribe-user-status .error').html(), null, options);
		}
	}
	var showUserConfirmSubscriptionNotification = function(success) {
		var options = {
			positionClass: 'toast-top-center',
			timeOut: 5000
		}

		if (success) {
			toastr.success($('#user-confirm-subscription-status .success').html(), null, options);
		} else {			
			toastr.error($('#user-confirm-subscription-status .error').html(), null, options);
		}
    }
    
    
	// add news subscriber
	$('#subscribe-form').submit(function(e) {
		var $form = $(this);
		var $email = $form.find('input[name="email"]');
		var $submit = $form.find('button[type="submit"]');
		var status = true;
		
		if ($email.val() === '' || emailRegex.test($email.val()) === false) {
			$email.addClass('invalid');
			status = false;
		}
		
		if (status) {
			$email.attr('disabled', 'disabled');
			$submit.attr('disabled', 'disabled');

			var setFormStatus = function(success) {
				if (success) {
					$email.val('').removeAttr('disabled').removeClass('invalid');
					$submit.removeAttr('disabled');
				} else {
					$email.removeAttr('disabled').removeClass('invalid');
					$submit.removeAttr('disabled');
				}
			}

			$.ajax({
				type: 'POST',
				url: '/api/users',
				data: JSON.stringify({
					email: $email.val(),
					isNewsSubscriberSet: true,
					isNewsSubscriberVal: true,
				}),
				contentType: "application/json"
			})
			.done(function(data) {
				showSubmitDataNotification(data.success, true);
				setFormStatus(data.success);
			})
			.fail(function() {
				showSubmitDataNotification(false);
				setFormStatus(false);				
			});
		}

		e.preventDefault();
        return false
	});
	
	// create contact request
	$('#contact-form').submit(function(e) {
		var $form = $(this);
		var $email = $form.find('input[name="email"]');
		var $subject = $form.find('input[name="subject"]');
		var $message = $form.find('textarea[name="message"]');
		var $submit = $form.find('button[type="submit"]');
		var status = true;
		
		if ($email.val() === '' || emailRegex.test($email.val()) === false) {
			$email.addClass('invalid');
			status = false;
		}
		if ($subject.val() === '') {
			$subject.addClass('invalid');
			status = false;
		}
		if ($message.val() === '') {
			$message.addClass('invalid');
			status = false;
		}
		
		if (status) {
			$subject.attr('disabled', 'disabled');
			$email.attr('disabled', 'disabled');
			$message.attr('disabled', 'disabled');
			$submit.attr('disabled', 'disabled');

			var setFormStatus = function(success) {
				if (success) {
					$email.val('').removeAttr('disabled').removeClass('invalid');
					$subject.val('').removeAttr('disabled').removeClass('invalid');
					$message.val('').removeAttr('disabled').removeClass('invalid');
					$submit.removeAttr('disabled');
				} else {
					$email.removeAttr('disabled').removeClass('invalid');
					$subject.removeAttr('disabled').removeClass('invalid');
					$message.removeAttr('disabled').removeClass('invalid');
					$submit.removeAttr('disabled');
				}
			}

			$.ajax({
				type: 'POST',
				url: '/api/contact-requests',
				data: JSON.stringify({
					email: $email.val(),
					subject: $subject.val(),
					message: $message.val(),
				}),
				contentType: "application/json"
			})
			.done(function(data) {
				showSubmitDataNotification(data.success);
				setFormStatus(data.success);
			})
			.fail(function() {
				showSubmitDataNotification(false);
				setFormStatus(false);
			});
		}

        e.preventDefault();
        return false
	});

	var resetPageUrl = function() {
		var currentTitle = $(document).find("title").text();
		window.history.replaceState({}, currentTitle, "/");
	}

	// confirm subscription
	var confirmSubscriptionKey = (location.search.split('confirmsub=')[1]||'').split('&')[0]
	if (typeof confirmSubscriptionKey === "string" && confirmSubscriptionKey != "") {
		$.ajax({
				type: 'GET',
				url: '/api/users/confirm-subscription/' + confirmSubscriptionKey,
				contentType: "application/json"
			})
			.done(function(data) {
				showUserConfirmSubscriptionNotification(data.success);

				if (data.success){
					resetPageUrl();
				}
			})
			.fail(function() {
				showUserConfirmSubscriptionNotification(false);
			});
			
	}

	// unsubscribe
	var unsubscribeKey = (location.search.split('unsubscribe=')[1]||'').split('&')[0]
	if (typeof unsubscribeKey === "string" && unsubscribeKey != "") {
		$.ajax({
				type: 'GET',
				url: '/api/users/unsubscribe/' + unsubscribeKey,
				contentType: "application/json"
			})
			.done(function(data) {
				showUnsubscribeUserNotification(data.success);

				if (data.success){
					resetPageUrl();
				}
			})
			.fail(function() {
				showUnsubscribeUserNotification(false);
			});
	}
})(jQuery);
