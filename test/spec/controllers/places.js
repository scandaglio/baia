'use strict';

describe('Controller: PlacesCtrl', function () {

  // load the controller's module
  beforeEach(module('baiaApp'));

  var PlacesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlacesCtrl = $controller('PlacesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PlacesCtrl.awesomeThings.length).toBe(3);
  });
});
