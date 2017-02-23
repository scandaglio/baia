'use strict';

describe('Directive: bgmap', function () {

  // load the directive's module
  beforeEach(module('baiaApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bgmap></bgmap>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the bgmap directive');
  }));
});
