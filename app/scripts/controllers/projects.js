'use strict';

/**
 * @ngdoc function
 * @name baiaApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the baiaApp
 */
angular.module('baiaApp')
  .controller('ProjectsCtrl', function ($scope, formData) {
    $scope.maxProjects = 5;

    $scope.projectsList = formData.getProjects();
    $scope.submit = function(){
      var project = {
        name: $scope.projectName,
        description: $scope.projectDesc
      }

      formData.setProject(project, $scope.projectId)
      $scope.projectName = ''
      $scope.projectDesc = ''
      $scope.projectId = ''
    }
    $scope.editProject = function(project){
      $scope.projectName = project.name;
      $scope.projectDesc = project.description;
      $scope.projectId = project.id
    }

    $scope.removeProject = function(id){
      formData.removeProject(id)
      $scope.projectName = ''
      $scope.projectDesc = ''
      $scope.projectId = ''
    }
  });
