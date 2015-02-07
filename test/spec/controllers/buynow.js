'use strict';

describe('Controller: BuynowCtrl', function () {

	// load the controller's module
	beforeEach(module('paymentApp'));

	var BuynowCtrl,
		scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		BuynowCtrl = $controller('BuynowCtrl', {
			$scope: scope
		});
	}));

	it('should have a list of countries', function () {
		scope.$apply();
		expect(scope.countries.length).toBeGreaterThan(0);
		expect(scope.selectedCountry).toEqual(jasmine.objectContaining({
			abbr: 'il',
			code: '376',
			name: 'Israel'
		}));

	});
});