'use strict';

describe('Directive: hoverTooltip', function () {

  // load the directive's module
  beforeEach(module('paymentApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<hover-tooltip></hover-tooltip>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the hoverTooltip directive');
  }));
});
