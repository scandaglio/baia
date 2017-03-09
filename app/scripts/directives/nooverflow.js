'use strict';

/**
 * @ngdoc directive
 * @name baiaApp.directive:nooverflow
 * @description
 * # nooverflow
 */
angular.module('baiaApp')
  .directive('nooverflow', function () {
    return {
      replace: false,
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        $('body').css('overflow', 'auto')
      }
    };
  });
