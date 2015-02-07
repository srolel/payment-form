'use strict';

/**
 * @ngdoc service
 * @name paymentApp.BlueSnap
 * @description
 * # BlueSnap
 * Service in the paymentApp.
 */
angular.module('paymentApp')
	.service('BlueSnap', function (KitService, $document, errorService) {

		var publicKey = this.publicKey = "10001$8755fb8fdc5dac24f035a3c8772c724758f9b405d2b52ac8703183c8e02bd15f7372fd5d181e64de7276ca1adb126c2cd45cee2f3e19740aa83b128041aeabe36cfaadae137e73d397beda14d2a1c2d1ce2afc837296f002985455a94e9a655664e74ea0d88a265fea241adef10f4a9937b91bc8a74ba6744305ce6955dc79baa2cba5968b39885abb9b2253fc804b9327f418d205f8c49773b80e80a88dad22eb7ffd93b8ed54807b74e0959e077f08389d15ad7a54f203fc9c4824a3a2cec830069095df1206e47b3d6844e0d8f1a27b8dfd0a5fc88d767e97b0f99fce4d7f343e9a549f19374e4fd304ff564f4af0122f3c7f12bd70f5f3bef428c9eccffd";

		this.init = function init(formId) {
			BlueSnap.publicKey = publicKey;
			BlueSnap.setTargetFormId(formId);
		}

		this.getEncryptedName = function getEncryptedName(name) {
			return typeof name === 'string' ? 'encrypted' + KitService.capitalize(name) : 'encrypted';
		}

		//figure out if formEl is a string name of a form on the document, form element, of jQLite wrapped form element
		var resolveFormEl = function resolveFormEl(formEl) {
			if (typeof formEl === 'string') formEl = document[formEl];
			formEl = angular.element(formEl);
			if (formEl && formEl[0] && formEl[0].constructor === HTMLFormElement) {
				return formEl;
			}
		}

		var getFormInputsAsArray = this.getFormInputsAsArray = function getFormInputsAsArray(formEl) {
			formEl = resolveFormEl(formEl);
			if (!formEl) return errorService.typeError('invalid formEl argument');
			var inputs = formEl.find('input');
			return [].slice.call(inputs);
		}

		this.addInputsToForm = function addInputToForm(formEl, inputsToAdd) {

			formEl = resolveFormEl(formEl);

			if (!inputsToAdd) return errorService.typeError('invalid inputsToAdd argument');
			if (!formEl) return errorService.typeError('invalid formEl argument');

			if (!angular.isArray(inputsToAdd)) return errorService.typeError('inputsToAdd is not an array');

			var inputs = getFormInputsAsArray(formEl);
			var inputNames = inputs.map(function (input) {
				return input.name;
			})


			//generate elements to insert into array, and change input elements with the same name if they exist
			var inputEls = inputsToAdd.map(function (input) {
				//handling input elements and jqLite input element wrappers
				if (HTMLInputElement && input.constructor === HTMLInputElement || (input[0] && input[0].constructor === HTMLInputElement)) {
					return input;
				}

				//handling input attribute objects - {type, name, value}
				var existingInput = inputs[inputNames.indexOf(input.name)];

				if (existingInput) {
					existingInput.value = input.value;
					return null;
				}

				if (!input.type) input.type = 'hidden';
				return angular.element('<input>').attr(input);
			}).filter(Boolean);

			if (!inputEls.length) return;

			inputEls.forEach(formEl.append.bind(formEl));

			return true;
		}

		this.getFormData = function getFormData(formEl) {
			formEl = resolveFormEl(formEl);
			if (!formEl) return errorService.typeError('invalid formEl argument');
			var formData = getFormInputsAsArray(formEl)
				.filter(function (el) {
					return el.name;
				})
				.map(function (el) {
					return {
						value: el.value,
						name: el.name
					}
				});

			return formData;
		}

		this.processAdditionalInputs = function processAdditionalInputs(processes, scope) {
			if (!processes) return errorService.typeError('invalid processes argument');
			if (!scope) return errorService.typeError('invalid scope argument');
			var additionalFormInputs = [];
			Object.keys(processes).forEach(function (process) {
				if (typeof processes[process] !== 'function') return;
				var result = processes[process](scope[process]);
				if (!angular.isArray(result)) return;
				[].push.apply(additionalFormInputs, result);
			})
			if (!additionalFormInputs.length) return;
			return additionalFormInputs;
		}


	});