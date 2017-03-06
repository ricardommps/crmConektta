(function () {
    'use strict';

    angular.module('BlurAdmin.pages.smartWifi')
        .factory('RelatoriosService', RelatoriosService); //Define o nome a função do seu .service

    function RelatoriosService($q, $http, API_CRM) {

        var vm = this;
        vm.service = {
            all: all,
            listPas: listPas
        };
        return vm.service;

        function all(json) {
            var def = $q.defer();

            $http.post(API_CRM.url + "relatorios/all", json)
                .then(function (res) {
                    def.resolve(res.data);

                }, function (data) {
                    def.reject("Failed List All Campaigns");
                })

            return def.promise;
        }

        function listPas(idUser) {
            var def = $q.defer();
            var user = {
                idUser: idUser
            };
            $http.get(API_CRM.url + "relatorios/listPas/", {
                params: user
            })
                .then(function (res) {
                    def.resolve(res);

                }, function (data) {
                    def.reject("Failed List All Contacts");
                })

            return def.promise;
        }

    }
})();




