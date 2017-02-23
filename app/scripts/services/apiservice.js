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
    var token = 'c6f7e571cffb439f92c5b98242a3c905784c268b';
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
      postGist : function(geojson){
        var deferred = $q.defer();

        var data = {
          "description": "a gist for a user with token api call via ajax",
          "public": true,
          "files":{}
          }

        var file = data.files[data.owner + '_' + 'trotto.json'] = {};

        file['content'] = JSON.stringify(geojson);

        $http({
          method: 'POST',
          url: 'https://api.github.com/gists',
          headers: {
              'Authorization': 'token ' + token
            },
          data: data
        })
        .then(function(data){
          console.log(data)
            deferred.resolve(data.data);
        }, function(error) {
          console.log(error)
          deferred.reject("An error occured while fetching file");
        });
        return deferred.promise;
      }
    }
  });
