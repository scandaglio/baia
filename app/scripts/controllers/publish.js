'use strict';

/**
 * @ngdoc function
 * @name baiaApp.controller:PublishCtrl
 * @description
 * # PublishCtrl
 * Controller of the baiaApp
 */
angular.module('baiaApp')
  .controller('PublishCtrl', function ($scope,formData, apiService, trotto,$location) {
    var baseurl = $location.absUrl().split('#!')[0];
    console.log(baseurl)
    $scope.form = formData.getForm();
    $scope.savetext = 'salva';
    $scope.savetextdisabled = false;
    console.log(trotto, $scope.form)
    var finalData = angular.copy(trotto);
    finalData.owner = $scope.form.name?$scope.form.name:'anon';
    finalData.features.forEach(function(feature){
      var id = 'building_' + feature.properties.id;
      if($scope.form.places[id]){
        var project = $scope.form.projects.filter(function(p){
          return $scope.form.places[id].project == p.name;
        })[0]
        feature.properties.project = project;
      }
    })

    $scope.disabled = true;
    $scope.link = '';
    $scope.saveGist = function(){
      $scope.savetext = 'sto salvando...';
      $scope.savetextdisabled = true;

      apiService.postGist(finalData).then(
        function(data){
          $scope.savetext = 'salvato';
          $scope.disabled = false;
          $scope.link = baseurl + '#!/project/' + data.id;

        },
        function(error){
          $scope.savetext = 'errore :(';
        }
      )

    }

    $scope.desc = '“I love TR8” non è un gioco né un’offerta immobiliare. La proposta di Trotto Bene Comune per il futuro delle scuderie del Trotto di Viale dei Rospigliosi è...darvi la possibilità di scegliere. Ciascuno da oggi potrà immaginare e condividere le funzioni che vorrebbe veder realizzate dove oggi c’è solo abbandono e rischio di speculazione edilizia. Lo faremo a partire da desideri, bisogni, progetti, con lo scopo di restituirle al quartiere e a un uso pubblico.';

  });
