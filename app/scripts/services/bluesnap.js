'use strict';

/**
 * @ngdoc service
 * @name paymentApp.BlueSnap
 * @description
 * # BlueSnap
 * Service in the paymentApp.
 */
angular.module('paymentApp')
	.service('BlueSnap', function (KitService, $document, $location, errorService) {

		var stagingKey = "10001$8755fb8fdc5dac24f035a3c8772c724758f9b405d2b52ac8703183c8e02bd15f7372fd5d181e64de7276ca1adb126c2cd45cee2f3e19740aa83b128041aeabe36cfaadae137e73d397beda14d2a1c2d1ce2afc837296f002985455a94e9a655664e74ea0d88a265fea241adef10f4a9937b91bc8a74ba6744305ce6955dc79baa2cba5968b39885abb9b2253fc804b9327f418d205f8c49773b80e80a88dad22eb7ffd93b8ed54807b74e0959e077f08389d15ad7a54f203fc9c4824a3a2cec830069095df1206e47b3d6844e0d8f1a27b8dfd0a5fc88d767e97b0f99fce4d7f343e9a549f19374e4fd304ff564f4af0122f3c7f12bd70f5f3bef428c9eccffd";

		var prodKey = '10001$89123db1ae18bcf413494c50ab8d20ec52f7c620e3b96253d75e03691c0729b4b1dc83d77d49c0e6933e62c615241086726a0d16cf02126a5e0b4d0d5bb245c089ba8fba2d1ef0aae697a4fd82827d72a0785aa360f05716d23691996dbc585a6514e9b75f39b1d1ecc8cf9392238f72c7e7b13a99e6d99d50164d7361d8a03e0bbfe21f2fc6017dc2a5c173040389c8d2202ac02ad6d1cd490876153c57e5a83553f73a561e4867c66aa6200ba42ab972a4f289d3274cd7912ec295612778290d8281c7ffe84278601a16f5367c2e2b5de7d88654c9037d1e099293a2072c99a5f159eefc2915495a6d20812cf90a0477b9ba2f2553a3c9e4e53494a61feadf';

		this.isStaging = function () {
			return $location.search().isStaging === 'true';
		}

		this.init = function init(formId) {
			var key = this.isStaging() ? stagingKey : prodKey;
			BlueSnap.publicKey = key;
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

		var errorMessages = {
			card: {
				required: 'Field \'Card Number\' is required.',
				parse: '\'Card Number\' should be a valid Credit Card'
			},
			cvc: {
				required: 'Field \'Security Code\' is required.',
				parse: '\'Security Code\' should be between 3 and 4 characters long',
				cvc: '\'Security Code\' length is not compatible with Credit Card type'
			},
			fullName: {
				required: 'Field \'Full Name\' is required.'
			},
			email: {
				required: 'Field \'Email Address\' is required.'
			}

		}

		this.getErrorMsg = function (input) {
			if (!input) return errorService.typeError('invalid input argument');
			if (!input.$error) return errorService.typeError('input must have $error attribute');

			var errors = errorMessages[input.$name];

			if (!errors) return '';

			errors = Object.keys(input.$error).reduce(function (obj, key) {
				obj[key] = errors[key];
				return obj;
			}, {})

			return errors[input.$name] || errors.parse || errors.required || '';
		}


	});