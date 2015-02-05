'use strict';

describe('Service: KitService', function () {

  // load the service's module
  beforeEach(module('paymentApp'));

  // instantiate service
  var KitService;
  beforeEach(inject(function (_KitService_) {
    KitService = _KitService_;
  }));

  it('should do something', function () {
    expect(!!KitService).toBe(true);
  });

});
