'use strict';

/**
 * @ngdoc function
 * @name baiaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the baiaApp
 */
angular.module('baiaApp')
  .controller('HomeCtrl', function ($scope, trotto) {
    $scope.trotto = trotto;
    $scope.title = 'I love TR8';
    $scope.desc = '“I love TR8” non è un gioco né un’offerta immobiliare. La proposta di Trotto Bene Comune per il futuro delle scuderie del Trotto di Viale dei Rospigliosi è...darvi la possibilità di scegliere. Ciascuno da oggi potrà immaginare e condividere le funzioni che vorrebbe veder realizzate dove oggi c’è solo abbandono e rischio di speculazione edilizia. Lo faremo a partire da desideri, bisogni, progetti, con lo scopo di restituirle al quartiere e a un uso pubblico.';
  });
