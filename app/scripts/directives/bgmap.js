'use strict';

/**
 * @ngdoc directive
 * @name baiaApp.directive:bgmap
 * @description
 * # bgmap
 */
angular.module('baiaApp')
  .directive('bgmap', function () {
    return {
      restrict: 'A',
      replace: false,
      link: function postLink(scope, element, attrs) {

        var centroidPt = turf.centroid(scope.trotto);

        mapboxgl.accessToken = 'pk.eyJ1IjoidGVvIiwiYSI6IllvZUo1LUkifQ.dirqtn275pAKdnqtLM2HSw';
        var map = new mapboxgl.Map({
            container: element[0],
            center: centroidPt.geometry.coordinates,
            zoom: 7,
            hash: false,
            interactive:false,
            style: 'mapbox://styles/mapbox/satellite-v9'
        });
        var bbox = turf.bbox(scope.trotto);

        map.on('load', function(){

          map.fitBounds([[
              bbox[0],
              bbox[1]
          ], [
              bbox[2],
              bbox[3]
          ]],{padding:100, duration:10000});
        })

        map.on('moveend', function(){
          d3.select('#bgmap .mapboxgl-canvas-container').classed('opaque', true)
          d3.select('#home-container').classed('fadein', true)
        })

      }
    };
  });
