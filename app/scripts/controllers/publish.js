'use strict';

/**
 * @ngdoc function
 * @name baiaApp.controller:PublishCtrl
 * @description
 * # PublishCtrl
 * Controller of the baiaApp
 */
angular.module('baiaApp')
  .controller('PublishCtrl', function ($scope,formData, apiService) {
    $scope.form = formData.getForm();
    console.log($scope.form)
    $scope.saveGist = function(){

      apiService.postGist().then(
        function(data){
          console.log(data)
        },
        function(error){
          console.log(error)
        }
      )

    }
  });
