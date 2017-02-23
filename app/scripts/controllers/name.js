'use strict';

/**
 * @ngdoc function
 * @name baiaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the baiaApp
 */
angular.module('baiaApp')
  .controller('NameCtrl', function ($scope, formData) {
    $scope.yourName = formData.getName();
    $scope.placeholder = 'inserisci il tuo nome'
  });
