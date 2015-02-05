'use strict';

/**
 * @ngdoc directive
 * @name paymentApp.directive:trBluesnap
 * @description
 * # trBluesnap
 */
angular.module('paymentApp')
	.directive('trBluesnapForm', function (BlueSnap) {
		return {
			restrict: 'A',
			controller: function ($scope, $element) {

				this.getForm = function getForm() {
					return $scope[$element.attr('name')];
				}
			},
			link: function postLink(scope, element, attrs) {

				var formId = element.attr('id');
				BlueSnap.init(formId);

				scope.submit = function submit() {

				}

				scope.$watch('fullName', function (val) {
					if (!val) return;
					var names = val.split(' ');
					scope.firstName = names[0];
					scope.lastName = names[0];
				})

				scope.$watch('number', function (val) {
					if (!val) return;
				})
			}
		};
	});