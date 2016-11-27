var app = angular.module('myApp',['ngRoute']);



// MY CONTROLLER
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

// Action movies
  $http.get(root_url+"genre/28/movies?api_key="+userService.key+"&language=en-US&sort_by=created_at.asc").success(function(data) {
    $scope.actionMovies = data;
  });

// Adventure movies
  $http.get(root_url+"genre/12/movies?api_key="+userService.key+"&language=en-US&sort_by=created_at.asc").success(function(data) {
    $scope.adventureMovies = data;
  });

// Animation movies
  $http.get(root_url+"genre/16/movies?api_key="+userService.key+"&language=en-US&sort_by=created_at.asc").success(function(data) {
    $scope.animationMovies = data;
  });

// Comedy movies
  $http.get(root_url+"genre/35/movies?api_key="+userService.key+"&language=en-US&sort_by=created_at.asc").success(function(data) {
    $scope.comedyMovies = data;
  });

// Crime movies
  $http.get(root_url+"genre/80/movies?api_key="+userService.key+"&language=en-US&sort_by=created_at.asc").success(function(data) {
    $scope.crimeMovies = data;
  });

// documentary movies
  $http.get(root_url+"genre/99/movies?api_key="+userService.key+"&language=en-US&sort_by=created_at.asc").success(function(data) {
    $scope.documentaryMovies = data;
  });

// drama movies
  $http.get(root_url+"genre/18/movies?api_key="+userService.key+"&language=en-US&sort_by=created_at.asc").success(function(data) {
    $scope.dramaMovies = data;
  });

// family movies
  $http.get(root_url+"genre/10751/movies?api_key="+userService.key+"&language=en-US&sort_by=created_at.asc").success(function(data) {
    $scope.familyMovies = data;
  });

// history movies
  $http.get(root_url+"genre/36/movies?api_key="+userService.key+"&language=en-US&sort_by=created_at.asc").success(function(data) {
    $scope.historyMovies = data;
  });

// horror movies
  $http.get(root_url+"genre/27/movies?api_key="+userService.key+"&language=en-US&sort_by=created_at.asc").success(function(data) {
    $scope.horrorMovies = data;
  });

// music movies
  $http.get(root_url+"genre/10402/movies?api_key="+userService.key+"&language=en-US&sort_by=created_at.asc").success(function(data) {
    $scope.musicMovies = data;
  });

// mystery movies
  $http.get(root_url+"genre/9648/movies?api_key="+userService.key+"&language=en-US&sort_by=created_at.asc").success(function(data) {
    $scope.mysteryMovies = data;
  });

// romance movies
  $http.get(root_url+"genre/10749/movies?api_key="+userService.key+"&language=en-US&sort_by=created_at.asc").success(function(data) {
    $scope.romanceMovies = data;
  });

// sciFi movies
  $http.get(root_url+"genre/878/movies?api_key="+userService.key+"&language=en-US&sort_by=created_at.asc").success(function(data) {
    $scope.sciFiMovies = data;
  });

// tv movies
  $http.get(root_url+"genre/10770/movies?api_key="+userService.key+"&language=en-US&sort_by=created_at.asc").success(function(data) {
    $scope.tvMovies = data;
  });

// thriller movies
  $http.get(root_url+"genre/53/movies?api_key="+userService.key+"&language=en-US&sort_by=created_at.asc").success(function(data) {
    $scope.thrillerMovies = data;
  });

// war movies
  $http.get(root_url+"genre/10752/movies?api_key="+userService.key+"&language=en-US&sort_by=created_at.asc").success(function(data) {
    $scope.warMovies = data;
  });

// western movies
  $http.get(root_url+"genre/37/movies?api_key="+userService.key+"&language=en-US&sort_by=created_at.asc").success(function(data) {
    $scope.westernMovies = data;
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

// Action and Adventure TV


// Popular Stars:
  $http.get(root_url+"person/popular?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.popularPeople = data;
  });

// Popular Stars Page 2:
  $http.get(root_url+"person/popular?api_key="+userService.key+"&language=en-US&page=2").success(function(data) {
    $scope.popularPeople2 = data;
  });

// Popular Stars Page 3:
  $http.get(root_url+"person/popular?api_key="+userService.key+"&language=en-US&page=3").success(function(data) {
    $scope.popularPeople3 = data;
  });

// Popular Stars Page 4:
  $http.get(root_url+"person/popular?api_key="+userService.key+"&language=en-US&page=4").success(function(data) {
    $scope.popularPeople4 = data;
  });

// image path
  $scope.imgPath = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";


// SEARCH
$scope.doSearch = function(){
  $('.search-results-div').show();
  $('.search-results-div').animate({ scrollTop: 0 }, "fast");
  $('.search-results-div').addClass('animated fadeIn');

$scope.search = $('#searchBar').val();
var search = $('#searchBar').val();
$http.get(root_url+"search/multi?api_key="+userService.key+"&language=en-US&query="+$scope.search).success(function(data) {
    $scope.searchResults = data;
    console.log(searchResults);
  });
}

// close search results div
$scope.closeSearch = function(){
  $('.search-results-div').hide();
  // $('.search-results-div').addClass('animated bounceOutUp');
}
}]);

// Movie Controller
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

  //Movie Credits
   $http.get(base_url+winLocation+"/credits?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.movieCredits = data;
  });

//Movie Reviews
  $http.get(base_url+winLocation+"/reviews?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.movieReviews = data;
  });

// Movie Cast
  $http.get(base_url+winLocation+"/credits?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.movieCast = data;
  });

// Check Director
// $scope.checkToggle = function(){
//   var a = 1;
//       if(a > 0){
//         // alert('works');
//         $scope.myBoolean === false;
//       }
//    return $scope.myBoolean;
//  };

// Movie Trailer:
  $http.get(base_url+winLocation+"/videos?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.movieTrailer = data;
    $scope.movieTrailerLink = data.results[0].key;
    var movieTrailerLink = data.results[0].key;
    $scope.linkYoutube = $sce.trustAsResourceUrl('https://www.youtube.com/embed/'+movieTrailerLink);
  });

// Similar Movies
  $http.get(base_url+winLocation+"/similar?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.movieSimilar = data;
    });

// Release Date
  $http.get(base_url+winLocation+"release_dates?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.movieReleaseDate = data;
    });

}]);


// STAR CONTROLLER
app.controller('starController', ['$scope', '$http', '$location', '$sce', 'userService', function($scope, $http, $location, $sce, userService) {

  $scope.winLocation = $location.path();
  var winLocation = $location.path();

// GET END OF URL:
  var value = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

  var root_url = "https://api.themoviedb.org/3/";
  var base_url = "https://api.themoviedb.org/3";

// DETAILS
  $http.get(root_url+"person/"+value+"?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.starDetails = data;
  });

// PHOTOS
  $http.get(root_url+"person/"+value+"/images?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.starPhotos = data;
  });

// CREDITS
  $http.get(root_url+"person/"+value+"/combined_credits?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.starCredits = data;
  });

  // Movie Details
  $http.get(base_url+winLocation+"?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.movieDetails = data;
  });
}]);

// TV CONTROLLER
app.controller('tvController', ['$scope', '$http', '$location', '$sce', 'userService', function($scope, $http, $location, $sce, userService) {

  $scope.winLocation = $location.path();
  var winLocation = $location.path();

// GET END OF URL:
  var value = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
  var root_url = "https://api.themoviedb.org/3/";
  var base_url = "https://api.themoviedb.org/3";

// Details
  $http.get(root_url+"tv/"+value+"?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.tvDetails = data;
  });

// Tv-credits
  $http.get(root_url+"tv/"+value+"/credits?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.tvCredits = data;
  });

// Similar Recomendations
  $http.get(root_url+"tv/"+value+"/similar?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.tvSimilar = data;
  });

// TV Trailer:
  $http.get(base_url+winLocation+"/videos?api_key="+userService.key+"&language=en-US&page=1").success(function(data) {
    $scope.tvTrailer = data;
    $scope.tvTrailerLink = data.results[0].key;
    var tvTrailerLink = data.results[0].key;
    $scope.linkYoutubeTv = $sce.trustAsResourceUrl('https://www.youtube.com/embed/'+tvTrailerLink);
  });
}]);


// NG-ROUTE
app.config(['$locationProvider', '$routeProvider',
 function($location, $routeProvider) {



    $routeProvider
        .when('/', {
          templateUrl : "movie-buddy/work_here/views/home.html",
          controller: 'myCtrl'
        })
        .when("/movies", {
          templateUrl : "movie-buddy/work_here/views/movies.html"
        })
        .when('/movie/:id', {
          templateUrl  : 'movie-buddy/work_here/views/moviePage.html',
          controller: 'movieController'
        })
        .when("/tv", {
          templateUrl : "movie-buddy/work_here/views/tv.html"
        })
        .when('/tv/:id', {
          templateUrl  : 'movie-buddy/work_here/views/tvPage.html',
          controller: 'tvController'
        })
        .when("/stars", {
          templateUrl : "movie-buddy/work_here/views/stars.html"
        })
        .when('/person/:id', {
          templateUrl  : 'movie-buddy/work_here/views/starPage.html',
          controller: 'starController'
        })
        .when('/news', {
          templateUrl  : 'movie-buddy/work_here/views/news.html'
        })
        .otherwise({redirectTo:'movie-buddy/'});
}]);



// LIMIT TEXT LENGTH FILTER
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
