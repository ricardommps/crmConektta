
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.sms')
        .factory('CreateSmsListContactsService', CreateSmsListContactsService); //Define o nome a função do seu .service

    function CreateSmsListContactsService($q, $http, API_CRM, API_WORLD_CONEKTTA) {

        var vm = this;
        vm.service ={
            contacts   : contacts,
            createLists : createLists
        };
        return vm.service;


        function contacts(idUser) {
            var def = $q.defer();
            var user ={
                idUser : idUser
            };
            $http.get(API_CRM.url+"sms/contacts",{
                params: user
            })
                .then(function(res){
                    def.resolve(res);

                },function(data) {
                    def.reject("Falha ao listar contatos");
                })

            return def.promise;
        }

        function createLists(jsonList) {

            var def = $q.defer();
            $http.post(API_CRM.url+"sms/createLists",jsonList)
                .then(function(res){
                    def.resolve(res);
                },function(data) {
                    def.reject("Falha ao criar lista");
                })
            return def.promise;
        }

    }
})();



