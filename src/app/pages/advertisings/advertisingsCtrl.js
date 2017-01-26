(function () {
  'use strict';

  angular.module('BlurAdmin.pages.advertisings')

  .directive('uploadImage', function () {
    return {
      restrict:'E',
      replace:true,
      cache:false,
      controller: 'UploadImageCtrl',
      controllerAs: 'vm',
      templateUrl: 'js/uploadImage/uploadImage.html'
      
    }
  })

  .directive('fileDropzone', function() {
    return {
      restrict: 'A',
      scope: {
        file: '=',
        fileName: '='
      },
      link: function(scope, element, attrs) {
        var checkSize,
        isTypeValid,
        processDragOverOrEnter,
        validMimeTypes;

        processDragOverOrEnter = function (event) {
          if (event != null) {
            event.preventDefault();
          }
          (event.originalEvent || event).dataTransfer.effectAllowed = 'move';
          return false;
        };


        validMimeTypes = attrs.fileDropzone;

        checkSize = function(size) {
          var _ref;
          if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
            return true;
          } else {
            alert("File must be smaller than " + attrs.maxFileSize + " MB");
            return false;
          }
        };

        isTypeValid = function(type) {
          if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
            return true;
          } else {
            alert("Invalid file type.  File must be one of following types " + validMimeTypes);
            return false;
          }
        };

        element.bind('dragover', processDragOverOrEnter);
        element.bind('dragenter', processDragOverOrEnter);

        return element.bind('drop', function(event) {
          var file, name, reader, size, type;
          if (event != null) {
            event.preventDefault();
          }
          reader = new FileReader();
          reader.onload = function(evt) {
            if (checkSize(size) && isTypeValid(type)) {
              return scope.$apply(function() {
                scope.file = evt.target.result;
                if (angular.isString(scope.fileName)) {
                  return scope.fileName = name;
                }
              });
            }
          };
          console.log(event);
          file = (event.originalEvent || event).dataTransfer.files[0];
          name = file.name;
          type = file.type;
          size = file.size;
          reader.readAsDataURL(file);
          return false;
        });
      }
    };
  })

  .directive("fileread", [function () {
    return {
      scope: {
        fileread: "="
      },
      link: function (scope, element, attributes) {
        element.bind("change", function (changeEvent) {
          var reader = new FileReader();
          reader.onload = function (loadEvent) {
            scope.$apply(function () {
              scope.fileread = loadEvent.target.result;
            });
          }
          reader.readAsDataURL(changeEvent.target.files[0]);
        });
      }
    }
  }])

  .controller('AdvertisdCtrl', AdvertisdCtrl);

  /** @ngInject */
  function AdvertisdCtrl($timeout, $http, $scope, Upload, cloudinary) {
    var vm = this;


    // --- Operaçõe referente a seleção de data --- //

    vm.dtInitial = new Date();
    vm.dtEnd = new Date();
      
    vm.dpOpenStatus = {};

    vm.setDpOpenStatus = setDpOpenStatus;

    function setDpOpenStatus(id){
      vm.dpOpenStatus[id] = true;
    }


    // --- Operaçõe referente a tela de segmentação  --- //

    vm.locations =[];
    $scope.items = [{
      id: 1,
      label: 'aLabel',
      subItem: { name: 'aSubItem' }
    }, {
      id: 2,
      label: 'bLabel',
      subItem: { name: 'bSubItem' }
    }];
    
    vm.addCity = addCity;
    vm.removeCity = removeCity;
    vm.updateItem = updateItem;
    vm.city = "";
    vm.save = save;
    var range = 40;
    var map;
    var latLang;
    var marker;
    var defautLocation = {
      "lat" : -12.510784,
      "lng" : -51.820115,
      "formatted_address" : "Brasil"
    }
   // var cityCircle;


   function updateItem(item){
    var index = vm.locations.indexOf(item);
    initializeMarker(index);

  }

  $scope.rangeChangeCallback = function(sliderObj){ 
    range = sliderObj.from;
    console.log(sliderObj);
  }

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

// Upload Image
var cloud_name = 'dtjwulffm';
var upload_preset = 'jbzyihtn';
vm.imageUrl = '';
vm.showControls = true;
vm.fit = true;
vm.fileSelected = fileSelected;

$scope.image = null;
$scope.imageFileName = '';

$scope.uploadme = {};
$scope.uploadme.src = '';

vm.myButtonLabels = {
  rotateLeft: '',
  rotateRight: '',
  zoomIn: '',
  zoomOut: '',
  fit: '',
  crop: ' Salvar' 
};

function fileSelected(files){

  console.log(vm.imageUrl);
}

$scope.$watch('files', function () { 
      //$scope.upload($scope.files);
      console.log("DSKNDSNDSNDSKJ");
    });

vm.updateResultImage = function(base64) {
  if(vm.resultImage){
    vm.resultImage = base64;
    uploadImage();
  }
  vm.resultImage = base64;
      $scope.$apply(); // Apply the changes.
      //uploadImage();
    };

    vm.cropperApi = function(cropperApi) {
      vm.resultImage = cropperApi.crop();
      $scope.$apply();
     // cropperApi.rotate(270);
     // cropperApi.fit();
     // vm.resultImage = cropperApi.crop();
     // $scope.$apply(); // Apply the changes.
   };

   var handleFileSelect=function(evt) {
    console.log("handleFileSelect");
    vm.imageUrl = '';
    var file=evt.currentTarget.files[0];
    var reader = new FileReader();
    reader.onload = function (evt) {
      $scope.$apply(function($scope){
        // console.log(evt.target.result);
        console.log(evt);
        vm.imageUrl =evt.target.result;
        console.log(vm.imageUrl);
      });
    };

    reader.readAsDataURL(file);

  };



  angular.element(document.querySelector('#input-file-id')).on('change',handleFileSelect);


  function uploadImage() {

    Upload.upload({
      url: "https://api.cloudinary.com/v1_1/" + cloud_name + "/upload",
      fields: {
        upload_preset: upload_preset,
        tags: 'myphotoalbum',
        context: 'photo',
      },
      file: vm.resultImage
    })
    .success(function (data, status, headers, config) {
      alert("Sucesso")
    }).error(function (data, status, headers, config) {
      alert("Error")
    });
  }
  
  //Fim
}

// --- Operaçõe referente a Upload da imagem  --- //

})();

