'use strict';

/**
 * @ngdoc directive
 * @name paymentFormApp.directive:monthSelect
 * @description
 * # monthSelect
 */
angular.module('paymentApp')
	.directive('monthSelect', function () {
		return {
			template: '<select ng-options="month for month in months"></select>',
			restrict: 'E',
			replace: true,
			link: function postLink(scope, element, attrs) {
				scope.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(function (x) {
					return ("0" + x).slice(-2);
				})
			}
		};
	});