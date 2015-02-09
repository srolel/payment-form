'use strict';

/**
 * @ngdoc service
 * @name paymentApp.KitService
 * @description
 * # KitService
 * Service in the paymentApp.
 */
angular.module('paymentApp')
	.service('KitService', function ($timeout) {
		this.capitalize = function (str) {
			return str.replace(/(?:^|\s)\S/g, function (a) {
				return a.toUpperCase();
			});
		};

		this.deBounce = function (fnc, ms, always) {
			var t;
			return function deBounced() {
				if (always) always();
				var arg = arguments;
				var self = this;
				$timeout.cancel(t);
				t = $timeout(angular.noop, ms);
				return t.then(function () {
					return fnc.apply(self, arg);
				});
			};
		};
	});