
(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('PageTopCtrl', PageTopCtrl);

    function PageTopCtrl($scope, $state, $window) {
        var user = JSON.parse($window.localStorage.getItem('conekttaUser'));
        if (user === null) {
            $state.go('signin');
        }
      //  var idUser = user[0].id;

        var vm = this;
        var userGender = user[0].gender;
        if(userGender == "f"){
            vm.gender = "Female"
        }else if(userGender == "m"){
            vm.gender = "Male"
        }else{
            vm.gender = "User"
        }

        $scope.signout = function() {
            localStorage.clear();
            $state.go('signin');
        };

        $scope.mySmartWifi = function() {
            $state.go("home.mySmartWifi.establishments");
        };


    }
})();