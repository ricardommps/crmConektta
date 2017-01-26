
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.smsMarketing.contacts')
        .factory('SmsMarketingService', SmsMarketingService); //Define o nome a função do seu .service

    function SmsMarketingService($q, $http, API_SANDGRID) {

        var vm = this;
        vm.service ={
            listContacts   : listContacts
        };
        return vm.service;


        function listContacts() {
            var def = $q.defer();
            $http.get(API_SANDGRID.url+"contactsConektta")
                .then(function(res){
                    def.resolve(res.data);

                },function(data) {
                    def.reject("Failed List All Contacts");
                })

            return def.promise;
        }

    }
})();



