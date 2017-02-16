
(function() {
    'use strict';

    angular.module('BlurAdmin.userInfo', [])
        .factory('UserInfo', UserInfo);

    function UserInfo($q, $window) {
        var vm = this;
        vm.service ={
            user   : user
        };
        return vm.service;

        function user() {
            var def = $q.defer();
            var user = JSON.parse($window.localStorage.getItem('conekttaUser'));
            def.resolve(user);

            return def.promise;
        }
    }
})();
