'use strict';

describe('Service: BuynowService', function () {
	// load the service's module
	beforeEach(module('paymentApp'));

	// instantiate service
	var BuynowService;
	beforeEach(inject(function (_BuynowService_) {
		BuynowService = _BuynowService_;
	}));

	it('should exist', function () {
		expect(!!BuynowService).toBe(true);
	})

	it('should return country codes', function () {

		var fn = BuynowService.getCountry;

		expect(!!fn).toBe(true);
		expect(fn('Israel')).toEqual('il');
		expect(fn(376)).toEqual('il');
		expect(fn('il')).toEqual('il');
		expect(fn('il', null)).toEqual('il');
		expect(fn('Israel', 'code')).toEqual('376');
		expect(fn(376, 'code')).toEqual('376');
		expect(fn('il', 'code')).toEqual('376');
		expect(fn('Israel', 'name')).toEqual('Israel');
		expect(fn(376, 'name')).toEqual('Israel');
		expect(fn('il', 'name')).toEqual('Israel');
		expect(fn({})).toBe(null);
		expect(fn(['awdwad'])).toBe(null);
		expect(fn('awdwad')).toBe(null);
		expect(fn([124124])).toBe(null);
		expect(fn([124124]), 'awdwad').toBe(null);
		expect(fn()).toBe(null);
		expect(fn(null)).toBe(null);

		//checking object return values
		expect(fn('il', 'obj')).toEqual(jasmine.objectContaining({
			"abbr": "il",
			"code": "376",
			"name": "Israel"
		}))
		expect(Object.keys(fn('il', 'obj')).length).toBe(3);

		//checking aliases
		expect(fn('uk')).toEqual('gb');
		expect(fn('usa')).toEqual('us');



		expect
	});

	it('should return all countries', function () {
		expect(BuynowService.getCountries().length).toBeGreaterThan(0);
	})

	it('should search for specific countries', function () {
		expect(BuynowService.getCountries('isra')[0]).toEqual(jasmine.objectContaining({
			"abbr": "il",
			"code": "376",
			"name": "Israel"
		}));

		expect(BuynowService.getCountries('a').length).toBeGreaterThan(0);

		expect(BuynowService.getCountries('isra', null, 'name')[0]).toEqual('Israel');

		expect(BuynowService.getCountries('a', null, 'name').length).toBeGreaterThan(0);

		expect(BuynowService.getCountries('usa', null, 'name')[0]).toEqual('United States');

	})

});