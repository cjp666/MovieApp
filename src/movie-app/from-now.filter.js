angular.module('movieApp')
	.filter('fromNow', function () {
		var filter = function (value, baseDate) {
			if (!value) {
				throw 'date value cannot be undefined';
			}

			var date = value;

			if (typeof(value) === 'string') {
				date = new Date(date);
			}

			if (isNaN(date.getTime())) {
				return value;
			}

			var YEARS_IN_MS = 60 * 60 * 24 * 365;
			var MONTHS_IN_MS = 60 * 60 * 24 * 30;
			var now = baseDate || new Date();
			var dateDiff = (now.getTime() - date.getTime()) / 1000;
			var tzDiff = (now.getTimezoneOffset() - date.getTimezoneOffset()) * 60;
			var differenceInMs = dateDiff + tzDiff;

			var yearsDifference = differenceInMs / YEARS_IN_MS;
			var monthsDifference = differenceInMs / MONTHS_IN_MS;

			var result;

			if (yearsDifference > 1) {
				yearsDifference = Math.floor(yearsDifference);
				result = yearsDifference + ' year' + (yearsDifference === 1 ? '' : 's') + ' ago';
			} else {
				monthsDifference = Math.floor(monthsDifference);
				result = monthsDifference + ' month' + (monthsDifference === 1 ? '' : 's') + ' ago';
			}
			return result;
		};

		return filter;
});