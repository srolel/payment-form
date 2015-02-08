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
				scope.isCardSelected = function isSelected(card) {
					return !scope.type || scope.type === card;
				};

				scope.cards = BuynowService.getCards();
			}
		};
	});