$(document).ready(function(){   
	// ------------------------------------------------------------------------- \\
	// Detect window width

	var wi = $(window).width();

    checkWidth();
 
    $(window).resize(function(){
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
      disable: 'mobile',
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

    $('#feedbackSubmit').on('click', function(e){
        e.preventDefault();

        proceed = true;
        $('#feedBackForm input').each( function(){
            var curField = $(this).attr("id");
            switch(curField){
                case 'feedbackEmaild':
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if($('#'+curField).val() =='' || !re.test($('#'+curField).val())){
                        proceed = false;
                        $(this).next('.e').html("Email is not valid");
                        $(this).next('.e').addClass('err');
                    }else{
                        $(this).next('.e').html("");
                        $(this).next('.e').removeClass('err');
                    }
                    break;
                case 'feedbackSubject':
                case 'feedbackMessage':
                    if($('#'+curField).val() ==''){
                        proceed = false;
                        $(this).next('.e').html("Field can't be left blank.");
                        $(this).next('.e').addClass('err');
                    }else{
                        $(this).next('.e').html("");
                        $(this).next('.e').removeClass('err');
                    }
                    break;
                default:
                    break;
            }
        });

        if(proceed){
            $.post( "https://www.getviewfinder.com/feedback.php", { 
                action: 'mail',
                subject: $('#feedbackSubject').val(),
                message: $('#feedbackMessage').val(),
                email: $('#feedbackEmaild').val(),
            }, function( data ) {
                if(data !== 'shabba'){
                    $('#messagesArea').html('Feedback received. Thank you!');
                }else{
                    $('#messagesArea').html('There was an error with your information. Check your input elements and re-submit.');
                }
            });
        }
    });
});

// ------------------------------------------------------------------------- \\
// Initiate rellax parallax - foreground images



function checkWidth(){
	wi = $(window).width();

    if(wi <= 479){
        if(typeof rellax != 'undefined'){ rellax.destroy(); }
        $('.hero.parallax-window').parallax({imageSrc: 'images/bg-hero-768.jpg'});
    	//console.log("I got here 320-479");
	}else if( wi > 479 && wi <= 767){
        if(typeof rellax != 'undefined'){ rellax.destroy(); }
    	$('.hero.parallax-window').parallax({imageSrc: 'images/bg-hero-768.jpg'});
        //console.log("I got here 480-767");
    }else if( wi > 767 && wi <= 991 ){
        if(typeof rellax != 'undefined'){ rellax.destroy(); }
        $('.hero.parallax-window').parallax({imageSrc: 'images/bg-hero-991.jpg'});
        //console.log(" I got here 768-991");
    }else if(wi > 991 && wi <= 1199){
        if(typeof rellax == 'undefined'){ rellax = new Rellax('.rellax', { center: true }); }
        $('.hero.parallax-window').parallax({imageSrc: 'images/bg-hero-1199.jpg'});
        //console.log("I got here 992-1199");
    }else{
        if(typeof rellax == 'undefined'){ rellax = new Rellax('.rellax', { center: true }); }
        $('.hero.parallax-window').parallax({imageSrc: 'images/bg-hero-1440.jpg'});
        //console.log("I got here 1200+");
    }
};