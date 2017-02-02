// JQUERY WORKS!
$( document ).ready(function() {

// Movie Icon hover
$(".movie-icon-text").hover(
  function() {
    $(".movie-icon").addClass( "hover" );
  }, function() {
    $(".movie-icon").removeClass( "hover" );
  }
);
// TV Icon hover
$(".tv-icon-text").hover(
  function() {
    $(".tv-icon").addClass( "hover" );
  }, function() {
    $(".tv-icon").removeClass( "hover" );
  }
);
// Celebrity Icon hover
$(".celebrity-icon-text").hover(
  function() {
    $(".celebrity-icon").addClass( "hover" );
  }, function() {
    $(".celebrity-icon").removeClass( "hover" );
  }
);
// News Icon hover
$(".news-icon-text").hover(
  function() {
    $(".news-icon").addClass( "hover" );
  }, function() {
    $(".news-icon").removeClass( "hover" );
  }
);
// Facebook Icon hover
$(".share-on-facebook").hover(
  function() {
    $(".facebook-icon").addClass( "hover" );
  }, function() {
    $(".facebook-icon").removeClass( "hover" );
  }
);
// Twitter Icon hover
$(".share-on-twitter").hover(
  function() {
    $(".twitter-icon").addClass( "hover" );
  }, function() {
    $(".twitter-icon").removeClass( "hover" );
  }
);
// Google + Icon hover
$(".share-on-google-plus").hover(
  function() {
    $(".google-plus-icon").addClass( "hover" );
  }, function() {
    $(".google-plus-icon").removeClass( "hover" );
  }
);


$('.button-collapse').sideNav({
  menuWidth: 300, // Default is 240
  edge: 'right', // Choose the horizontal origin
  closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
  draggable: true // Choose whether you can drag to open on touch screens
});

$('.parallax').parallax();

    function parallax(){
    var scrolled = $(window).scrollTop();
    $('.bg').css('top', -(scrolled * 0.1) + 'px');
    $('.mg').css('top', -(scrolled * 0.5) + 'px');
    $('.fg').css('top', -(scrolled * 1.5) + 'px');
    $('.farMiddleGround').css('top', -(scrolled * 0.2) + 'px');

}

  $(window).scroll(function(e){
      parallax();
  });
// $( document ).ready(function() {

  // if($('.movieOverviewText').text().length < 400  ){
  //   $('.readMoreLink').hide();
  // }

  // if($('.movie-review-content1').text().length < 150  ){
  //   $('.readMoreLink-reviews1').hide();
  // }

  // if($('.movie-review-content2').text().length < 150  ){
  //   $('.readMoreLink-reviews2').hide();
  // }

  // if($('.movie-review-content3').text().length < 150  ){
  //   $('.readMoreLink-reviews3').hide();
  // }



// });
});
