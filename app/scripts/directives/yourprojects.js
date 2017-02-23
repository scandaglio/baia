'use strict';

/**
 * @ngdoc directive
 * @name baiaApp.directive:yourprojects
 * @description
 * # yourprojects
 */
angular.module('baiaApp')
  .directive('yourprojects', function ($timeout) {
    return {
      restrict: 'A',
      replace: false,
      link: function postLink(scope, element, attrs) {
        $(element[0]).children( ".form-control" ).focusin(function() {
          $(element[0]).children('label').removeClass('invisible')
          $timeout(function(){
            if(attrs.type == 'desc'){
              scope.descplaceholder = '';
            }else {
              scope.nomeplaceholder = ''
            }

          })
        });
      }
    };
  });
