var app = angular.module('myApp',['ngRoute']);


// CONTROLLER
app.controller('myCtrl', ['$scope', '$http', 'userService', function($scope, $http, userService) {
  $scope.name = 'Kevin';

var root_url = "https://api.themoviedb.org/3/";
$scope.movieId = "https://api.themoviedb.org/3/movie/188927?api_key="+userService.key;


  $http.get(root_url+"movie/188927?api_key="+userService.key+"").success(function(data) {
    $scope.movieStuff = data;
  });

// Latest movies
$http.get(root_url+"movie/now_playing?api_key="+userService.key+"&language=en-US&page=1"+userService.key+"").success(function(data) {
    $scope.nowPlayingMovies = data;
  });

// Top Rated movies
  $http.get(root_url+"movie/top_rated?api_key="+userService.key+"&language=en-US&page=1"+userService.key+"").success(function(data) {
    $scope.topMovies = data;
  });

// Popular Movies:
  $http.get(root_url+"movie/popular?api_key="+userService.key+"&language=en-US&page=1"+userService.key+"").success(function(data) {
    $scope.popularMovies = data;
  });

// Popular TV:
  $http.get(root_url+"tv/popular?api_key="+userService.key+"&language=en-US&page=1"+userService.key+"").success(function(data) {
    $scope.popularTv = data;
  });

// Popular Stars:
  $http.get(root_url+"person/popular?api_key="+userService.key+"&language=en-US&page=1"+userService.key+"").success(function(data) {
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
        .when("/tv", {
          templateUrl : "/work_here/views/tv.html"
        })
        .when("/stars", {
          templateUrl : "/work_here/views/stars.html"
        })
        .otherwise({redirectTo:'/'});
}]);


