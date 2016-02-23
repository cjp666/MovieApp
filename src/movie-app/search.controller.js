angular.module("movieApp")
	.controller("SearchController", function ($scope, $location, $timeout) {
		$scope.keyup = keyup;
		$scope.keydown = keydown;
		$scope.search = search;

		var timeout;

		function keyup() {
			timeout = $timeout(search, 1000);
		}

		function keydown() {
			$timeout.cancel(timeout);
		}

		function search() {
			$timeout.cancel(timeout);
			if ($scope.query) {
				$location.path("/results").search("q", $scope.query);
			}
		}
	});