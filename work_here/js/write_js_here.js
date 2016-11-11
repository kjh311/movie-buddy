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

  // // Initialize collapse button
  // $(".button-collapse").sideNav();
  // // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  // // $('.collapsible').collapsible();

   $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
    }
  );


});
