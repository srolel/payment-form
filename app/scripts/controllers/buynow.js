'use strict';

/**
 * @ngdoc function
 * @name paymentApp.controller:BuynowCtrl
 * @description
 * # BuynowCtrl
 * Controller of the paymentApp
 */

//TODO: move all of this shit into a directive
angular.module('paymentApp')
	.controller('BuynowCtrl', function ($scope, $document, BuynowService, StateService) {

		$scope.card = '378282246310005';
		$scope.cvc = '2345';
		$scope.expiry = '12/18';
		$scope.fullName = 'S H';
		$scope.email = "wat@wat.wat";

	});