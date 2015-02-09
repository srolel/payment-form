'use strict';

/**
 * @ngdoc directive
 * @name paymentApp.directive:trBluesnapInfo
 * @description
 * # trBluesnapInfo
 */
angular.module('paymentApp')
	.directive('trBluesnapInfo', function (BuynowService) {
		return {
			restrict: 'EA',
			controller: function ($scope) {
				this.changePlan = function () {
					var opts = {
						premium: 'ultimate',
						ultimate: 'premium'
					}
					var plan = opts[$scope.selectedPlan.name];
					$scope.selectedPlan = BuynowService.planSelector.search(plan);
				}
			},
			controllerAs: 'infoCtrl',
			link: function postLink(scope, element, attrs) {
				scope.selectedPlan = BuynowService.planSelector.search('premium');
			}
		};
	});