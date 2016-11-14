var app=angular.module("myApp",["ngRoute"]);app.controller("myCtrl",["$scope","$http","$location","$sce","userService",function(e,t,a,s,n){e.name="Kevin";var i="https://api.themoviedb.org/3/";e.movieId="https://api.themoviedb.org/3/movie/188927?api_key="+n.key,e.winLocation=a.path();a.path();t.get(i+"movie/188927?api_key="+n.key).success(function(t){e.movieStuff=t}),t.get(i+"movie/now_playing?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.nowPlayingMovies=t}),t.get(i+"movie/top_rated?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.topMovies=t}),t.get(i+"movie/upcoming?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.comingMovies=t}),t.get(i+"genre/28/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(t){e.actionMovies=t}),t.get(i+"genre/12/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(t){e.adventureMovies=t}),t.get(i+"genre/16/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(t){e.animationMovies=t}),t.get(i+"genre/35/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(t){e.comedyMovies=t}),t.get(i+"genre/80/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(t){e.crimeMovies=t}),t.get(i+"genre/99/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(t){e.documentaryMovies=t}),t.get(i+"genre/18/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(t){e.dramaMovies=t}),t.get(i+"genre/10751/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(t){e.familyMovies=t}),t.get(i+"genre/36/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(t){e.historyMovies=t}),t.get(i+"genre/27/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(t){e.horrorMovies=t}),t.get(i+"genre/10402/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(t){e.musicMovies=t}),t.get(i+"genre/9648/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(t){e.mysteryMovies=t}),t.get(i+"genre/10749/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(t){e.romanceMovies=t}),t.get(i+"genre/878/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(t){e.sciFiMovies=t}),t.get(i+"genre/10770/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(t){e.tvMovies=t}),t.get(i+"genre/53/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(t){e.thrillerMovies=t}),t.get(i+"genre/10752/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(t){e.warMovies=t}),t.get(i+"genre/37/movies?api_key="+n.key+"&language=en-US&sort_by=created_at.asc").success(function(t){e.westernMovies=t}),t.get(i+"movie/popular?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.popularMovies=t}),t.get(i+"tv/popular?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.popularTv=t}),t.get(i+"tv/on_the_air?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.onAirTv=t}),t.get(i+"tv/airing_today?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.onAirTodayTv=t}),t.get(i+"tv/top_rated?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.topRatedTv=t}),t.get(i+"person/popular?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.popularPeople=t}),t.get(i+"person/popular?api_key="+n.key+"&language=en-US&page=2").success(function(t){e.popularPeople2=t}),e.imgPath="https://image.tmdb.org/t/p/w300_and_h450_bestv2",e.doSearch=function(){$(".search-results-div").show(),$(".search-results-div").animate({scrollTop:0},"fast"),$(".search-results-div").addClass("animated fadeIn"),e.search=$("#searchBar").val();$("#searchBar").val();t.get(i+"search/multi?api_key="+n.key+"&language=en-US&query="+e.search).success(function(t){e.searchResults=t,console.log(searchResults)})},e.closeSearch=function(){$(".search-results-div").hide()}}]),app.controller("movieController",["$scope","$http","$location","$sce","userService",function(e,t,a,s,n){var i="https://api.themoviedb.org/3";e.movieId="https://api.themoviedb.org/3/movie/188927?api_key="+n.key,e.winLocation=a.path();var o=a.path();t.get(i+o+"?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.movieDetails=t}),t.get(i+o+"/credits?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.movieCredits=t}),t.get(i+o+"/reviews?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.movieReviews=t}),t.get(i+o+"/credits?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.movieCast=t}),t.get(i+o+"/videos?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.movieTrailer=t,e.movieTrailerLink=t.results[0].key;var a=t.results[0].key;e.linkYoutube=s.trustAsResourceUrl("http://www.youtube.com/embed/"+a)}),t.get(i+o+"/similar?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.movieSimilar=t}),t.get(i+o+"release_dates?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.movieReleaseDate=t})}]),app.controller("starController",["$scope","$http","$location","$sce","userService",function(e,t,a,s,n){e.winLocation=a.path();var i=a.path(),o=window.location.href.substring(window.location.href.lastIndexOf("/")+1),r="https://api.themoviedb.org/3/",c="https://api.themoviedb.org/3";t.get(r+"person/"+o+"?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.starDetails=t}),t.get(r+"person/"+o+"/images?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.starPhotos=t}),t.get(r+"person/"+o+"/combined_credits?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.starCredits=t}),t.get(c+i+"?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.movieDetails=t})}]),app.controller("tvController",["$scope","$http","$location","$sce","userService",function(e,t,a,s,n){e.winLocation=a.path();var i=a.path(),o=window.location.href.substring(window.location.href.lastIndexOf("/")+1),r="https://api.themoviedb.org/3/",c="https://api.themoviedb.org/3";t.get(r+"tv/"+o+"?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.tvDetails=t}),t.get(r+"tv/"+o+"/credits?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.tvCredits=t}),t.get(r+"tv/"+o+"/similar?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.tvSimilar=t}),t.get(c+i+"/videos?api_key="+n.key+"&language=en-US&page=1").success(function(t){e.tvTrailer=t,e.tvTrailerLink=t.results[0].key;var a=t.results[0].key;e.linkYoutubeTv=s.trustAsResourceUrl("http://www.youtube.com/embed/"+a)})}]),app.config(["$locationProvider","$routeProvider",function(e,t){t.when("/",{templateUrl:"movie-buddy/work_here/views/home.html",controller:"myCtrl"}).when("/movies",{templateUrl:"movie-buddy/work_here/views/movies.html"}).when("/movie/:id",{templateUrl:"/work_here/views/moviePage.html",controller:"movieController"}).when("/tv",{templateUrl:"/work_here/views/tv.html"}).when("/tv/:id",{templateUrl:"/work_here/views/tvPage.html",controller:"tvController"}).when("/stars",{templateUrl:"/work_here/views/stars.html"}).when("/person/:id",{templateUrl:"/work_here/views/starPage.html",controller:"starController"}).when("/news",{templateUrl:"/work_here/views/news.html"}).otherwise({redirectTo:"/"})}]),app.filter("truncate",function(){return function(e,t,a){return isNaN(t)&&(t=10),void 0===a&&(a="..."),e.length<=t||e.length-a.length<=t?e:String(e).substring(0,t-a.length)+a}}),app.factory("userService",[function(){return{key:"567d010127834d2946cbe71933f1639b"}}]),$(document).ready(function(){$(".movie-link").click(function(){$(".movie-link").addClass("white"),$(".star-link").removeClass("white"),$(".tv-link").removeClass("white"),$(".news-link").removeClass("white")}),$(".star-link").click(function(){$(".star-link").addClass("white"),$(".movie-link").removeClass("white"),$(".tv-link").removeClass("white"),$(".news-link").removeClass("white")}),$(".tv-link").click(function(){$(".tv-link").addClass("white"),$(".star-link").removeClass("white"),$(".movie-link").removeClass("white"),$(".news-link").removeClass("white")}),$(".news-link").click(function(){$(".news-link").addClass("white"),$(".tv-link").removeClass("white"),$(".star-link").removeClass("white"),$(".movie-link").removeClass("white")}),$(".button-collapse").sideNav({menuWidth:300,edge:"left",closeOnClick:!0,draggable:!0})});