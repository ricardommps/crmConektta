
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.contacts')
        .factory('ContactsService', ContactsService); //Define o nome a função do seu .service

    function ContactsService($q, $http, API_SANDGRID) {

        var vm = this;
        vm.service ={
            listContacts   : listContacts,
            creatListToSendgrid : creatListToSendgrid
        };
        return vm.service

        function creatListToSendgrid(contactsJson) {
            var def = $q.defer();
            $http.post(API_SANDGRID.url+"contactdb",contactsJson)
                .then(function(res){
                    console.log(res);
                    def.resolve(res);

                },function(data) {
                    def.reject("Failed List All Contacts");
                })

            return def.promise;
        }

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


