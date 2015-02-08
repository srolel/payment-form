'use strict';

describe('Directive: creditCards', function () {

  // load the directive's module
  beforeEach(module('paymentApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<credit-cards></credit-cards>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the creditCards directive');
  }));
});
