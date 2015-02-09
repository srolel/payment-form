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
					if (e && e.stopPropagation) e.stopPropagation();
					dropdownShown = !dropdownShown;
					$timeout(function () {
						if (dropdownShown) {
							markCountry(BuynowService.countrySelector.indexOf($scope.selectedCountry));
							searchInputEl[0].focus();
						}
					});
				};

				this.isDropdownShown = function isDropdownShown() {
					return dropdownShown;
				}

				var deRegisters = [];

				deRegisters.push($document.on('click', function (e) {
					dropdownShown = false;
					$scope.$apply();
				}));

				deRegisters.push($document.on('keydown', function (e) {
					if (e.keyCode === 27) {
						dropdownShown = false;
						$scope.$apply();
					}
				}));



				$scope.$on('$destroy', function () {
					deRegisters.forEach(function (fn) {
						fn();
					});
				});

				function getCountries(search) {
					markCountry(0);
					$scope.countries = search ? BuynowService.countrySelector.search(search, 'obj', true) : BuynowService.countrySelector.get();
				}

				$scope.$watch('countryFilter', getCountries);

				var country = StateService.getCookie('country');

				$scope.selectedCountry = BuynowService.countrySelector.search(country, 'obj');

				BuynowService.countrySelector.select($scope.selectedCountry);

				this.selectCountry = function (country) {
					$scope.selectedCountry = BuynowService.countrySelector.select(country);
					this.toggleDropdown();
				};

				this.isCountrySelected = function (country) {
					return BuynowService.countrySelector.isSelected(country);
				};

				var markedCountry;

				deRegisters.push($element.find('input').on('keydown', function (e) {
					var incr = {
						38: -1,
						40: 1,
					}[e.keyCode] || 0;
					changeMarkedCountryBy(incr);
					$scope.$apply();
				}));

				var scrollEl = $element.find('ul');

				var scrollElChildHeight = 22; //hard-coded ftmfw

				var topOffset = 2; //How many elements to show before marked one in the lists

				var markCountry = function (index) {
					markedCountry = index;
					scrollEl[0].scrollTop = (index - topOffset) * scrollElChildHeight;
					if (markedCountry < 0) markedCountry = 0;
					if ($scope.countries && markedCountry > $scope.countries.length - 1) markedCountry = $scope.countries.length - 1;
				}

				var changeMarkedCountryBy = function (change) {
					markCountry(markedCountry + change);
				}

				this.isCountryMarked = function (index) {
					return markedCountry === index;
				}

				this.submit = function () {
					this.selectCountry($scope.countries[markedCountry]);
				};

			},
			controllerAs: 'countryDropdownCtrl'
		};
	});