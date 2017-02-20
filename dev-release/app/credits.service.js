/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.credits', [])
        .factory('credits', credits);

    /** @ngInject */
    function credits($q, $http, API_CRM) {
        var vm = this;
        vm.service ={
            balance   : balance
        };
        return vm.service;

        function balance(idUser, tpCredito) {
            var def = $q.defer();
            var url = API_CRM.url+"wordConekttaApi/balance?idUsuario=" + idUser + "&tpCredito=" + tpCredito;
            $http.get(url)
                .then(function(res){
                    def.resolve(res.data);

                },function(data) {
                    def.reject("Failed Send E-Mail");
                })

            return def.promise;
        }
    }
})();
