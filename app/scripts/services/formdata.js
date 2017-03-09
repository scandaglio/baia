'use strict';

/**
 * @ngdoc service
 * @name baiaApp.formData
 * @description
 * # formData
 * Service in the baiaApp.
 */
angular.module('baiaApp')
  .service('formData', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var form = {
        name: '',
        projects:[
          {name:'agorà', editable: false, draggable:false, id:0},
          {name:'officina', editable: false, draggable:false, id:1},
          {name:'mensa', editable: false, draggable:false, id:2},
          {name:'cinema', editable: false, draggable:true, id:3},
          {name:'ludoteca', editable: false, draggable:true, id:4},
          {name:'ufficio condivisio', editable: false, draggable:true, id:5},
          {name:'ambulatorio popolare', editable: false, draggable:true, id:6}
        ],
        places:{
          building_8: {project: 'agorà', editable: false},
          building_7: {project: 'mensa', editable: false},
          building_10: {project: 'officina', editable: false}
        }
      }

    var reset = {
            name: '',
            projects:[
              {name:'agorà', description:'questa è una descrizione', editable: false, draggable:false, id:0},
              {name:'officina', description:'questa è una descrizione yo', editable: false, draggable:false, id:1},
              {name:'mensa', description:'questa non è una descrizione', editable: false, draggable:false, id:2},
              {name:'cinema', description:'questa forse è una descrizione', editable: false, draggable:true, id:3}
            ],
            places:{
              building_8: {project: 'agorà', editable: false},
              building_7: {project: 'mensa', editable: false},
              building_10: {project: 'officina', editable: false}
            }
          }

    return {
        getName: function () {
            return form.name;
        },
        setName: function(value) {
            form.name = value;
        },
        getProjects: function () {
            return form.projects;
        },
        getProject: function(id) {
            var place = form.projects.filter(function(d){
              return d.id == id;
            })[0];

            return place;
        },
        setProject: function(value, id) {
            if(id){
              form.projects.map(function(d,i){
                if(d.id == id){
                  d.name = value.name
                  d.description = value.description
                  return d
                }else{
                  return d
                }
              })
            }else{
              value.editable = true;
              value.draggable = true;
              value.id = form.projects.length + 1;
              form.projects.push(value)
            }
        },
        removeProject: function(id){
          for(var i = form.projects.length - 1; i >= 0; i--){
              if(form.projects[i].id == id){
                  form.projects.splice(i,1);
              }
            }
        },
        addPlaces: function(place_id, project){
            form.places[place_id] = {project: project}
        },
        getPlaces: function(){
            return form.places;
        },
        removePlace: function(id){
            form.places[id] = null;
        },
        getForm: function(){
            return form;
        },
        resetForm: function(){
          form = angular.copy(reset);
        }


    };
  });
