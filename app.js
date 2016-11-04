var app=angular.module("myApp",["ngRoute"]);app.controller("myCtrl",["$scope","$http","$location","$sce","userService",function(e,t,o,a,n){e.name="Kevin";var i="https://api.themoviedb.org/3/";e.movieId="https://api.themoviedb.org/3/movie/188927?api_key="+n.key,e.winLocation=o.path();o.path();t.get(i+"movie/188927?api_key="+n.key).success(function(t){e.movieStuff=t}),t.get(i+"movie/now_playing?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.nowPlayingMovies=t}),t.get(i+"movie/top_rated?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.topMovies=t}),t.get(i+"movie/upcoming?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.comingMovies=t}),t.get(i+"genre/28/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(t){e.actionMovies=t}),t.get(i+"movie/popular?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.popularMovies=t}),t.get(i+"tv/popular?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.popularTv=t}),t.get(i+"tv/on_the_air?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.onAirTv=t}),t.get(i+"tv/airing_today?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.onAirTodayTv=t}),t.get(i+"tv/top_rated?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.topRatedTv=t}),t.get(i+"person/popular?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.popularPeople=t}),e.imgPath="https://image.tmdb.org/t/p/w300_and_h450_bestv2"}]),app.controller("movieController",["$scope","$http","$location","$sce","userService",function(e,t,o,a,n){var i="https://api.themoviedb.org/3";e.movieId="https://api.themoviedb.org/3/movie/188927?api_key="+n.key,e.winLocation=o.path();var r=o.path();t.get(i+r+"?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.movieDetails=t}),t.get(i+r+"/reviews?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.movieReviews=t}),t.get(i+r+"/credits?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.movieCast=t}),t.get(i+r+"/videos?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.movieTrailer=t,e.youtube="https://www.youtube.com/embed/"})}]),app.controller("starController",["$scope","$http","$location","$sce","userService",function(e,t,o,a,n){e.winLocation=o.path();var i=(o.path(),window.location.href.substring(window.location.href.lastIndexOf("/")+1)),r="https://api.themoviedb.org/3/";t.get(r+"person/"+i+"?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.starDetails=t})}]),app.config(["$locationProvider","$routeProvider",function(e,t){t.when("/",{templateUrl:"/work_here/views/home.html",controller:"myCtrl"}).when("/movies",{templateUrl:"/work_here/views/movies.html"}).when("/movie/:id",{templateUrl:"/work_here/views/moviePage.html",controller:"movieController"}).when("/tv",{templateUrl:"/work_here/views/tv.html"}).when("/stars",{templateUrl:"/work_here/views/stars.html"}).when("/star/:id",{templateUrl:"/work_here/views/starPage.html",controller:"starController"}).otherwise({redirectTo:"/"})}]),app.filter("truncate",function(){return function(e,t,o){return isNaN(t)&&(t=10),void 0===o&&(o="..."),e.length<=t||e.length-o.length<=t?e:String(e).substring(0,t-o.length)+o}}),app.factory("userService",[function(){return{key:"567d010127834d2946cbe71933f1639b"}}]),$(document).ready(function(){$(".carousel").carousel(),$(".materialboxed").materialbox()});