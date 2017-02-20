
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.email')
        .factory('ListEmailListContactsService', ListEmailListContactsService); //Define o nome a função do seu .service

    function ListEmailListContactsService($q, $http, API_CRM) {

        var vm = this;
        vm.service ={
            listAll  : listAll,
            showContactList : showContactList
        };
        return vm.service;

        function showContactList(id) {
            var def = $q.defer();
            $http.get(API_CRM.url+"showContactList/"+id)
                .then(function(res){
                    def.resolve(res.data);

                },function(data) {
                    def.reject("Failed List All");
                })

            return def.promise;
        }

        function listAll() {
            var def = $q.defer();
            $http.get(API_CRM.url+"contactsList")
                .then(function(res){
                    def.resolve(res.data);

                },function(data) {
                    def.reject("Failed List All");
                })

            return def.promise;
        }

    }
})();



