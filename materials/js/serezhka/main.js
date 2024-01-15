$(function() {

	$(".main-nav-toggler").click(function() {
	
	    $("#main-nav-toggler").toggleClass("close");
	    
	    if ($(this).attr("data-type") === "static") {
	    	$("body").toggleClass("main-nav-opened");
	    }
	 });
});

$(function() {

	if($(".index-page-wrapper").width()<500){
		var fh = $(".page-screen > .container").height();
		$(".section.helper").css("margin-bottom",fh-(fh*1.0225)+"vh");
	}

	if($(".index-page-wrapper").width()>=500 && $(".index-page-wrapper").width()<767){
		var fh = $(".page-screen > .container").height();
		$(".section.helper").css("margin-bottom",fh-(fh*1.0255)+"vh");
	}
	
	$('.j-scroll').click(function() {
		var target = $(this).data('target');
		var offset = $(this).data('offset') ? parseInt($(this).data('offset')) : 0;

		$('body').scrollTo('#login-page', 100);

		setTimeout(function(){
		$('body').scrollTo('#'+target, 'slow', {offset: {top: offset, left:0} });
		},300);

		setTimeout(function(){
		$('body').scrollTo('#'+target, 'slow', {offset: {top: offset, left:0} });
		},600);
	});
		
	$('.j-signout-test').click(function() {
		$(".section.section-social").toggleClass('authorized');
	});
		
	var onlocate = function(){
		var target = window.location.hash.replace("#","");
		if (target != "") {
			
			$('body').scrollTo('#login-page', 100);
			//$('body').scrollTo('#'+target, 'slow', {offset: {top: -100, left:0} });
			setTimeout(function(){
				$('body').scrollTo('#'+target, 'slow', {offset: {top: -150, left:0} });
			},300);
			
			setTimeout(function(){
				$('body').scrollTo('#'+target, 'slow', {offset: {top: -150, left:0} });
			},600);
		}
	};
	//setTimeout(onlocate, 500);
	
	$('.a-scroll').click(function(event) {
		setTimeout(onlocate, 500);
	});
	
	$(".fancybox").fancybox({	
	  autoResize: true,
	  autoCenter: true
	});
	
	$(".fancybox_faq").fancybox({
		helpers : {
			overlay : {
				css : {
					'background-image': 'url(../img/fancybox/overlay.png)',
					'background-repeat': 'repeat',
					'background-position': '0 0'
				}
			}
		}
	});
	
	
	
	
});