﻿angular.module('movieCore', ['ngResource'])
	.factory('PopularMovies', function ($resource) {
		var token = 'teddybear';
		var result = $resource('popular/:movieId', { movieId: '@id' },
			{
				update: {
					method: 'PUT',
					headers: { 'authToken': token }
				},
				get: {
					method: 'GET',
					headers: { 'authToken': token }
				},
				query: {
					method: 'GET',
					headers: { 'authToken': token }
				},
				save: {
					method: 'POST',
					headers: { 'authToken': token }
				},
				remove: {
					method: 'DELETE',
					headers: { 'authToken': token }
				}
			}
		);
		return result;
});