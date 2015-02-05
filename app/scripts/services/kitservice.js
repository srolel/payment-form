'use strict';

/**
 * @ngdoc service
 * @name paymentApp.KitService
 * @description
 * # KitService
 * Service in the paymentApp.
 */
angular.module('paymentApp')
	.service('KitService', function () {
		this.capitalize = function (str) {
			return str.replace(/(?:^|\s)\S/g, function (a) {
				return a.toUpperCase();
			});
		};
	});