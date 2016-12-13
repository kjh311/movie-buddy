angular.module("myApp").directive("contentSlider",function(){return function(e,a){e.$last&&a.addClass("active")}});var app=angular.module("myApp",["ngRoute"]);app.controller("myCtrl",["$scope","$http","$location","$sce","userService",function(e,a,t,s,n){e.name="Kevin";var o="https://api.themoviedb.org/3/";e.movieId="https://api.themoviedb.org/3/movie/188927?api_key="+n.key,e.winLocation=t.path();t.path();a.get(o+"movie/188927?api_key="+n.key).success(function(a){e.movieStuff=a}),a.get(o+"movie/now_playing?api_key="+n.key+"&language=en-US&page=1").success(function(a){e.nowPlayingMovies=a}),a.get(o+"movie/top_rated?api_key="+n.key+"&language=en-US&page=1").success(function(a){e.topMovies=a}),a.get(o+"movie/upcoming?api_key="+n.key+"&language=en-US&page=1").success(function(a){e.comingMovies=a}),a.get(o+"genre/28/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(a){e.actionMovies=a}),a.get(o+"genre/12/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(a){e.adventureMovies=a}),a.get(o+"genre/16/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(a){e.animationMovies=a}),a.get(o+"genre/35/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(a){e.comedyMovies=a}),a.get(o+"genre/80/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(a){e.crimeMovies=a}),a.get(o+"genre/99/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(a){e.documentaryMovies=a}),a.get(o+"genre/18/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(a){e.dramaMovies=a}),a.get(o+"genre/10751/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(a){e.familyMovies=a}),a.get(o+"genre/36/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(a){e.historyMovies=a}),a.get(o+"genre/27/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(a){e.horrorMovies=a}),a.get(o+"genre/10402/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(a){e.musicMovies=a}),a.get(o+"genre/9648/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(a){e.mysteryMovies=a}),a.get(o+"genre/10749/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(a){e.romanceMovies=a}),a.get(o+"genre/878/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(a){e.sciFiMovies=a}),a.get(o+"genre/10770/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(a){e.tvMovies=a}),a.get(o+"genre/53/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(a){e.thrillerMovies=a}),a.get(o+"genre/10752/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(a){e.warMovies=a}),a.get(o+"genre/37/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(a){e.westernMovies=a}),a.get(o+"movie/popular?api_key="+n.key+"&language=en-US&page=1").success(function(a){e.popularMovies=a}),a.get(o+"tv/popular?api_key="+n.key+"&language=en-US&page=1").success(function(a){e.popularTv=a}),a.get(o+"tv/on_the_air?api_key="+n.key+"&language=en-US&page=1").success(function(a){e.onAirTv=a}),a.get(o+"tv/airing_today?api_key="+n.key+"&language=en-US&page=1").success(function(a){e.onAirTodayTv=a}),a.get(o+"tv/top_rated?api_key="+n.key+"&language=en-US&page=1").success(function(a){e.topRatedTv=a}),a.get(o+"person/popular?api_key="+n.key+"&language=en-US&page=1").success(function(a){e.popularPeople=a}),a.get(o+"person/popular?api_key="+n.key+"&language=en-US&page=2").success(function(a){e.popularPeople2=a}),a.get(o+"person/popular?api_key="+n.key+"&language=en-US&page=3").success(function(a){e.popularPeople3=a}),a.get(o+"person/popular?api_key="+n.key+"&language=en-US&page=4").success(function(a){e.popularPeople4=a}),e.imgPath="https://image.tmdb.org/t/p/w300_and_h450_bestv2",e.doSearch=function(){$(".search-results-div").show(),$(".search-results-div").animate({scrollTop:0},"fast"),$(".search-results-div").addClass("animated fadeIn"),e.search=$("#searchBar").val();$("#searchBar").val();a.get(o+"search/multi?api_key="+n.key+"&language=en-US&query="+e.search).success(function(a){e.searchResults=a,console.log(searchResults)})},e.closeSearch=function(){$(".search-results-div").hide()}}]),app.controller("movieController",["$scope","$http","$location","$sce","userService",function(e,a,t,s,n){var o="https://api.themoviedb.org/3";e.movieId="https://api.themoviedb.org/3/movie/188927?api_key="+n.key,e.winLocation=t.path();var i=t.path();a.get(o+i+"?api_key="+n.key+"&language=en-US&page=1").success(function(a){e.movieDetails=a}),a.get(o+i+"/credits?api_key="+n.key+"&language=en-US&page=1").success(function(a){e.movieCredits=a}),a.get(o+i+"/reviews?api_key="+n.key+"&language=en-US&page=1").success(function(a){e.movieReviews=a}),a.get(o+i+"/credits?api_key="+n.key+"&language=en-US&page=1").success(function(a){e.movieCast=a}),a.get(o+i+"/videos?api_key="+n.key+"&language=en-US&page=1").success(function(a){e.movieTrailer=a,e.movieTrailerLink=a.results[0].key;var t=a.results[0].key;e.linkYoutube=s.trustAsResourceUrl("https://www.youtube.com/embed/"+t)}),a.get(o+i+"/similar?api_key="+n.key+"&language=en-US&page=1").success(function(a){e.movieSimilar=a}),a.get(o+i+"release_dates?api_key="+n.key+"&language=en-US&page=1").success(function(a){e.movieReleaseDate=a})}]),app.controller("starController",["$scope","$http","$location","$sce","userService",function(e,a,t,s,n){e.winLocation=t.path();var o=t.path(),i=window.location.href.substring(window.location.href.lastIndexOf("/")+1),c="https://api.themoviedb.org/3/",r="https://api.themoviedb.org/3";a.get(c+"person/"+i+"?api_key="+n.key+"&language=en-US&page=1").success(function(a){e.starDetails=a}),a.get(c+"person/"+i+"/images?api_key="+n.key+"&language=en-US&page=1").success(function(a){e.starPhotos=a}),a.get(c+"person/"+i+"/combined_credits?api_key="+n.key+"&language=en-US&page=1").success(function(a){e.starCredits=a}),a.get(r+o+"?api_key="+n.key+"&language=en-US&page=1").success(function(a){e.movieDetails=a})}]),app.controller("tvController",["$scope","$http","$location","$sce","userService",function(e,a,t,s,n){e.winLocation=t.path();var o=t.path(),i=window.location.href.substring(window.location.href.lastIndexOf("/")+1),c="https://api.themoviedb.org/3/",r="https://api.themoviedb.org/3";a.get(c+"tv/"+i+"?api_key="+n.key+"&language=en-US&page=1").success(function(a){e.tvDetails=a}),a.get(c+"tv/"+i+"/credits?api_key="+n.key+"&language=en-US&page=1").success(function(a){e.tvCredits=a}),a.get(c+"tv/"+i+"/similar?api_key="+n.key+"&language=en-US&page=1").success(function(a){e.tvSimilar=a}),a.get(r+o+"/videos?api_key="+n.key+"&language=en-US&page=1").success(function(a){e.tvTrailer=a,e.tvTrailerLink=a.results[0].key;var t=a.results[0].key;e.linkYoutubeTv=s.trustAsResourceUrl("https://www.youtube.com/embed/"+t)})}]),app.config(["$locationProvider","$routeProvider",function(e,a){a.when("/",{templateUrl:"movie-buddy/work_here/views/home.html",controller:"myCtrl"}).when("/movies",{templateUrl:"movie-buddy/work_here/views/movies.html"}).when("/movie/:id",{templateUrl:"movie-buddy/work_here/views/moviePage.html",controller:"movieController"}).when("/tv",{templateUrl:"movie-buddy/work_here/views/tv.html"}).when("/tv/:id",{templateUrl:"movie-buddy/work_here/views/tvPage.html",controller:"tvController"}).when("/stars",{templateUrl:"movie-buddy/work_here/views/stars.html"}).when("/person/:id",{templateUrl:"movie-buddy/work_here/views/starPage.html",controller:"starController"}).when("/news",{templateUrl:"movie-buddy/work_here/views/news.html"}).otherwise({redirectTo:"movie-buddy/"})}]),app.filter("truncate",function(){return function(e,a,t){return isNaN(a)&&(a=10),void 0===t&&(t="..."),e.length<=a||e.length-t.length<=a?e:String(e).substring(0,a-t.length)+t}}),app.factory("userService",[function(){return{key:"567d010127834d2946cbe71933f1639b"}}]),$(document).ready(function(){function e(){var e=$(window).scrollTop();$(".bg").css("top",-(.1*e)+"px"),$(".mg").css("top",-(.5*e)+"px"),$(".fg").css("top",-(1.5*e)+"px"),$(".farMiddleGround").css("top",-(.2*e)+"px")}$(".button-collapse").sideNav({menuWidth:300,edge:"right",closeOnClick:!0,draggable:!0}),$(".parallax").parallax(),$(window).scroll(function(a){e()})});