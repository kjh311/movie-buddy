var app=angular.module("myApp",[]);app.controller("myCtrl",["$scope","$http","userService",function(e,p,a){e.name="Kevin";var o="https://api.themoviedb.org/3/";e.movieId="https://api.themoviedb.org/3/movie/188927?api_key="+a.key,p.get(o+"movie/188927?api_key="+a.key).success(function(p){e.movieStuff=p}),p.get(o+"movie/popular?api_key="+a.key+"&language=en-US&page=1"+a.key).success(function(p){e.popularMovies=p}),p.get(o+"tv/popular?api_key="+a.key+"&language=en-US&page=1"+a.key).success(function(p){e.popularTv=p}),p.get(o+"person/popular?api_key="+a.key+"&language=en-US&page=1"+a.key).success(function(p){e.popularPeople=p}),e.imgPath="https://image.tmdb.org/t/p/w300_and_h450_bestv2"}]),app.factory("userService",[function(){return{key:"567d010127834d2946cbe71933f1639b"}}]),$(document).ready(function(){$(".carousel").carousel()});