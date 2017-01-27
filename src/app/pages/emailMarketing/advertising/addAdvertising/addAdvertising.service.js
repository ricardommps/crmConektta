
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.emailMarketing.addAdvertising')
        .factory('AddAdvertisingService', AddAdvertisingService); //Define o nome a função do seu .service

    function AddAdvertisingService($q, $http, API_SANDGRID) {

        var vm = this;
        vm.service ={
            createCampaigns   : createCampaigns,
            createAndSendEmailMk : createAndSendEmailMk,
            sendCampaigns : sendCampaigns
        };
        return vm.service;

        function sendCampaigns(json) {
            var def = $q.defer();
            $http.post(API_SANDGRID.url+"sendCampaigns",json)
                .then(function(res){
                    def.resolve(res.data);

                },function(data) {
                    def.reject("Failed Send E-Mail");
                })

            return def.promise;
        }



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



