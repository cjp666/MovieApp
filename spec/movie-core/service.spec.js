describe('MovieCore', function () {
	var PopularMovies;
	var $httpBackend;

	beforeEach(module('movieCore'));

	beforeEach(inject(function (_PopularMovies_, _$httpBackend_) {
			PopularMovies = _PopularMovies_;
			$httpBackend = _$httpBackend_;
		})
	);

	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('should create a popular movie', function () {
		var expectedData = function (data) {
			var result = angular.fromJson(data).movieId === 'tt0076759';
			return result;
		};

		$httpBackend.expectPOST(/./, expectedData)
			.respond(201);

		var popularMovie = new PopularMovies({
			movieId: 'tt0076759',
			description: 'A Great Movie!'
		});

		popularMovie.$save();

		expect($httpBackend.flush).not.toThrow();
	});

	it('should get popular movie by id', function () {
		$httpBackend.expectGET('popular/tt0076759')
			.respond(200);

		PopularMovies.get({ movieId: 'tt0076759' });

		expect($httpBackend.flush).not.toThrow();
	});

	it('should update popular movie', function () {
		$httpBackend.expectPUT('popular')
			.respond(200);

		var popularMovie = new PopularMovies({
			movieId: 'tt0076759',
			description: 'A Great Movie!'
		});

		popularMovie.$update();

		expect($httpBackend.flush).not.toThrow();
	});

	it('should authenticate requests', function() {
		var expectedHeaders = function (headers) {
			var result = angular.fromJson(headers).authToken === 'teddybear';
			return result;
		};

		var matchAny = /.*/;

		$httpBackend.whenGET(matchAny, expectedHeaders)
			.respond(200);

		$httpBackend.expectPOST(matchAny, matchAny, expectedHeaders)
			.respond(200);

		$httpBackend.expectPUT(matchAny, matchAny, expectedHeaders)
			.respond(200);

		$httpBackend.expectDELETE(matchAny, expectedHeaders)
			.respond(200);

		var popularMovie = {
			movieId: 'tt0076759',
			description: 'This is a Great Movie!'
		};

		PopularMovies.query();
		PopularMovies.get({ movieId: 'tt0075769' });

		new PopularMovies(popularMovie).$save();

		new PopularMovies(popularMovie).$update();

		new PopularMovies(popularMovie).$remove();

		$httpBackend.flush(1);
		$httpBackend.flush(1);
		$httpBackend.flush(1);
		$httpBackend.flush(1);
		$httpBackend.flush(1);
	});
});