var app=angular.module("myApp",["ngRoute"]);app.controller("myCtrl",["$scope","$http","$location","$sce","userService",function(e,t,a,i,o){e.name="Kevin";var n="https://api.themoviedb.org/3/";e.movieId="https://api.themoviedb.org/3/movie/188927?api_key="+o.key,e.winLocation=a.path();a.path();t.get(n+"movie/188927?api_key="+o.key).success(function(t){e.movieStuff=t}),t.get(n+"movie/now_playing?api_key="+o.key+"&language=en-US&page=1").success(function(t){e.nowPlayingMovies=t}),t.get(n+"movie/top_rated?api_key="+o.key+"&language=en-US&page=1").success(function(t){e.topMovies=t}),t.get(n+"movie/upcoming?api_key="+o.key+"&language=en-US&page=1").success(function(t){e.comingMovies=t}),t.get(n+"genre/28/movies?api_key="+o.key+"&language=en-US&sort_by=created_at.asc").success(function(t){e.actionMovies=t}),t.get(n+"movie/popular?api_key="+o.key+"&language=en-US&page=1").success(function(t){e.popularMovies=t}),t.get(n+"tv/popular?api_key="+o.key+"&language=en-US&page=1").success(function(t){e.popularTv=t}),t.get(n+"tv/on_the_air?api_key="+o.key+"&language=en-US&page=1").success(function(t){e.onAirTv=t}),t.get(n+"tv/airing_today?api_key="+o.key+"&language=en-US&page=1").success(function(t){e.onAirTodayTv=t}),t.get(n+"tv/top_rated?api_key="+o.key+"&language=en-US&page=1").success(function(t){e.topRatedTv=t}),t.get(n+"person/popular?api_key="+o.key+"&language=en-US&page=1").success(function(t){e.popularPeople=t}),e.imgPath="https://image.tmdb.org/t/p/w300_and_h450_bestv2"}]),app.controller("movieController",["$scope","$http","$location","$sce","userService",function(e,t,a,i,o){var n="https://api.themoviedb.org/3";e.movieId="https://api.themoviedb.org/3/movie/188927?api_key="+o.key,e.winLocation=a.path();var s=a.path();t.get(n+s+"?api_key="+o.key+"&language=en-US&page=1").success(function(t){e.movieDetails=t}),t.get(n+s+"/reviews?api_key="+o.key+"&language=en-US&page=1").success(function(t){e.movieReviews=t}),t.get(n+s+"/credits?api_key="+o.key+"&language=en-US&page=1").success(function(t){e.movieCast=t}),t.get(n+s+"/videos?api_key="+o.key+"&language=en-US&page=1").success(function(t){e.movieTrailer=t,e.youtube="https://www.youtube.com/embed/"})}]),app.controller("starController",["$scope","$http","$location","$sce","userService",function(e,t,a,i,o){e.winLocation=a.path();var n=(a.path(),window.location.href.substring(window.location.href.lastIndexOf("/")+1)),s="https://api.themoviedb.org/3/";t.get(s+"person/"+n+"?api_key="+o.key+"&language=en-US&page=1").success(function(t){e.starDetails=t}),t.get(s+"person/"+n+"/images?api_key="+o.key+"&language=en-US&page=1").success(function(t){e.starPhotos=t}),t.get(s+"person/"+n+"/combined_credits?api_key="+o.key+"&language=en-US&page=1").success(function(t){e.starCredits=t})}]),app.config(["$locationProvider","$routeProvider",function(e,t){t.when("/",{templateUrl:"/work_here/views/home.html",controller:"myCtrl"}).when("/movies",{templateUrl:"/work_here/views/movies.html"}).when("/movie/:id",{templateUrl:"/work_here/views/moviePage.html",controller:"movieController"}).when("/tv",{templateUrl:"/work_here/views/tv.html"}).when("/stars",{templateUrl:"/work_here/views/stars.html"}).when("/star/:id",{templateUrl:"/work_here/views/starPage.html",controller:"starController"}).otherwise({redirectTo:"/"})}]),app.filter("truncate",function(){return function(e,t,a){return isNaN(t)&&(t=10),void 0===a&&(a="..."),e.length<=t||e.length-a.length<=t?e:String(e).substring(0,t-a.length)+a}}),app.factory("userService",[function(){return{key:"567d010127834d2946cbe71933f1639b"}}]),$(document).ready(function(){$(".carousel").carousel(),$(".materialboxed").materialbox(),$(".movie-link").click(function(){$(".movie-link").addClass("white"),$(".star-link").removeClass("white"),$(".tv-link").removeClass("white")}),$(".star-link").click(function(){$(".star-link").addClass("white"),$(".movie-link").removeClass("white"),$(".tv-link").removeClass("white")}),$(".tv-link").click(function(){$(".tv-link").addClass("white"),$(".star-link").removeClass("white"),$(".movie-link").removeClass("white")})});