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
		$scope.countries = BuynowService.getCountries();
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

		$scope.toggleDropdown = function toggleDropdown(e) {
			e.stopPropagation();
			$scope.dropdownShown = !$scope.dropdownShown;
		};

		$scope.cards = BuynowService.getCards();

		$scope.filterCountries = function filterCountries(actual, expected) {
			console.log('wat')
			return BuynowService.getCountry(expected) === actual;
		}



	});