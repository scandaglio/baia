'use strict';

/**
 * @ngdoc service
 * @name baiaApp.apiService
 * @description
 * # apiService
 * Service in the baiaApp.
 */
angular.module('baiaApp')
  .service('apiService', function ($http, $q) {
    var token = 'db5d5c43ecef674b772192270b0bed0f9a54d775'
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      getFile : function(url){
        var deferred = $q.defer();
        $http.get(url).then(function(data){
            deferred.resolve(data.data);
        }, function() {
          deferred.reject("An error occured while fetching file");
        });
        return deferred.promise;
      },
      postGist : function(data){
        var deferred = $q.defer();
        var data = {
          "description": "a gist for a user with token api call via ajax",
          "public": true,
          "files": {
            "file1.txt": {
              "content": "String file contents via ajax"}
            }
          }
        $http({
          method: 'POST',
          url: 'https://api.github.com/gists',
          headers: {
              'Authorization': 'token ' + token
            },
          data: data
        })
        .then(function(data){
          console.log()
            deferred.resolve(data.data);
        }, function() {
          deferred.reject("An error occured while fetching file");
        });
        return deferred.promise;
      }
    }
  });
