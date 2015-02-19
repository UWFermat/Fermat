$(document).ready(function() {

	/***************** Nav Transformicon ******************/

	/* When user clicks the Icon */
	$(".nav-toggle").click(function() {
		$(this).toggleClass("active");
		$(".overlay-boxify").toggleClass("open");
	});
	
	/* When user clicks outside */
	$(".overlay").click(function() {
		$(".nav-toggle").toggleClass("active");
		$(".overlay-boxify").toggleClass("open");
	});

});
