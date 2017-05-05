$(function() {

	"use strict";

	// ----- Plugins call js ----- 
	
	// ISOTOPE js
	var $container = $('.isotope');

	$container.imagesLoaded( function(){
		$container.isotope({
			itemSelector : '.item',
			animationEngine : 'jquery',
			stagger: 30,
			transitionDuration: '0.8s'
		});

	    // filter buttons
	    $('#filters a').click(function(){
	    	var $this = $(this);
	        // don't proceed if already selected
	        if ( !$this.hasClass('is-checked') ) {
	        	$this.parents('#options').find('.is-checked').removeClass('is-checked');
	        	$this.addClass('is-checked');
	        }
	        var selector = $this.attr('data-filter');
	        $container.isotope({  
	        	itemSelector: '.item', 
	        	filter: selector 
	        });
	        return false;
	    });  



   //      // filter items on button click
	  // $('#filters').on( 'click', 'button', function() {
	  //   var filterValue = $(this).attr('data-filter');
	  //   $container.isotope({ filter: filterValue });
	  // });	  

	});








	// ----- Custom JS ----- 
	timra_header_sticky();  

	timra_to_top(); 

	//check if the browser supports element rotation
	function timra_header_sticky()
	{
		// Add body class "scrolled"
		var scrollOffset = 50;

		if( $(window).scrollTop() < scrollOffset ){
			$('body').removeClass('scrolled');
		}else{
			$('body').addClass('scrolled');
		}

		$(window).on('scroll', function(){
			if( $(window).scrollTop() < scrollOffset ){
				$('body').removeClass('scrolled');
			} else {
				$('body').addClass('scrolled');
			}
		});
    }//timra_header_sticky()  

	//check if the browser supports element rotation
	function timra_to_top()
	{
		// Add body class "scrolled"
		var scrollOffset = 150;

		// hide #back-top first
		$(".to_top").removeClass('show');

		// if( $(window).scrollTop() < scrollOffset ){
		// 	$('.to_top').show();
		// }else{
		// 	$('.to_top').hide();
		// }

		$(window).on('scroll', function(){
			if( $(window).scrollTop() < scrollOffset ){
				$('.to_top').removeClass('show');
			} else {
				$('.to_top').addClass('show');
			}
		});
    }//timra_to_top()        


	//Maginific popup extends
	$('.image-popup-vertical-fit').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		image: {
			verticalFit: true
		}
	});

	// Initialize popup as usual
	$('.image-link').magnificPopup({
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		gallery: {
			enabled: true,
			// navigateByImgClick: true,
			// preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			verticalFit: false,
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
		},
		mainClass: 'mfp-with-zoom', // this class is for CSS animation below
		zoom: {
			enabled: true, 
			duration: 300, 
			easing: 'ease-in-out', 
			opener: function(openerElement) {
				return openerElement.closest('.img').find(" > img");
			}
		}

	});


	// var groups = {};
	// $('.image-popup-vertical-fit').each(function() {
	//   var id = parseInt($(this).attr('data-group'), 10);

	//   if(!groups[id]) {
	//     groups[id] = [];
	//   } 

	//   groups[id].push( this );
	// });


	// $.each(groups, function() {

	//   $(this).magnificPopup({
	//       type: 'image',
	//       closeOnContentClick: true,
	//       closeBtnInside: false,
	//       gallery: { enabled:true },
	//       removalDelay: 300,
 //          mainClass: 'mfp-3d-unfold'
	//   })

	// });

	// Full page scroll
	// if ($(window).width() >= 1200 && $(window).height() >= 600) {
	// 	$('#main').fullpage({
	// 		scrollBar: true,
	// 		slideSelector: false,
	// 		normalScrollElements: '#map',
	// 		responsiveWidth: 1200,
	// 		responsiveHeight: 600,
	// 		onLeave: function(index, nextIndex, direction) {
	// 			var video = $('#video')[0];

	// 			if (index === 1) {
	// 				video.pause();
	// 			}

	// 			if (nextIndex === 1) {
	// 				video.play();
	// 			}

	// 			if (nextIndex === 4 || nextIndex === 5) {
	// 				launchAnimation(nextIndex - 1);
	// 			}
	// 		},
	// 		afterRender: function() {
	// 			$('#video')[0].play();

	// 			if ($(window).width() < 1200 || $(window).height() < 600) {
	// 				$('.section, .section .fp-tableCell').removeAttr('style');
	// 			}
	// 		},
	// 		afterResize: function() {
	// 			if ($(window).width() < 1200 || $(window).height() < 600) {
	// 				$('.section, .section .fp-tableCell').removeAttr('style');
	// 			}
	// 		}
	// 	});
	// }

	
	//Lazy load
	// $('.lazy').Lazy({
 //        effect: "fadeIn",
 //        effectTime: 2000,
 //        threshold: 0,	
 //        placeholder: "",
 //        customLoaderName: function(element) {
 //            element.load();
 //            console.log(element);
 //        },
 //        // called after an element was successfully handled
 //        afterLoad: function(element) {
 //        	$('body').removeClass('loading').addClass('loaded');
 //        }
 //    });


});