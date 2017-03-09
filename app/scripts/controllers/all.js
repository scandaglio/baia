'use strict';

/**
 * @ngdoc function
 * @name baiaApp.controller:AllCtrl
 * @description
 * # AllCtrl
 * Controller of the baiaApp
 */
angular.module('baiaApp')
  .controller('AllCtrl', function ($scope, gists, apiService) {
    $scope.gists = [];
    $scope.gistsTot = gists.length;
    var start = 0;
    var counter = 0;

    getGist(start);

    function getGist(index){
      apiService.getFile(d3.entries(gists[index].files)[0].value.raw_url).then(
        function(data){
          var content = data
          content.gistId = gists[index].id;
          $scope.gists.push(content);
          counter++;
          if(counter<$scope.gistsTot){
            getGist(counter)
          }
        },
        function(error){
          console.log(error)
          counter++;
          if(counter<$scope.gistsTot){
            getGist(counter)
          }
        }
      )
    }

  });
