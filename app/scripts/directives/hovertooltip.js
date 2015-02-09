'use strict';

/**
 * @ngdoc directive
 * @name paymentApp.directive:hoverTooltip
 * @description
 * # hoverTooltip
 */
angular.module('paymentApp')
	.directive('hoverTooltip', function () {
		return {
			templateUrl: 'views/hover-tooltip.html',
			restrict: 'AE',
			scope: {
				title: '@',

			},
			transclude: true,
			controller: function ($scope, $timeout) {
				var to;
				this.showTooltip = function showTooltip() {
					$scope.isShown = true;
					$timeout.cancel(to);
				};
				this.hideTooltip = function hideTooltip() {
					to = $timeout(function () {
						$scope.isShown = false;
					}, 200);
				};
			},
			controllerAs: 'Ctrl'
		};
	});