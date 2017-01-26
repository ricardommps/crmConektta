
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.emailMarketing.contacts')
        .factory('ContactsService', ContactsService); //Define o nome a função do seu .service

    function ContactsService($q, $http, API_SANDGRID) {

        var vm = this;
        vm.service ={
            listContacts   : listContacts,
            contactdb : contactdb
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

        function contactdb(jsonList) {

            var def = $q.defer();
            $http.post(API_SANDGRID.url+"contactdb",jsonList)
                .then(function(res){
                    console.log(res);
                    def.resolve(res);

                },function(data) {
                    def.reject("Failed List All Contacts");
                })

            return def.promise;
        }

    }
})();


