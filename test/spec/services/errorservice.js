'use strict';

describe('Service: errorService', function () {

	// load the service's module
	beforeEach(module('paymentApp'));

	// instantiate service
	var errorService, $log;
	beforeEach(inject(function (_errorService_, _$log_) {
		errorService = _errorService_;
		$log = _$log_;
	}));

	it('should do something', function () {
		expect(!!errorService).toBe(true);

	});

	it('should handle bad input', function () {

		spyOn($log, 'error');

		expect(errorService.error.bind(errorService, null, null)).not.toThrow();
		expect($log.error).toHaveBeenCalledWith('Error', '');

		expect(errorService.error.bind(errorService, [], {})).not.toThrow();
		expect($log.error).toHaveBeenCalledWith('Error', '');

		expect(errorService.error.bind(errorService, 4235, 'wat')).not.toThrow();
		expect($log.error).toHaveBeenCalledWith('Error', '');

		expect(errorService.error.bind(errorService, undefined, Number)).not.toThrow();
		expect($log.error).toHaveBeenCalledWith('Error', '');

		errorService.enableThrowing();

		expect(errorService.error.bind(errorService, null, null)).not.toThrow();
		expect($log.error).toHaveBeenCalledWith('Error', '');

		expect(errorService.error.bind(errorService, [], {})).not.toThrow();
		expect($log.error).toHaveBeenCalledWith('Error', '');

		expect(errorService.error.bind(errorService, 4235, 'wat')).not.toThrow();
		expect($log.error).toHaveBeenCalledWith('Error', '');

		expect(errorService.error.bind(errorService, undefined, Number)).not.toThrow();
		expect($log.error).toHaveBeenCalledWith('Error', '');


		expect($log.error.calls.count()).toEqual(8);


	})

	it('should throw errors', function () {
		errorService.enableThrowing();
		expect(errorService.throwingEnabled).toBe(true);
		expect(errorService.error.bind(errorService, Error)).toThrowError(Error);
		expect(errorService.error.bind(errorService, Error, 'error')).toThrowError(Error, 'error');
		expect(errorService.error.bind(errorService, TypeError, 'type error')).toThrowError(TypeError, 'type error');

		function CustomError(message) {
			this.name = 'CustomError';
			this.message = message;
		}

		expect(errorService.error.bind(errorService, CustomError, 'custom error')).toThrow(jasmine.objectContaining({
			name: 'CustomError',
			message: 'custom error'
		}))

	});

	it('should log errors if first argument is not a function, even if throwing is enabled', function () {
		errorService.enableThrowing();
		expect(errorService.throwingEnabled).toBe(true);

		spyOn($log, 'error');

		expect(errorService.error.bind(errorService, 'SomeError')).not.toThrow();
		expect($log.error).toHaveBeenCalledWith('SomeError', '');

		expect(errorService.error.bind(errorService, 'SomeOtherError', 'error')).not.toThrow();
		expect($log.error).toHaveBeenCalledWith('SomeOtherError', 'error');

		expect(errorService.error.bind(errorService)).not.toThrow();
		expect($log.error).toHaveBeenCalledWith('Error', '');

		expect($log.error.calls.count()).toEqual(3);

	});

	it('should $log errors', function () {
		errorService.disableThrowing();
		expect(errorService.throwingEnabled).toBe(false);

		spyOn($log, 'error');

		expect(errorService.error.bind(errorService, 'SomeError')).not.toThrow();
		expect($log.error).toHaveBeenCalledWith('SomeError', '');

		expect(errorService.error.bind(errorService, 'SomeOtherError', 'error')).not.toThrow();
		expect($log.error).toHaveBeenCalledWith('SomeOtherError', 'error');

		expect(errorService.error.bind(errorService)).not.toThrow();
		expect($log.error).toHaveBeenCalledWith('Error', '');

		expect(errorService.error.bind(errorService, Error)).not.toThrow();
		expect($log.error).toHaveBeenCalledWith('Error', '');

		expect(errorService.error.bind(errorService, Error, 'error')).not.toThrow();
		expect($log.error).toHaveBeenCalledWith('Error', 'error');

		expect(errorService.error.bind(errorService, TypeError, 'type error')).not.toThrow();
		expect($log.error).toHaveBeenCalledWith('TypeError', 'type error');

		expect($log.error.calls.count()).toEqual(6);

	});

	it('errorService.typeError should call errorService.error with the TypeError function', function () {
		spyOn(errorService, 'error');
		errorService.typeError('type error');
		expect(errorService.error).toHaveBeenCalledWith(TypeError, 'type error');
	})

});