'use strict';

/**
 * @ngdoc directive
 * @name paymentApp.directive:countryDropdown
 * @description
 * # countryDropdown
 */
angular.module('paymentApp')
	.directive('countryDropdown', function () {
		return {
			restrict: 'A',
			link: function postLink(scope, element, attrs) {

			},
			controller: function ($scope, $element, $document, $timeout, BuynowService, StateService) {

				var dropdownShown = false;

				var searchInputEl = $element.find('input');

				this.toggleDropdown = function toggleDropdown(e) {
					e.stopPropagation();
					dropdownShown = !dropdownShown;
					$timeout(function () {
						searchInputEl[0].focus();
					});
				};

				this.isDropdownShown = function isDropdownShown() {
					return dropdownShown;
				}

				var deRegister = $document.on('click', function (e) {
					dropdownShown = false;
					$scope.$apply();
				});

				$scope.$on('$destroy', function () {
					deRegister();
				});

				function getCountries(search) {
					$scope.countries = search ? BuynowService.countrySelector.search(search) : BuynowService.countrySelector.get();
				}

				$scope.$watch('countryFilter', getCountries);

				$scope.filterCountries = function filterCountries(actual, expected) {
					return BuynowService.countrySelector.search(expected) === actual;
				};

				var country = StateService.getCookie('country');

				$scope.selectedCountry = BuynowService.getCountry(country, 'obj');

				$scope.selectCountry = function selectCountry(country) {
					$scope.selectedCountry = country;
				};

				$scope.isCountrySelected = function isSelected(country) {
					return $scope.selectedCountry === country;
				};

			},
			controllerAs: 'countryDropdownCtrl'
		};
	});