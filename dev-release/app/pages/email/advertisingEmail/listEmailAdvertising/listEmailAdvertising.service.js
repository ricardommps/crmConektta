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

        function campaigns() {
            var def = $q.defer();
            $http.get(API_CRM.url+"campaigns")
                .then(function(res){
                    def.resolve(res.data);

                },function(data) {
                    def.reject("Failed List All Campaigns");
                })

            return def.promise;
        }

    }
})();




