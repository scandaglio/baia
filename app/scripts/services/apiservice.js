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
    var token = '23f06d46134f246b9576d8c3477f138e319095cc';
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
          "description": "un altro progetto dal basso per il Trotto di " + geojson.owner,
          "public": true,
          "files":{}
          }

        var file = data.files[geojson.owner + '_' + 'trotto.json'] = {};

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
            deferred.resolve(data.data);
        }, function(error) {
          deferred.reject("An error occured while fetching file");
        });
        return deferred.promise;
      },
      getGist: function(id){
        var deferred = $q.defer();
        var url = 'https://api.github.com/gists/' + id
        $http.get(url).then(function(data){
            deferred.resolve(data.data);
        }, function() {
          deferred.reject("An error occured while fetching file");
        });
        return deferred.promise;
      }
    }
  });
