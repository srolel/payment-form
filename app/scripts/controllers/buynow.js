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
		var country = StateService.getCookie('country');
		$scope.selectedCountry = BuynowService.getCountry(country, 'obj');

		$scope.selectCountry = function selectCountry(country) {
			$scope.selectedCountry = country;
		};

		$scope.isCountrySelected = function isSelected(country) {
			return $scope.selectedCountry === country;
		};

		$scope.isCardSelected = function isSelected(card) {
			return !$scope.type || $scope.type === card;
		};

		$scope.toggleDropdown = function toggleDropdown(e) {
			e.stopPropagation();
			$scope.dropdownShown = !$scope.dropdownShown;
		};

		function getCountries(search) {
		 	$scope.countries = BuynowService.getCountries(search);
		}

		$scope.cards = BuynowService.getCards();

		$scope.$watch('countryFilter', getCountries);

		$scope.filterCountries = function filterCountries(actual, expected) {
			return BuynowService.getCountry(expected) === actual;
		}

		$scope.card = '378282246310005';
		$scope.cvc = '2345';
		$scope.expiry = '12/18';
		$scope.fullName = 'S H';
		$scope.email = "wat@wat.wat";


	});