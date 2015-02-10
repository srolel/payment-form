'use strict';

/**
 * @ngdoc directive
 * @name paymentApp.directive:formInput
 * @description
 * # formInput
 */
angular.module('paymentApp')
	.directive('formInput', function ($compile, BlueSnap) {
		return {
			restrict: 'A',
			require: '^trBluesnapForm',
			scope: {},
			link: function (scope, elm, attrs, formCtrl) {
				var input = formCtrl.getForm()[attrs.name];
				var errorEls = $compile('<div ng-show="error" class="input-feedback feedback-' + attrs.name + '">{{error}}</div>')(scope);
				elm.after(errorEls);
				var validityEls = $compile('<span ng-show="valid" class="checkmark"></span><span ng-show="!valid" class="exclmark"></span>')(scope);
				elm.after(validityEls);

				scope.valid = input.$valid;

				elm.on('blur', function () {
					scope.valid = input.$valid;
					scope.error = BlueSnap.getErrorMsg(input);
					scope.$apply();
				});
			}
		};
	});