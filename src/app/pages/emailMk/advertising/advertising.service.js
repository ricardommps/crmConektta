
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.emailmk.advertising')
        .factory('AdvertisingService', AdvertisingService); //Define o nome a função do seu .service

    function AdvertisingService($q, $http, API_SANDGRID) {

        var vm = this;
        vm.service ={
            createCampaigns   : createCampaigns
        };
        return vm.service;


        function createCampaigns(json) {
            var def = $q.defer();
            $http.post(API_SANDGRID.url+"createCampaigns",json)
                .then(function(res){
                    def.resolve(res.data);

                },function(data) {
                    def.reject("Failed List All Contacts");
                })

            return def.promise;
        }

    }
})();



