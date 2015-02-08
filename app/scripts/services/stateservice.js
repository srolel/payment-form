'use strict';

/**
 * @ngdoc service
 * @name paymentApp.StateService
 * @description
 * # StateService
 * Service in the paymentApp.
 */
angular.module('paymentApp')
	.service('StateService', function () {
		return {
			getCookie: function () {
				return 'Canada';
			}
		}
	});