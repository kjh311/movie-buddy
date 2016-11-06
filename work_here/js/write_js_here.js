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
});

$('.star-link').click(function() {
  $('.star-link').addClass('white');
  $('.movie-link').removeClass('white');
  $('.tv-link').removeClass('white');
});

$('.tv-link').click(function() {
  $('.tv-link').addClass('white');
  $('.star-link').removeClass('white');
  $('.movie-link').removeClass('white');
});

// $( '.readMore' ).click(function() {

//               $( '.readMoreLink' ).hide();


//     });





});
