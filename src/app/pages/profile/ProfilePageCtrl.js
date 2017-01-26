
(function () {
  'use strict';


  angular.module('BlurAdmin.pages.profile')

    .directive("ngFileSelect",ngFileSelect)
    .controller('ProfilePageCtrl', ProfilePageCtrl);

    function ngFileSelect(){
      console.log("ngFileSelect");
      return {
        link: function($scope,el){
          
          el.bind("change", function(e){
          
            $scope.file = (e.srcElement || e.target).files[0];
            $scope.getFile();
          })
          
        }
        
      }
    }

  /** @ngInject */
  function ProfilePageCtrl($scope, fileReader, $filter, $uibModal,$http) {
    var vm = this
    vm.paises =[];
    $scope.picture = $filter('profilePicture')('Nasta');
    listPaises();

    $scope.removePicture = function () {
      $scope.picture = $filter('appImage')('theme/no-photo.png');
      $scope.noPicture = true;
    };

    $scope.uploadPicture = function () {
      var fileInput = document.getElementById('uploadFile');
      console.log(fileInput);
      fileInput.click();

    };

    function listPaises(){
      var geolocationInfo = {};
      $http.get('https://gist.githubusercontent.com/jonasruth/61bde1fcf0893bd35eea/raw/10ce80ddeec6b893b514c3537985072bbe9bb265/paises-gentilicos-google-maps.json').success(function(result) {
        console.log(result);
        vm.paises = result;

      });

    }
    //angular.element(document.querySelector('#input-file-id')).on('change',handleFileSelect);
    $scope.socialProfiles = [
      {
        name: 'Facebook',
        href: 'https://www.facebook.com/akveo/',
        icon: 'socicon-facebook'
      },
      {
        name: 'Twitter',
        href: 'https://twitter.com/akveo_inc',
        icon: 'socicon-twitter'
      },
      {
        name: 'Google',
        icon: 'socicon-google'
      },
      {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/company/akveo',
        icon: 'socicon-linkedin'
      },
      {
        name: 'GitHub',
        href: 'https://github.com/akveo',
        icon: 'socicon-github'
      },
      {
        name: 'StackOverflow',
        icon: 'socicon-stackoverflow'
      },
      {
        name: 'Dribbble',
        icon: 'socicon-dribble'
      },
      {
        name: 'Behance',
        icon: 'socicon-behace'
      }
    ];

    $scope.unconnect = function (item) {
      item.href = undefined;
    };

    $scope.showModal = function (item) {
      $uibModal.open({
        animation: false,
        controller: 'ProfileModalCtrl',
        templateUrl: 'app/pages/profile/profileModal.html'
      }).result.then(function (link) {
          item.href = link;
        });
    };


    $scope.getFile = function () {
      console.log($scope.file);
      fileReader.readAsDataUrl($scope.file, $scope)
          .then(function (result) {
            $scope.picture = result;
          });
    };

    $scope.switches = [true, true, false, true, true, false];
  }

})();
