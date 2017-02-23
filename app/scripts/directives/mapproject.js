'use strict';

/**
 * @ngdoc directive
 * @name baiaApp.directive:mapproject
 * @description
 * # mapproject
 */
angular.module('baiaApp')
  .directive('mapproject', function () {
    return {
      replace: false,
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var centroidPt = turf.centroid(scope.geojson);

        mapboxgl.accessToken = 'pk.eyJ1IjoidGVvIiwiYSI6IllvZUo1LUkifQ.dirqtn275pAKdnqtLM2HSw';
        var map = new mapboxgl.Map({
            container: element[0],
            center: centroidPt.geometry.coordinates,
            zoom: 15,
            minZoom:10,
            interactive:true,
            style: 'mapbox://styles/mapbox/satellite-streets-v9'
        });

        var bbox = turf.bbox(scope.geojson);

        map.fitBounds([[
            bbox[0],
            bbox[1]
        ], [
            bbox[2],
            bbox[3]
        ]],{padding:50});

        map.on('load', function () {
            map.addSource('trotto', {
                'type': 'geojson',
                'data': scope.geojson
            });

            map.addLayer({
                'id': 'trotto',
                'type': 'fill',
                'source': 'trotto',
                'layout': {},
                'paint': {
                    'fill-color': '#fff',
                    'fill-opacity': 0.5
                },
                "filter":["has", "project_name"]
            });

            map.addLayer({
                'id': 'trotto-hover',
                'type': 'fill',
                'source': 'trotto',
                'layout': {},
                'paint': {
                    'fill-color': '#fff',
                    'fill-opacity': 0.7
                },
                "filter": ["==", "id", ""]
            });
            
            map.addLayer({
                'id': 'trotto-out',
                'type': 'line',
                'source': 'trotto',
                'layout': {
                  'line-cap': 'round'

                },
                'paint': {
                  'line-width':2
                },
                "filter":["has", "project_name"]
            });

            map.addLayer({
                 "id": "labels",
                 "type": "symbol",
                 "source": "trotto",
                 "layout": {
                     "text-field": "{project_name}",
                     "text-transform": "uppercase",
                     "text-size": 20,
                     //"text-offset": [0,1],
                     "text-letter-spacing": 0.2,
                     'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold']
                 },
                 'paint':{
                   "text-halo-color":'rgb(255,255,255)',
                   "text-halo-width": 2
                 },
                 "filter":["has", "project_name"]
             });

        });
      }
    };
  });
