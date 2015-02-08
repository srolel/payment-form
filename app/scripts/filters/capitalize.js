'use strict';

/**
 * @ngdoc filter
 * @name paymentApp.filter:capitalize
 * @function
 * @description
 * # capitalize
 * Filter in the paymentApp.
 */
angular.module('paymentApp')
	.filter('capitalize', function (KitService) {
		return function (input) {
			return KitService.capitalize(input);
		};
	});