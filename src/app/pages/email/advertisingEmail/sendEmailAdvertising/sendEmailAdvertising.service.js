
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.email')
        .factory('SendEmailAdvertisingService', SendEmailAdvertisingService); //Define o nome a função do seu .service

    function SendEmailAdvertisingService($q, $http, API_CRM) {

        var vm = this;
        vm.service ={
            createCampaigns   : createCampaigns,
            createAndSendEmailMk : createAndSendEmailMk,
            listAllContacts : listAllContacts,
            sendCampaigns : sendCampaigns,
            listVerifiedEmailAddresses : listVerifiedEmailAddresses,
            verifyEmailIdentity : verifyEmailIdentity
        };
        return vm.service;

        function listAllContacts(lists) {
            var def = $q.defer();
            var user ={
                idUser : idUser
            };
            $http.get(API_CRM.url+"contactdb",{
                params: user
            })
                .then(function(res){
                    console.log(res);
                    //printConsole(res);
                    def.resolve(res);

                },function(data) {
                    def.reject("Failed List All Contacts");
                })

            return def.promise;
        }

        function verifyEmailIdentity(json) {
            var def = $q.defer();
            var email = {
                email: json
            };

            $http.get(API_CRM.url+"smtpAmazon/verifyEmailIdentity",{
                params: email
            })
                .then(function(res){
                    console.log(res);
                    def.resolve(res);

                },function(data) {
                    def.reject("Failed Send E-Mail");
                })
            return def.promise;


        }

        function listVerifiedEmailAddresses(json) {
            var def = $q.defer();

            $http.get(API_CRM.url+"smtpAmazon/listVerifiedEmailAddresses",{
                params: json
            })
                .then(function(res){
                    console.log(res);
                    def.resolve(res);

                },function(data) {
                    def.reject("Failed Send E-Mail");
                })
            return def.promise;


        }

        function sendCampaigns(json) {
            var def = $q.defer();
            $http.post(API_CRM.url+"sendCampaigns",json)
                .then(function(res){
                    def.resolve(res.data);

                },function(data) {
                    def.reject("Failed Send E-Mail");
                });

            return def.promise;
        }



        function createAndSendEmailMk(json) {
            var def = $q.defer();
            $http.post(API_CRM.url+"createAndSendEmailMk",json)
                .then(function(res){
                    def.resolve(res.data);

                },function(data) {
                    def.reject("Failed Send E-Mail");
                })

            return def.promise;
        }


        function createCampaigns(json) {
            var def = $q.defer();
            console.log(json);
            $http.post(API_CRM.url+"email/campaigns",json)
                .then(function(res){
                    def.resolve(res.data);

                },function(data) {
                    def.reject("Failed");
                })

            return def.promise;
        }

    }
})();



