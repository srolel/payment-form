'use strict';

describe('Service: BlueSnap', function () {

  // load the service's module
  beforeEach(module('paymentApp'));

  // instantiate service
  var BlueSnap;
  beforeEach(inject(function (_BlueSnap_) {
    BlueSnap = _BlueSnap_;
  }));

  it('should do something', function () {
    expect(!!BlueSnap).toBe(true);
  });

});
