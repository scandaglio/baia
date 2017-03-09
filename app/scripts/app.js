'use strict';

/**
 * @ngdoc overview
 * @name baiaApp
 * @description
 * # baiaApp
 *
 * Main module of the application.
 */
angular
  .module('baiaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'angular-loading-bar',
    'ngDragDrop',
    '720kb.socialshare',
    'angularRandomString'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        resolve: {
          trotto: function (apiService) {
            return apiService.getFile('data/trotto.json')
          }
        }
      })
      .when('/name', {
        templateUrl: 'views/name.html',
        controller: 'NameCtrl'
      })
      .when('/projects', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl'
      })
      .when('/places', {
        templateUrl: 'views/places.html',
        controller: 'PlacesCtrl',
        resolve: {
          trotto: function (apiService) {
            return apiService.getFile('data/trotto.json')
          }
        }
      })
      .when('/publish', {
        templateUrl: 'views/publish.html',
        controller: 'PublishCtrl',
        resolve: {
          trotto: function (apiService) {
            return apiService.getFile('data/trotto.json')
          }
        }
      })
      .when('/project/:id', {
        templateUrl: 'views/project.html',
        controller: 'ProjectCtrl',
        resolve: {
          geojson: function (apiService, $route) {
            return apiService.getGist($route.current.params.id)
          }
        }
      })
      .when('/inoltre', {
        templateUrl: 'views/inoltre.html',
        controller: 'InoltreCtrl',
        controllerAs: 'inoltre'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/all', {
        templateUrl: 'views/all.html',
        controller: 'AllCtrl',
        controllerAs: 'all',
        resolve: {
          gists: function (apiService) {
            return apiService.getGists();
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
