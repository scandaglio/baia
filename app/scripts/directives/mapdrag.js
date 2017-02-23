'use strict';

/**
 * @ngdoc directive
 * @name baiaApp.directive:mapdrag
 * @description
 * # mapdrag
 */
angular.module('baiaApp')
  .directive('mapdrag', function (formData) {
    return {
      replace: false,
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

        var centroidPt = turf.centroid(scope.trotto);

        mapboxgl.accessToken = 'pk.eyJ1IjoidGVvIiwiYSI6IllvZUo1LUkifQ.dirqtn275pAKdnqtLM2HSw';
        var map = new mapboxgl.Map({
            container: element[0],
            center: centroidPt.geometry.coordinates,
            zoom: 15,
            minZoom:10,
            interactive:false,
            style: 'mapbox://styles/mapbox/satellite-v9'
        });

        var bbox = turf.bbox(scope.trotto);

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
                'data': scope.trotto
            });

            map.addLayer({
                'id': 'trotto',
                'type': 'fill',
                'source': 'trotto',
                'layout': {},
                'paint': {
                    'fill-color': '#fff',
                    'fill-opacity': 0.2
                }
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
                  'line-width':2,
                  'line-dasharray':[1,2]
                }
            });

            scope.trotto.features.forEach(function(feature){
              if(feature.properties.fixed){
                var center = turf.centroid(feature);
                var places = formData.getPlaces();
                var label = places['building_' + feature.properties.id].project;

                var div = d3.select('body')
                  .append('div')
                  .datum(label)
                  .attr('class', 'marker')

                div.append('div')
                  .attr('class', 'text')
                  .text(label)

                var w = div.node().getBoundingClientRect().width
                popups[label] = new mapboxgl.Marker(div.node(), {offset:[-(w/2),-10]})
                   .setLngLat(center.geometry.coordinates)
                   .addTo(map);
              }
            })

        });

        // map.on('mousemove', function (e) {
        //   //all routes
        //     console.log(e.point)
        //
        //     var features = map.queryRenderedFeatures(e.point, { layers: ['trotto'] });
        //     map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
        // });

        var onsth = false;
        scope.dragging = function(e, ui){
          $('#map').offset()
          var top = ui.offset.top- $('#map').offset().top;
          var left = ui.offset.left -$('#map').offset().left;
          var point = [left,top];
          var features = map.queryRenderedFeatures(point, { layers: ['trotto'] });
          if(features.length && !features[0].properties.fixed){
            map.setFilter("trotto-hover", ["==", "id", features[0].properties.id]);
            onsth = true;
          }else{
            map.setFilter("trotto-hover", ["==", "id", ""]);
            onsth = false;
          }

        }
        scope.dragStop = function(e, ui){
          $('#map').offset()
          var top = ui.offset.top- $('#map').offset().top;
          var left = ui.offset.left -$('#map').offset().left;
          var point = [left,top];
          map.setFilter("trotto-hover", ["==", "id", ""]);
          var features = map.queryRenderedFeatures(point, { layers: ['trotto'] });
          if(features.length && !features[0].properties.fixed){
            $(e.target).addClass('p-disabled')
            var feature = features[0]
            var center = turf.centroid(feature)
            var label = ui.helper.text().trim();
            addMarker(center.geometry.coordinates, label, feature.properties.id)
          }

        }

        scope.revert = function(){
          return onsth?false:true
        }

        var popups = {}

        function addMarker(point, label, id){
          var places = formData.getPlaces();
          var prevLabel = places['building_' + id];
          if(prevLabel){
            removeMarker(prevLabel.project)
          }
          formData.addPlaces('building_' + id,label)

          var div = d3.select('body')
            .append('div')
            .datum({label:label, id:id})
            .attr('class', 'marker')

          div.append('div')
            .attr('class', 'text')
            .text(label)

          var close = div.append('div')
            .attr('class', 'btn btn-default')
            .on('click', function(d) {
              removeMarker(d)
            })

          close.append('span')
            .attr('class', 'glyphicon glyphicon-remove')

          var w = div.node().getBoundingClientRect().width
          popups[label] = new mapboxgl.Marker(div.node(), {offset:[-(w/2),-10]})
             .setLngLat(point)
             .addTo(map);

        }

        function removeMarker(d){
          $('.prj-group').each(function(i){
            if($(this).text().trim() == d.label){
              $(this).removeClass('p-disabled')
            }
          })
          popups[d.label].remove()
          formData.removePlace('building_' + d.id);
        }


      }
    };
  });
