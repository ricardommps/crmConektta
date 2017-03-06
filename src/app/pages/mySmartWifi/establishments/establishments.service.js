(function () {
    'use strict';

    angular.module('BlurAdmin.pages.mySmartWifi')
        .factory('EstablishmentsService', EstablishmentsService); //Define o nome a função do seu .service

    function EstablishmentsService($q, $http, API_CRM) {

        var vm = this;
        vm.service = {
            queryLicense    : queryLicense,
            list            : list
        };
        return vm.service;

        function queryLicense(licensa) {
            var def = $q.defer();
            var licensa = {
                licensa: licensa
            };
            $http.get(API_CRM.url + "usuariosSmartWifi/queryLicense", {
                params: licensa
            })
                .then(function (res) {
                    def.resolve(res.data);

                }, function (data) {
                    def.reject("Failed List All");
                })

            return def.promise;
        }

        function list(idUser) {
            var def = $q.defer();
            var idUser = {
                idUser: idUser
            };
            $http.get(API_CRM.url + "usuariosSmartWifi/list", {
                params: idUser
            })
                .then(function (res) {
                    def.resolve(res.data);

                }, function (data) {
                    def.reject("Failed List All");
                })

            return def.promise;
        }

    }
})();



