'use strict';

/**
 * @ngdoc directive
 * @name paymentApp.directive:trBluesnap
 * @description
 * # trBluesnap
 */
angular.module('paymentApp')
	.directive('trBluesnapForm', function (BlueSnap, KitService) {

		var GLOBALS = {
			DEFAULT_MONTH: '01',
			DEFAULT_YEAR: '2016'
		}

		return {
			restrict: 'A',
			controllerAs: 'formCtrl',
			controller: function ($scope, $element, $document, BuynowService, StateService) {

				var formName = $element.attr('name');

				this.getForm = function getForm() {
					return $scope[formName];
				};

				var processes = {
					fullName: function processFullName(fullName) {
						var names = fullName.split(' ');
						return [{
							name: 'firstName',
							value: names[0]
						}, {
							name: 'lastName',
							value: names[1]
						}];
					},
					selectedCountry: function processCountryName(country) {
						return [{
							name: 'country',
							value: country.name
						}];
					}
				};

				this.submit = function submit() {
					var additionalFormInputs = BlueSnap.processAdditionalInputs(processes, $scope);
					BlueSnap.addInputsToForm(formName, additionalFormInputs)
					var formData = BlueSnap.getFormData(formName);

				};



			},
			link: function postLink(scope, element, attrs) {
				var formId = element.attr('id');
				BlueSnap.init(formId);
				scope.expiryMonth = GLOBALS.DEFAULT_MONTH;
				scope.expiryYear = GLOBALS.DEFAULT_YEAR;

				scope.$watchGroup(['expiryMonth', 'expiryYear'], function (vals) {
					if (!vals) return;
					scope.expiry = vals.join('/');
				})

			}
		};
	});