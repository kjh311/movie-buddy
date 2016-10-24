var app = angular.module('myApp',['ngRoute']);


// CONTROLLER
app.controller('myCtrl', ['$scope', '$http', '$location', 'userService', function($scope, $http, $location, userService) {
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

// Movie Details
  $http.get(base_url+winLocation+"?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.movieDetails = data;
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

// NG-ROUTE
app.config(['$locationProvider', '$routeProvider',
 function($location, $routeProvider) {
  // alert($location.path);
    $routeProvider
        .when('/', {
            templateUrl : "/work_here/views/home.html"
        })
        .when("/movies", {
          templateUrl : "/work_here/views/movies.html"
        })
        .when('/movie/:id', {
          templateUrl  : '/work_here/views/moviePage.html'
        })
        .when("/tv", {
          templateUrl : "/work_here/views/tv.html"
        })
        .when("/stars", {
          templateUrl : "/work_here/views/stars.html"
        })
        .otherwise({redirectTo:'/'});
}]);


