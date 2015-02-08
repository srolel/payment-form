'use strict';

/**
 * @ngdoc directive
 * @name paymentApp.directive:paymentOptions
 * @description
 * # paymentOptions
 */
angular.module('paymentApp')
	.directive('paymentOptions', function (BuynowService) {
		return {
			restrict: 'AE',
			link: function postLink(scope, element, attrs) {
				scope.paymentOpts = BuynowService.getPaymentOpts();

				scope.isPaymentSelected = BuynowService.isPaymentSelected;
				scope.selectPayment = BuynowService.selectPayment;
			}
		};
	});