'use strict';

/**
 * @ngdoc directive
 * @name paymentApp.directive:trBluesnapInput
 * @description
 * # trBluesnapInput
 */
angular.module('paymentApp')
	.directive('trBluesnapInput', function (KitService) {
		return {
			templateUrl: 'views/trbluesnapinput.html',
			restrict: 'E',
			replace: true,
			require: '^trBluesnapForm',
			scope: {
				isEncrypted: '=',
				model: '=ngModel',
				name: '@ngModel',
				typeModel: '='
			},
			link: function (scope, element, attrs, formCtrl) {

				if (scope.isEncrypted) {
					element.find('input').attr('data-bluesnap', getEncryptedName(scope.name))
				}

				scope.input = formCtrl.getForm()[scope.name];

				function getEncryptedName(name) {
					return 'encrypted' + KitService.capitalize(name);
				}

			}
		};
	});