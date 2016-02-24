describe("Home Controller", function () {
	var results = [
		{
			"Title": "Star Wars: Episode IV - A New Hope",
			"Year": "1997",
			"imdbID": "tt0076759",
			"Type": "movie"
		},
		{
			"Title": "Star Wars: Episode V - The Empire Strikes Back",
			"Year": "1997",
			"imdbID": "tt0080684",
			"Type": "movie"
		},
		{
			"Title": "Star Wars: Episode VI - Return of the Jedi",
			"Year": "1983",
			"imdbID": "tt0086190",
			"Type": "movie"
		}
	];

	var $scope;
	var $controller;
	var $interval;
	var $rootScope;
	var $q;
	var $exceptionHandler;
	var $log;
	var omdbApi;
	var PopularMovies;

	beforeEach(module("movieApp"));

	beforeEach(module(function ($exceptionHandlerProvider) {
		$exceptionHandlerProvider.mode("log");
	}));

	beforeEach(module(function ($logProvider) {
		$logProvider.debugEnabled(true);
	}));

	beforeEach(inject(function (_$q_, _omdbApi_) {
		spyOn(_omdbApi_, "find").and.callFake(function () {
			var deferred = _$q_.defer();
			var args = _omdbApi_.find.calls.mostRecent().args[0];
			if (args === "tt0076759") {
				deferred.resolve(results[0]);
			} else if (args === "tt0080684") {
				deferred.resolve(results[1]);
			} else if (args === "tt0086190") {
				deferred.resolve(results[2]);
			} else if (args === "ttError") {
				deferred.reject("error finding movie");
			} else {
				deferred.reject();
			}

			return deferred.promise;
		});
	}));

	beforeEach(inject(function (_$controller_, _$interval_, _$rootScope_, _$q_, _$exceptionHandler_, _$log_, _omdbApi_, _PopularMovies_) {
		$scope = {};
		$controller = _$controller_;
		$interval = _$interval_;
		$rootScope = _$rootScope_;
		$q = _$q_;
		$exceptionHandler = _$exceptionHandler_;
		$log = _$log_;
		omdbApi = _omdbApi_;
		PopularMovies = _PopularMovies_;
	}));

	it("should rotate movies every 5 seconds", function () {
		spyOn(PopularMovies, "get").and.callFake(function () {
			var deferred = $q.defer();
			deferred.resolve(["tt0076759", "tt0080684", "tt0086190"]);
			return deferred.promise;
		});

		$controller("HomeController", {
			$scope: $scope,
			$interval: $interval,
			$exceptionHandler: $exceptionHandler,
			omdbApi: omdbApi,
			PopularMovies: PopularMovies
		});
		$rootScope.$apply();

		// should have a default movie
		expect($scope.result.Title).toBe(results[0].Title);

		// should update after 5 seconds
		$interval.flush(5000);
		expect($scope.result.Title).toBe(results[1].Title);

		// should update after 5 seconds
		$interval.flush(5000);
		expect($scope.result.Title).toBe(results[2].Title);

		// should return to the default movie
		$interval.flush(5000);
		expect($scope.result.Title).toBe(results[0].Title);
	});

	it("should handle error", function () {
		spyOn(PopularMovies, "get").and.callFake(function () {
			var deferred = $q.defer();
			deferred.resolve(["tt0076759", "tt0080684", "tt0086190", "ttError"]);
			return deferred.promise;
		});

		$controller("HomeController", {
			$scope: $scope,
			$interval: $interval,
			$exceptionHandler: $exceptionHandler,
			omdbApi: omdbApi,
			PopularMovies: PopularMovies
		});
		$rootScope.$apply();

		// should have a default movie
		expect($scope.result.Title).toBe(results[0].Title);

		// should update after 5 seconds
		$interval.flush(5000);
		expect($scope.result.Title).toBe(results[1].Title);

		// should update after 5 seconds
		$interval.flush(5000);
		expect($scope.result.Title).toBe(results[2].Title);

		$interval.flush(5000);

		expect($exceptionHandler.errors).toEqual(["error finding movie"]);
	});
});