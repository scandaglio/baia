'use strict';

/**
 * @ngdoc function
 * @name baiaApp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the baiaApp
 */
angular.module('baiaApp')
  .controller('ProjectCtrl', function ($scope, geojson) {
    $scope.geojson = JSON.parse(d3.entries(geojson.files)[0].value.content);
  });
