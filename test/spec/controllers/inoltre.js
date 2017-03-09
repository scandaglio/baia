'use strict';

describe('Controller: InoltreCtrl', function () {

  // load the controller's module
  beforeEach(module('baiaApp'));

  var InoltreCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InoltreCtrl = $controller('InoltreCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(InoltreCtrl.awesomeThings.length).toBe(3);
  });
});
