
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.emailMarketing.advertising')
        .factory('AdvertisingService', AdvertisingService); //Define o nome a função do seu .service

    function AdvertisingService($q, $http, API_SANDGRID) {

        var vm = this;
        vm.service ={
            campaigns   : campaigns
        };
        return vm.service;

        function campaigns() {
            var def = $q.defer();
            $http.get(API_SANDGRID.url+"campaigns")
                .then(function(res){
                    def.resolve(res.data);

                },function(data) {
                    def.reject("Failed List All Campaigns");
                })

            return def.promise;
        }

    }
})();



