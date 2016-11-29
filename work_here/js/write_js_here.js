// JQUERY WORKS!
$( document ).ready(function() {


$('.button-collapse').sideNav({
  menuWidth: 300, // Default is 240
  edge: 'left', // Choose the horizontal origin
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

  if($('.movieOverviewText').text().length < 400  ){
    $('.readMoreLink').hide();
  }

  if($('.movie-review-content1').text().length < 150  ){
    $('.readMoreLink-reviews1').hide();
  }

  if($('.movie-review-content2').text().length < 150  ){
    $('.readMoreLink-reviews2').hide();
  }

  if($('.movie-review-content3').text().length < 150  ){
    $('.readMoreLink-reviews3').hide();
  }



// });
});
