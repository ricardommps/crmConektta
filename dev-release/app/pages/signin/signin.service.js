
(function() {
    'use strict';

    angular.module('BlurAdmin.signin')
        .factory('SigninService', SigninService); //Define o nome a função do seu .service

    function SigninService($q, $http, API_CRM) {

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
            console.log(config);
            var url = API_CRM.url+"login";
            console.log(url);
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




