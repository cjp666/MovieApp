describe('Search Controller', function () {
	var $scope;
	var $location;
	var $timeout;

	beforeEach(module('movieApp'));

	beforeEach(inject(function (_$controller_, _$location_, _$timeout_) {
		$scope = {};
		$location = _$location_;
		$timeout = _$timeout_;

		_$controller_('SearchController', {
			$scope: $scope,
			$location: $location,
			$timeout: $timeout
		});
	}));

	it('Should redirect to the query results page for non-empty query', function () {
		$scope.query = 'star wars';
		$scope.search();

		expect($location.url()).toBe('/results?q=star%20wars');
	});

	it('Should not redirect to query results empty query', function () {
		$scope.query = '';
		$scope.search();

		expect($location.url()).toBe('');
	});

	it('should redirect after 1 second of keyboard inactivity', function () {
		$scope.query = 'star wars';
		$scope.keyup();

		$timeout.flush(1000);
		$timeout.verifyNoPendingTasks();

		expect($location.url()).toBe('/results?q=star%20wars');
	});

	it('should cancel timeout in keydown', function () {
		$scope.query = 'star wars';
		$scope.keyup();
		$scope.keydown();
		$timeout.verifyNoPendingTasks();
	});

	it('should cancel timeout on search', function () {
		$scope.query = 'star wars';
		$scope.keyup();
		$scope.search();
		$timeout.verifyNoPendingTasks();
	});
});