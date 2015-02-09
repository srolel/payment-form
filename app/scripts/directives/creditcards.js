'use strict';

/**
 * @ngdoc directive
 * @name paymentApp.directive:creditCards
 * @description
 * # creditCards
 */
angular.module('paymentApp')
	.directive('creditCards', function (BuynowService) {
		return {
			restrict: 'A',
			link: function postLink(scope, element, attrs) {

				scope.$watch('type', function () {
					BuynowService.cardSelector.select(scope.type);
				});

				scope.isCardSelected = function (card) {
					if (!scope.type) return true;
					return BuynowService.cardSelector.isSelected(card);
				};

				scope.cards = BuynowService.cardSelector.get();
			}
		};
	});