'use strict';

describe('Service: BlueSnap', function () {

	function runBadInputTests(fn) {
		expect(fn()).toBeUndefined();
		expect(fn('wdawdwad')).toBeUndefined();
		expect(fn(null)).toBeUndefined();
		expect(fn(['awdawd'])).toBeUndefined();
		expect(fn({})).toBeUndefined();
		expect(fn(undefined, null)).toBeUndefined();
		expect(fn('wdawdwad', null)).toBeUndefined();
		expect(fn(null, ['wad'])).toBeUndefined();
		expect(fn({}, null)).toBeUndefined();
	}

	// load the service's module
	beforeEach(module('paymentApp'));

	// instantiate service
	var BlueSnap;
	beforeEach(inject(function (_BlueSnap_) {
		BlueSnap = _BlueSnap_;
	}));

	it('should initialize global BlueSnap', function () {
		expect(!!BlueSnap).toBe(true);

		window.BlueSnap = {
			setTargetFormId: function (formId) {}
		};

		spyOn(window.BlueSnap, 'setTargetFormId');

		var arg = 'wat';

		BlueSnap.init(arg);

		expect(window.BlueSnap.setTargetFormId).toHaveBeenCalledWith(arg);
		expect(window.BlueSnap.publicKey).toBe(BlueSnap.publicKey);

	});

	it('getEncryptedName: should add "encrypted" to strings and capitalize them', function () {
		expect(BlueSnap.getEncryptedName('wat')).toBe('encryptedWat');
		expect(BlueSnap.getEncryptedName()).toBe('encrypted')
		expect(BlueSnap.getEncryptedName(['wat'])).toBe('encrypted')
		expect(BlueSnap.getEncryptedName({
			wat: 'wat'
		})).toBe('encrypted')
	});


	describe('Form manipulations', function () {

		var formEl;
		var inputs = [{
			type: 'hidden',
			name: 'input1',
			value: 'wat'
		}, {
			type: 'text',
			name: 'input2',
			value: 'wat'
		}, {
			type: 'email',
			name: 'input3',
			value: 'wat@wat.wat'
		}, {
			type: 'text',
			name: 'input4',
			value: '42'
		}];


		beforeEach(function () {

			formEl = angular.element('<form>');

		});



		function runInputsTests(addedInputs) {

			expect(addedInputs.length).toEqual(4);

			addedInputs.forEach(function (input, index) {
				expect(input).toEqual(jasmine.any(HTMLInputElement));
			});

			var inputsData = addedInputs.map(function (input) {
				return {
					type: input.type,
					name: input.name,
					value: input.value
				}
			});

			inputsData.forEach(function (data, index) {
				expect(data).toEqual(jasmine.objectContaining(inputs[index]))
			});
		}

		it('getFormInputsAsArray: should get a form\'s input elements as an array using [].slice.call', function () {

			runBadInputTests(BlueSnap.getFormInputsAsArray.bind(BlueSnap));
			expect(BlueSnap.getFormInputsAsArray(['awdawd'], {})).toBeUndefined();

			inputs.forEach(function (input) {
				formEl.append(angular.element('<input>').attr(input))
			});

			var inputsAsArray = BlueSnap.getFormInputsAsArray(formEl);

			expect(angular.isArray(inputsAsArray)).toBeTruthy();

			runInputsTests(inputsAsArray);



		})

		describe('testing BlueSnap.addInputsToForm', function () {

			function runAddInputsToFormTests() {
				var addedInputs = [].slice.call(formEl.find('input'));
				runInputsTests(addedInputs);
			}

			it('should handle bad input', function () {
				runBadInputTests(BlueSnap.addInputsToForm.bind(BlueSnap));
				expect(BlueSnap.addInputsToForm(['awdawd'], {})).toBeUndefined();


				expect(BlueSnap.addInputsToForm(formEl)).toBeUndefined();
				expect(BlueSnap.addInputsToForm(formEl, 'awdawd')).toBeUndefined();
				expect(BlueSnap.addInputsToForm(formEl, null)).toBeUndefined();
				expect(BlueSnap.addInputsToForm(formEl, ['awdawd'])).toBeUndefined();

				expect(formEl.find('input').length).toBe(0);
			})

			it('should add input fields to a form from objects', function () {
				expect(BlueSnap.addInputsToForm(formEl, inputs)).toBe(true);
				runAddInputsToFormTests();
			});

			it('should add input fields to a form from elements', function () {

				var HTMLinputs = inputs.map(function (input) {
					return angular.element('<input>').attr(input)[0];
				});
				expect(BlueSnap.addInputsToForm(formEl, HTMLinputs)).toBe(true);
				runAddInputsToFormTests();

			});

		});

		it('getFormData: should get form data', function () {

			runBadInputTests(BlueSnap.getFormData.bind(BlueSnap));
			expect(BlueSnap.getFormData(['awdawd'], {})).toBeUndefined();


			inputs.forEach(function (input) {
				formEl.append(angular.element('<input>').attr(input))
			});

			var inputsWithoutTypeField = inputs.map(function (input) {
				return {
					value: input.value,
					name: input.name,
				}
			});

			var formData = BlueSnap.getFormData(formEl);

			formData.forEach(function (datum, index) {
				expect(datum).toEqual(jasmine.objectContaining(inputsWithoutTypeField[index]));
			})

		})
	})

	it('processAdditionalInputs: should apply given functions to attributes of a given object and return results as an array', function () {

		runBadInputTests(BlueSnap.processAdditionalInputs.bind(BlueSnap));

		var processes = {
			wat: function (wat) {
				return [{
					name: wat,
					value: wat
				}];
			},
			uwot: function (uwot) {
				return [{
					name: uwot,
					value: uwot
				}];
			},
			42: function (wot) {
				return wot;
			},
			lol: function () {
				return {};
			},
			O_O: 666,
		};

		var testVals = [1, 2];

		var scope = {
			wat: 1,
			uwot: 2,
			42: 123,
			lol: null,
			O_O: '...'
		};

		expect(BlueSnap.processAdditionalInputs(processes, scope))
			.toEqual([jasmine.objectContaining({
				name: scope.wat,
				value: scope.wat
			}), jasmine.objectContaining({
				name: scope.uwot,
				value: scope.uwot
			})]);



	})


});