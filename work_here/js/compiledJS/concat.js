var app = angular.module('myApp',['ngRoute']);

// .config(function($sceDelegateProvider) {
//    $sceDelegateProvider.resourceUrlWhitelist([
//      'self',
//      '*://www.youtube.com/**'
//    ]);
//  });




// CONTROLLER
app.controller('myCtrl', ['$scope', '$http', '$location', '$sce', 'userService', function($scope, $http, $location, $sce, userService) {
  $scope.name = 'Kevin';



var root_url = "https://api.themoviedb.org/3/";
var base_url = "https://api.themoviedb.org/3";
$scope.movieId = "https://api.themoviedb.org/3/movie/188927?api_key="+userService.key;

$scope.winLocation = $location.path();
  var winLocation = $location.path();

  $http.get(root_url+"movie/188927?api_key="+userService.key+"").success(function(data) {
    $scope.movieStuff = data;
  });

// Latest movies
$http.get(root_url+"movie/now_playing?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.nowPlayingMovies = data;
  });

// Top Rated movies
  $http.get(root_url+"movie/top_rated?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.topMovies = data;
  });

// Coming Attractions:
  $http.get(root_url+"movie/upcoming?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.comingMovies = data;
  });

// Action movieStuff
  $http.get(root_url+"genre/28/movies?api_key="+userService.key+"&language=en-US&sort_by=created_at.asc").success(function(data) {
    $scope.actionMovies = data;
  });

// Popular Movies:
  $http.get(root_url+"movie/popular?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.popularMovies = data;
  });



// Popular TV:
  $http.get(root_url+"tv/popular?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.popularTv = data;
  });

// On Air TV
  $http.get(root_url+"tv/on_the_air?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.onAirTv = data;
  });

// Airing Today:
  $http.get(root_url+"tv/airing_today?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.onAirTodayTv = data;
  });

// Top Rated TV
  $http.get(root_url+"tv/top_rated?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.topRatedTv = data;
  });

// Popular Stars:
  $http.get(root_url+"person/popular?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.popularPeople = data;
  });

// image path
  $scope.imgPath = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";



}]);

// app.controller('movieController', function(){
app.controller('movieController', ['$scope', '$http', '$location', '$sce', 'userService', function($scope, $http, $location, $sce, userService) {


var root_url = "https://api.themoviedb.org/3/";
var base_url = "https://api.themoviedb.org/3";

$scope.movieId = "https://api.themoviedb.org/3/movie/188927?api_key="+userService.key;

$scope.winLocation = $location.path();
  var winLocation = $location.path();

  // Movie Details
  $http.get(base_url+winLocation+"?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.movieDetails = data;
  });

//Movie Reviews
  $http.get(base_url+winLocation+"/reviews?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.movieReviews = data;
  });

// Movie Cast
  $http.get(base_url+winLocation+"/credits?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.movieCast = data;
  });

// Movie Trailer:


  $http.get(base_url+winLocation+"/videos?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.movieTrailer = data;
    $scope.youtube = "https://www.youtube.com/embed/";
    // $scope.trailerLink = youtube+movieTrailer.results[0].key;
  });
  // alert(movieTrailer.results[0].key);

  // $scope.trailer = $scope.currentProjectUrl = $sce.trustAsResourceUrl("https://www.youtube.com/embed/"+movieTrailer.results[0].key);



}]);


// STAR CONTROLLER
app.controller('starController', ['$scope', '$http', '$location', '$sce', 'userService', function($scope, $http, $location, $sce, userService) {

$scope.winLocation = $location.path();
  var winLocation = $location.path();

  // $scope.location = window.location.href;
  var value = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);


  var root_url = "https://api.themoviedb.org/3/";
  var base_url = "https://api.themoviedb.org/3";
// https://api.themoviedb.org/3/person/62?api_key=567d010127834d2946cbe71933f1639b&language=en-US

// https://api.themoviedb.org/3/person/star/59313?api_key=567d010127834d2946cbe71933f1639b&language=en-US&page=1
// https://api.themoviedb.org/3/person/59313?api_key=567d010127834d2946cbe71933f1639b&language=en-US

  $http.get(root_url+"person/"+value+"?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.starDetails = data;
  });

}]);

// NG-ROUTE
app.config(['$locationProvider', '$routeProvider',
 function($location, $routeProvider) {
  // alert($location.path);



    $routeProvider
        .when('/', {
            templateUrl : "/work_here/views/home.html",
            controller: 'myCtrl'
        })
        .when("/movies", {
          templateUrl : "/work_here/views/movies.html"
        })
        .when('/movie/:id', {
          templateUrl  : '/work_here/views/moviePage.html',
          controller: 'movieController'
        })
        .when("/tv", {
          templateUrl : "/work_here/views/tv.html"
        })
        .when("/stars", {
          templateUrl : "/work_here/views/stars.html"
        })
        .when('/star/:id', {
          templateUrl  : '/work_here/views/starPage.html',
          controller: 'starController'
        })
        .otherwise({redirectTo:'/'});
}]);

// app.config(function($sceDelegateProvider) {
//    $sceDelegateProvider.resourceUrlWhitelist([
//      'self',
//      '*://www.youtube.com/**'
//    ]);
//  });

app.filter('truncate', function () {
        return function (text, length, end) {
            if (isNaN(length))
                length = 10;

            if (end === undefined)
                end = "...";

            if (text.length <= length || text.length - end.length <= length) {
                return text;
            }
            else {
                return String(text).substring(0, length-end.length) + end;
            }

        };
    });

app.factory('userService', [function(){

    return {
      key: '567d010127834d2946cbe71933f1639b'
  };

}]);

// JQUERY WORKS!
$( document ).ready(function() {
    // alert( "ready!" );

$('.carousel').carousel();

// $('.readMoreLink').click(function(){
//     $('.readMoreLink').hide();
// });

$('.materialboxed').materialbox();










});
