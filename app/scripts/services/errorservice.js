'use strict';

/**
 * @ngdoc service
 * @name paymentApp.errorService
 * @description
 * # errorService
 * Service in the paymentApp.
 */
angular.module('paymentApp')
	.service('errorService', function ($log) {

		this.throwingEnabled = false;

		this.enableThrowing = function () {
			this.throwingEnabled = true;
		}

		this.disableThrowing = function () {
			this.throwingEnabled = false;
		}

		this.error = function error(type, message) {
			message = message || '';
			if (this.throwingEnabled && angular.isFunction(type)) {
				throw new type(message);
			} else {
				var errorTypeName = (type && (typeof type === 'string' ? type : type.name)) || 'Error';
				$log.error(errorTypeName, message);
			}
		}

		this.typeError = function (message) {
			this.error(TypeError, message);
		}

		this.warn = function (message) {
			$log.warn(message);
		}
	});