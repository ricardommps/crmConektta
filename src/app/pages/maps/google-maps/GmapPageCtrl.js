/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
 (function () {
  'use strict';

  angular.module('BlurAdmin.pages.maps')
  .controller('GmapPageCtrl', GmapPageCtrl);

  /** @ngInject */
  function GmapPageCtrl($timeout, $http, $scope) {

    var vm = this;
    vm.locations =[];
    var defautLocation = {
      "lat" : -12.510784,
      "lng" : -51.820115,
      "formatted_address" : "Brasil"
    }
    vm.data={};
    vm.data.segmentacao = 'all';
    vm.addCity = addCity;
    vm.removeCity = removeCity;
    vm.gender = gender;
    vm.city = "";
    vm.save = save;
    vm.radius = 40;
    vm.class = "btn btn-default btn-xs"
    var range = 40;

    vm.updateItem = updateItem;

    function gender(){
      console.log(vm.data.segmentacao);
    }

    function updateItem(item){
      var index = vm.locations.indexOf(item);
      initializeMarker(index);
    }

    $scope.rangeChangeCallback = function(sliderObj){ 
      range = sliderObj.from;
      console.log(sliderObj);
    }

    var map;
    var latLang;
    var marker;
    var cityCircle;

    function save(){
      console.log(vm.range);
    }

    function removeCity(item){

      var index = vm.locations.indexOf(item);
      vm.locations.splice(index, 1);
      initializeMarker();
      console.log(vm.locations);

    }

    function addCity(){
      geoCode(vm.city);
      vm.city = "";

    }

    function geoCode(search){
      var geolocationInfo = {};
      $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +search+ '&key=AIzaSyBZVOSPh0Z4mv9jljJWzZNSug6upuec7Sg').success(function(mapData) {
        if(mapData.status == "200" || mapData.status == "OK"){
          mapData.results[0].radius = 40;
          vm.locations.push(mapData.results[0]);
          geolocationInfo = mapData.results[0];
          initializeMarker();
        }else if(mapData.status=="ZERO_RESULTS"){
          alert("Cidade não encontrada em nossa base de dados")
        }
        
      });

    }

    function addmarker(info)
    {  
      latLang = new google.maps.LatLng(info.geometry.location.lat, info.geometry.location.lng);
      marker = new google.maps.Marker({
        map : map,
        position : latLang,
        title : info.address_components[0].short_name,
        animation: google.maps.Animation.DROP
      });

      creatMapsCircle(info,40);
      
      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent('<h2>' + marker.title + '</h2>');
        infoWindow.open(map, marker);
      });
      map.setCenter(latLang);
      var infoMarke = {
        map : map,
        position : info.geometry.location,
        title : info.address_components[0].short_name
      };
      map.zoom = 8;

    }

    function creatMapsCircle(location,radius){
      console.log("creatMapsCircle")
      console.log(cityCircle);
      latLang = new google.maps.LatLng(location.geometry.location.lat, location.geometry.location.lng);
      var cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: latLang,
        radius:radius*1000,
        draggable:false  
      });
      cityCircle.setRadius(0);
      cityCircle.setMap(null);

      cityCircle.setRadius(radius*1000);
      cityCircle.setMap(map);




      

    }

    function initializeMarker(itemUpdate){
      console.log(itemUpdate);
      var title ="";
      var zoom = 4;
      if(vm.locations.length == 0){
       latLang = new google.maps.LatLng(defautLocation.lat,defautLocation.lng);
       title = defautLocation.formatted_address
     }else{
      latLang = new google.maps.LatLng(vm.locations[0].geometry.location.lat, vm.locations[0].geometry.location.lng);
      title = vm.locations[0].formatted_address
      zoom = 8;
    }
    var mapCanvas = document.getElementById('google-maps');
    var mapOptions = {
      zoom: zoom,
      center: latLang,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(mapCanvas, mapOptions);

    var infowindow = new google.maps.InfoWindow();
    

    for (var i = 0; i < vm.locations.length; i++) {
      latLang = new google.maps.LatLng(vm.locations[i].geometry.location.lat, vm.locations[i].geometry.location.lng);

      marker = new google.maps.Marker({
        map : map,
        position : latLang,
        title : vm.locations[i].formatted_address
      });

      marker.content = '<div class="infoWindowContent">'
      + marker.title + '</div>';
      creatMapsCircle(vm.locations[i],vm.locations[i].radius);

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {

          infowindow.setContent('<h2>' + marker.title + '</h2>');
          infowindow.open(map, marker);
        }

      })(marker, i));
      if( i == (vm.locations.length -1)){
        if(itemUpdate === undefined){
          map.setCenter(latLang);
        }else{
           latLang = new google.maps.LatLng(vm.locations[itemUpdate].geometry.location.lat, vm.locations[itemUpdate].geometry.location.lng);
            console.log(vm.locations[itemUpdate].geometry.location);
            console.log(latLang);
            map.setCenter(latLang);
        }
        
      }

    }
  }

  function initialize() {
    $http.get('https://api.myjson.com/bins/13sxnn')
    .then(function(res){
      if(res.status == "200"){
        vm.locations = res.data.results;  
        initializeMarker();   
      }
    });

  }


  $timeout(function(){
    initialize();
  }, 100);
}

})();
