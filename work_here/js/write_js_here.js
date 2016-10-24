// JQUERY WORKS!
$( document ).ready(function() {
    // alert( "ready!" );

$('.carousel').carousel();

 // $('.your-class').slick({
 //    setting-name: setting-value
 //  });

  $('.multiple-items').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3
});

   $('.my-slick-slider').slick({
      // autoplay: true
        dots: true,
  infinite: true,
  speed: 500,
  fade: true,
  cssEase: 'linear'
    });













});
