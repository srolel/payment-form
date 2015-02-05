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
			link: function postLink(scope, element, attrs) {

				var deRegister = $document.on('click', function (e) {
					scope.dropdownShown = false;
					scope.$apply();
				});

				scope.$on('$destroy', function () {
					deRegister();
				});



			}

		};
	});