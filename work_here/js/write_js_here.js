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


$('.specific-link').click(function() {
  $('.star-link').removeClass('white');
  $('.movie-link').removeClass('white');
  $('.tv-link').removeClass('white');
});

// // if ( !$("#productInfoGrid").has("img") ) {
//     $(this).hide();
// }

// if ( $(".similar-movie-li-1 img").find('img').length == 0);​
//     $('.slides3').hide();
// }


});
