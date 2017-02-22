'use strict';

describe('Controller: PublishCtrl', function () {

  // load the controller's module
  beforeEach(module('baiaApp'));

  var PublishCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PublishCtrl = $controller('PublishCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PublishCtrl.awesomeThings.length).toBe(3);
  });
});
