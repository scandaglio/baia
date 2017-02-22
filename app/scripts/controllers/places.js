'use strict';

/**
 * @ngdoc function
 * @name baiaApp.controller:PlacesCtrl
 * @description
 * # PlacesCtrl
 * Controller of the baiaApp
 */
angular.module('baiaApp')
  .controller('PlacesCtrl', function ($scope, trotto, formData) {
    $scope.projectsList = formData.getProjects();
    $scope.trotto = trotto;

  });
