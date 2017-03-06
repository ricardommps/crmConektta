
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.sms')
        .factory('ListSmsListContactsService', ListSmsListContactsService); //Define o nome a função do seu .service

    function ListSmsListContactsService($q, $http, API_CRM) {

        var vm = this;
        vm.service ={
            listAll  : listAll,
            showContactList : showContactList,
            getContatosLista : getContatosLista
        };
        return vm.service;

        function showContactList(idUser) {
            var def = $q.defer();
            var user ={
                idUser : idUser
            };
            $http.get(API_CRM.url+"sms/getListas",{
                params: user
            })
                .then(function(res){
                    def.resolve(res.data);

                },function(data) {
                    def.reject("Failed List All");
                })

            return def.promise;
        }

        function getContatosLista(idLists) {
            var def = $q.defer();
            $http.post(API_CRM.url+"sms/contactsToList",idLists)
                .then(function(res){
                    def.resolve(res.data);

                },function(data) {
                    def.reject("Failed List All");
                })

            return def.promise;
        }

        function listAll(idUser) {
            var def = $q.defer();
            var user ={
                idUser : idUser
            };
            $http.get(API_CRM.url+"sms/lists",{
                params: user
            })
                .then(function(res){
                    def.resolve(res.data);

                },function(data) {
                    def.reject("Failed List All");
                })

            return def.promise;
        }

    }
})();



