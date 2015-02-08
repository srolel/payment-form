'use strict';

/**
 * @ngdoc directive
 * @name paymentApp.directive:trBuynow
 * @description
 * # trBuynow
 */
angular.module('paymentApp')
	.directive('trBuynow', function ($document) {
		return {
			templateUrl: 'views/buynow.html',
			restrict: 'E',
			controller: 'BuynowCtrl',
			controllerAs: 'BuynowCtrl',
			link: function postLink(scope, element, attrs) {



			}

		};
	});