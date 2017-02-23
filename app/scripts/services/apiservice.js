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
      postGist : function(geojson, token){
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
      },
      listAuthorizations: function(){
        var deferred = $q.defer();
        $http({
          method: 'GET',
          url: 'https://api.github.com/authorizations',
          headers: {'Authorization': "Basic " + btoa("scandaglio-user:0fftopic")}
            })
          .then(function(token){
            console.log(token)
            deferred.resolve(token.data)

            }, function(error) {
              console.log('ciao')
              deferred.reject("An error occured while fetching file");
            });
        return deferred.promise;
      },
      getToken: function(note){
        var deferred = $q.defer();
        $http({
          method: 'POST',
          url: 'https://api.github.com/authorizations',
          headers: {
              'Authorization': "Basic " + btoa("scandaglio-user:0fftopic")
            },
          data: '{"scopes":["gist"],"note":"'+note+'"}'
            })
          .then(function(data){

            deferred.resolve(data.data);

            }, function(error) {
              deferred.reject("An error occured while fetching file");
            });

        return deferred.promise;

      }
    }
  });
