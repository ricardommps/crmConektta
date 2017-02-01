
(function() {
    'use strict';

    angular.module('BlurAdmin.signin')
        .factory('SigninService', SigninService); //Define o nome a função do seu .service

    function SigninService($q, $http, API_SANDGRID) {

        var vm = this;
        vm.service ={
            login   : login
        };
        return vm.service;

        vm.data ={};

        function login(user) {
            var config = {
                params: user,
                headers : {'Accept' : 'application/json'}
            };
            var url = API_SANDGRID.url+"login";
            var def = $q.defer();
            $http.get(url,config)
                .then(function(res){
                    console.log(res);
                    //var json = JSON.parse(res.data);
                    def.resolve(res.data);

                },function(data) {
                    def.reject("Failed");
                })

            return def.promise;
        }

    }
})();




