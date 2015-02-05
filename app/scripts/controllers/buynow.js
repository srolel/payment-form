'use strict';

/**
 * @ngdoc function
 * @name paymentApp.controller:BuynowCtrl
 * @description
 * # BuynowCtrl
 * Controller of the paymentApp
 */
angular.module('paymentApp')
	.controller('BuynowCtrl', function ($scope, $document, BuynowService, StateService) {
		$scope.countries = BuynowService.getAllCountries();
		var country = StateService.getCookie('country');
		$scope.selectedCountry = BuynowService.getCountry(country, 'obj');

		window.scope = $scope;

		$scope.selectCountry = function selectCountry(country) {
			$scope.selectedCountry = country;
		};

		$scope.isCountrySelected = function isSelected(country) {
			return $scope.selectedCountry === country;
		};

		$scope.isCardSelected = function isSelected(card) {
			return !$scope.type || $scope.type === card;
		};

		$scope.toggleDropdown = function toggleDropdown(val, e) {
			e.stopPropagation();
			$scope.dropdownShown = val;
		};

		$scope.cards = BuynowService.getCards();



	});