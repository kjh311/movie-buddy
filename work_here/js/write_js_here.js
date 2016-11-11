// JQUERY WORKS!
$( document ).ready(function() {
    // alert( "ready!" );

// $('.carousel').carousel();

// $('.readMoreLink').click(function(){
//     $('.readMoreLink').hide();
// });

$('.materialboxed').materialbox();


$('.movie-link').click(function() {
  $('.movie-link').addClass('white');
  $('.star-link').removeClass('white');
  $('.tv-link').removeClass('white');
  $('.news-link').removeClass('white');
});

$('.star-link').click(function() {
  $('.star-link').addClass('white');
  $('.movie-link').removeClass('white');
  $('.tv-link').removeClass('white');
  $('.news-link').removeClass('white');
});

$('.tv-link').click(function() {
  $('.tv-link').addClass('white');
  $('.star-link').removeClass('white');
  $('.movie-link').removeClass('white');
  $('.news-link').removeClass('white');
});

$('.news-link').click(function() {
  $('.news-link').addClass('white');
  $('.tv-link').removeClass('white');
  $('.star-link').removeClass('white');
  $('.movie-link').removeClass('white');
});


$('.specific-link').click(function() {
  $('.star-link').removeClass('white');
  $('.movie-link').removeClass('white');
  $('.tv-link').removeClass('white');
  $('.news-link').removeClass('white');
});



   $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
    }
  );


});
