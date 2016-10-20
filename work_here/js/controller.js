var app = angular.module('myApp',[]);

app.controller('myCtrl', ['$scope', '$http', 'userService', function($scope, $http, userService) {
  $scope.name = 'Kevin';

var root_url = "https://api.themoviedb.org/3/";
$scope.movieId = "https://api.themoviedb.org/3/movie/188927?api_key="+userService.key;

  $http.get(root_url+"movie/188927?api_key="+userService.key+"").success(function(data) {
    $scope.movieStuff = data;
  });

// Popular Movies:
  $http.get(root_url+"movie/popular?api_key="+userService.key+"&language=en-US&page=1"+userService.key+"").success(function(data) {
    $scope.popularMovies = data;
  });

// Popular TV:
  $http.get(root_url+"tv/popular?api_key="+userService.key+"&language=en-US&page=1"+userService.key+"").success(function(data) {
    $scope.popularTv = data;
  });

// image path
  $scope.imgPath = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";

}]);
