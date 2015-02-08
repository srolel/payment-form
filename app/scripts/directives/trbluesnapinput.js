'use strict';

/**
 * @ngdoc directive
 * @name paymentApp.directive:trBluesnapInput
 * @description
 * # trBluesnapInput
 */
angular.module('paymentApp')
	.directive('trBluesnapInput', function (BlueSnap) {
		return {
			templateUrl: 'views/trbluesnapinput.html',
			restrict: 'E',
			replace: true,
			require: '^trBluesnapForm',
			scope: {
				isEncrypted: '=',
				model: '=ngModel',
				name: '@ngModel',
				typeModel: '=',
				type: '@'
			},
			link: function (scope, element, attrs, formCtrl) {

				if (scope.isEncrypted) {
					element.find('input').attr('data-bluesnap', BlueSnap.getEncryptedName(scope.name))
				}

				scope.type = scope.type || 'text';

				scope.input = formCtrl.getForm()[scope.name];
			}
		};
	});