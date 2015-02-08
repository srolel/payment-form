'use strict';

/**
 * @ngdoc directive
 * @name paymentFormApp.directive:yearSelect
 * @description
 * # yearSelect
 */
angular.module('paymentApp')
	.directive('yearSelect', function () {
		return {
			template: '<select ng-options="year for year in years"></select>',
			restrict: 'E',
			replace: true,
			link: function postLink(scope, element, attrs) {
				var thisYear = new Date().getFullYear();
				scope.years = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (x) {
					return (thisYear + x).toString();
				})
			}
		};
	});