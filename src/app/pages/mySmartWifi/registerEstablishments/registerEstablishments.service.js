
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.mySmartWifi')
        .factory('RegisterEstablishmentsService', RegisterEstablishmentsService); //Define o nome a função do seu .service

    function RegisterEstablishmentsService($q, $http, API_CRM) {

        var vm = this;
        vm.service ={
            register  : register
        };
        return vm.service;

        function register(jsonParans) {
            var def = $q.defer();
            $http.post(API_CRM.url+"usuariosSmartWifi/register",jsonParans)
                .then(function(res){
                    def.resolve(res.data);

                },function(data) {
                    def.reject("Failed");
                });

            return def.promise;
        }

    }
})();



