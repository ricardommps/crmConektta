(function() {
    'use strict';

    angular.module('BlurAdmin.pages.email')
        .factory('ListEmailAdvertisingService', ListEmailAdvertisingService); //Define o nome a função do seu .service

    function ListEmailAdvertisingService($q, $http, API_CRM) {

        var vm = this;
        vm.service ={
            campaigns   : campaigns
        };
        return vm.service;

        function campaigns(idUser) {
            var def = $q.defer();
            var user ={
                idUser : idUser
            };

            $http.get(API_CRM.url+"email/campaigns",{
                params: user
            })
                .then(function(res){
                    def.resolve(res.data);

                },function(data) {
                    def.reject("Failed List All Campaigns");
                })

            return def.promise;
        }

    }
})();




