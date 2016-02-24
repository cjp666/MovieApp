angular.module('movieApp')
	.controller('HomeController', function ($scope, $interval, $exceptionHandler, $log, omdbApi, PopularMovies) {
		var results = [];
		var index = 0;
		var findMovie = function (id) {
			omdbApi.find(id)
				.then(function (data) {
					$scope.result = data;
				})
				.catch(function (e) {
					$exceptionHandler(e);
				});
		};

		PopularMovies.query(function (data) {
			results = data;
			findMovie(results[0]);
			$interval(function () {
				++index;
				findMovie(results[index % results.length]);
			}, 5000);
		});
});