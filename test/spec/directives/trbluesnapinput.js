'use strict';

describe('Directive: trBluesnapInput', function () {

	// load the directive's module
	beforeEach(module('paymentApp'));

	var element,
		scope;

	beforeEach(inject(function ($rootScope) {
		scope = $rootScope.$new();
	}));

	it('should make hidden element visible', inject(function ($compile) {
		element = angular.element('<tr-bluesnap-input></tr-bluesnap-input>');
		element = $compile(element)(scope);
		expect(element.text()).toBe('this is the trBluesnapInput directive');
	}));
});