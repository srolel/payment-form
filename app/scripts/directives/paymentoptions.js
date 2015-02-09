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
				scope.paymentOpts = BuynowService.paymentSelector.get();
				scope.isPaymentSelected = function (arg) {
					return BuynowService.paymentSelector.isSelected(arg);
				}
				scope.selectPayment = function (arg) {
					BuynowService.paymentSelector.select(arg);
				}
			}
		};
	});