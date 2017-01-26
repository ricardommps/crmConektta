
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.emailMarketing.advertising')
        .factory('AdvertisingService', AdvertisingService); //Define o nome a função do seu .service

    function AdvertisingService($q, $http, API_SANDGRID) {

        var vm = this;
        vm.service ={
            createCampaigns   : createCampaigns,
            createAndSendEmailMk : createAndSendEmailMk
        };
        return vm.service;

        function createAndSendEmailMk(json) {
            var def = $q.defer();
            $http.post(API_SANDGRID.url+"createAndSendEmailMk",json)
                .then(function(res){
                    def.resolve(res.data);

                },function(data) {
                    def.reject("Failed Send E-Mail");
                })

            return def.promise;
        }


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



