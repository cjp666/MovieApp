angular.module('movieApp')
	.controller('ResultsController', function ($scope, $location, omdbApi) {
		var query = $location.search().q;
		omdbApi.search(query)
			.then(function (data) {
				$scope.results = data.Search;
			})
			.catch(function () {
				$scope.errorMessages = 'Something went wrong!';
			});

		$scope.expand = function (index, id) {
			omdbApi.find(id)
				.then(function (data) {
					$scope.results[index].data = data;
					$scope.results[index].open = true;
			});
		}
});