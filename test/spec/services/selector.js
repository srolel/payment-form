'use strict';

describe('Service: selector', function () {

  // load the service's module
  beforeEach(module('paymentApp'));

  // instantiate service
  var selector;
  beforeEach(inject(function (_selector_) {
    selector = _selector_;
  }));

  it('should do something', function () {
    expect(!!selector).toBe(true);
  });

});
