/**
 * Created by ricar on 09/02/2017.
 */

(function() {
    'use strict';

    angular.module('BlurAdmin.pages.email')
        .factory('CreateEmailListContactsService', CreateEmailListContactsService); //Define o nome a função do seu .service

    function CreateEmailListContactsService($q, $http, API_CRM, API_WORLD_CONEKTTA) {

        var vm = this;
        vm.service ={
            listContacts   : listContacts,
            createLists : createLists
        };
        return vm.service;


        function listContacts(idUser) {
            var def = $q.defer();
            var user ={
                idUser : idUser
            };
            $http.get(API_CRM.url+"usuariosSmartWifi",{
                params: user
            })
                .then(function(res){
                    console.log(res);
                    def.resolve(res);

                },function(data) {
                    def.reject("Failed List All Contacts");
                })

            return def.promise;
        }

        function createLists(jsonList) {

            var def = $q.defer();
            $http.post(API_CRM.url+"email/createLists",jsonList)
                .then(function(res){
                    //printConsole(res);
                    def.resolve(res);

                },function(data) {
                    def.reject("Failed List All Contacts");
                })

            return def.promise;
        }

    }
})();



