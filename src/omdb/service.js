angular.module('omdb', [])
	.factory('omdbApi', function ($http, $q) {
		var service = {};
		var baseUrl = 'http://www.omdbapi.com/?v=1&';

		function httpPromise(url) {
			var deferred = $q.defer();
			$http.get(url)
				.success(function (data) {
					deferred.resolve(data);
				})
				.error(function () {
					deferred.reject();
				});
			return deferred.promise;
		}

		service.search = function (query) {
			var result = httpPromise(baseUrl + 's=' + encodeURIComponent(query));
			return result;
		}

		service.find = function (id) {
			var result = httpPromise(baseUrl + 'i=' + encodeURIComponent(id));
			return result;
		}

		return service;
	});