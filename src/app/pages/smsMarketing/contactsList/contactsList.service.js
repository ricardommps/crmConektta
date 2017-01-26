
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.smsMarketing.contactsList')
        .factory('SmsMarketingService', SmsMarketingService); //Define o nome a função do seu .service

    function SmsMarketingService($q, $http, API_SANDGRID) {

        var vm = this;
        vm.service ={
            listAll  : listAll,
            showContactList : showContactList
        };
        return vm.service;

        function showContactList(id) {
            var def = $q.defer();
            $http.get(API_SANDGRID.url+"showContactList/"+id)
                .then(function(res){
                    def.resolve(res.data);

                },function(data) {
                    def.reject("Failed List All");
                })

            return def.promise;
        }

        function listAll() {
            var def = $q.defer();
            $http.get(API_SANDGRID.url+"contactsList")
                .then(function(res){
                    def.resolve(res.data);

                },function(data) {
                    def.reject("Failed List All");
                })

            return def.promise;
        }

    }
})();



