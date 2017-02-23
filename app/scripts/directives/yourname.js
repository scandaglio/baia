'use strict';

/**
 * @ngdoc directive
 * @name baiaApp.directive:yourname
 * @description
 * # yourname
 */
angular.module('baiaApp')
  .directive('yourname', function (formData, $timeout) {
    return {
      restrict: 'A',
      replace: false,
      link: function postLink(scope, element, attrs) {
        $( ".name-input" ).focusin(function() {
          $('form label').removeClass('invisible')
          $timeout(function(){
            scope.placeholder = '';
          })
        });

        scope.$watch('yourName', function (newValue, oldValue) {
          if((newValue != oldValue) && newValue &&  attrs.inputisvalid){
            formData.setName(newValue)
          }
        })
      }
    };
  });
