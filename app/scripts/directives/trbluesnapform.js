'use strict';

/**
 * @ngdoc directive
 * @name paymentApp.directive:trBluesnap
 * @description
 * # trBluesnap
 */
angular.module('paymentApp')
	.directive('trBluesnapForm', function (BlueSnap) {
		return {
			restrict: 'A',
			controllerAs: 'formCtrl',
			controller: function ($scope, $element, $document) {

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
						}]
					}
				}

				this.submit = function submit() {
					var additionalFormInputs = BlueSnap.processAdditionalInputs(processes, scope);
					BlueSnap.addInputsToForm(formName, additionalFormInputs)
					var formData = BlueSnap.getFormData(formName);

				};
			},
			link: function postLink(scope, element, attrs) {
				var formId = element.attr('id');
				BlueSnap.init(formId);
			}
		};
	});