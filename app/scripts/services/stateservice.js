'use strict';

/**
 * @ngdoc service
 * @name paymentApp.StateService
 * @description
 * # StateService
 * Service in the paymentApp.
 */
angular.module('paymentApp')
	.service('StateService', function (BuynowService) {
		return {
			getCookie: function () {
				return 'Israel';
			}
		}
	});