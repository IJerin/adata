$(document).ready(function()
{   
	// ------------------------------------------------------------------------- \\
	// Detect window width

	var wi = $(window).width();

    checkWidth();
 
    $(window).resize(function()
    {
        checkWidth();
    });

	// ------------------------------------------------------------------------- \\
	// Initiate parallax.js - background images

    $('.hero.parallax-window').parallax({imageSrc: 'images/bg-hero-1440.jpg'});
    $('.features.parallax-window').parallax({imageSrc: 'images/bg-features.jpg'});
    $('.creators.parallax-window').parallax({imageSrc: 'images/bg-creators.jpg'});


	

	//rellax.destroy();


	// ------------------------------------------------------------------------- \\
	// Initiate AOS - animate on scroll

	AOS.init({
      offset: 150,
      duration: 450,
      easing: 'ease-out-cubic',
      //disable: true,
      //disable: 'mobile',
    });


	// ------------------------------------------------------------------------- \\
	// Pin nav to top

	// function sticky_relocate()
	// {
	// 	var window_top = $(window).scrollTop();
	// 	var div_top = $('.pin-anchor').offset().top;
	// 	if (window_top > div_top)
	// 	{
	// 		$('.nav').addClass('pin');
	// 		$('.pin-anchor').height($('.nav').outerHeight());
	// 	}
	// 	else
	// 	{
	// 		$('.nav').removeClass('pin');
	// 		$('.pin-anchor').height(0);
	// 	}
	// }

	// $(function(){
	// 	$(window).scroll(sticky_relocate);
	// 	sticky_relocate();
	// });

});

// ------------------------------------------------------------------------- \\
// Initiate rellax parallax - foreground images

var rellax = new Rellax('.rellax', {
	center: true
});

function checkWidth()
{
	wi = $(window).width();

		// if width is less than or equal to 479px
    if (wi <= 479)
    {
    	rellax.destroy();
    	//console.log("320-479");
	}
    // if width is between 480px and 767px
    if (wi <= 767)
    {
    	rellax.destroy();
    	$('.hero.parallax-window').parallax({imageSrc: 'images/bg-hero-768.jpg'});
        //console.log("480-767");
    }
    // if width is between 768px and 991px
    if (wi <= 991)
    {
    	rellax.destroy();
        $('.hero.parallax-window').parallax({imageSrc: 'images/bg-hero-991.jpg'});
        //console.log("768-991");
    }
    // if width is between 768px and 991px
    if (wi <= 1199)
    {
        $('.hero.parallax-window').parallax({imageSrc: 'images/bg-hero-1199.jpg'});
        //console.log("992-1199");
    }
    // if width is greater than 1200px
    else
    {
        $('.hero.parallax-window').parallax({imageSrc: 'images/bg-hero-1440.jpg'});
        //console.log("1200+");
    }
};