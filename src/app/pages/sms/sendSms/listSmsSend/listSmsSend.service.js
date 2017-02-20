(function() {
    'use strict';

    angular.module('BlurAdmin.pages.sms')
        .factory('ListSmsAdvertisingService', ListSmsAdvertisingService); //Define o nome a função do seu .service

    function ListSmsAdvertisingService($q, $http, API_CRM) {

        var vm = this;
        vm.service ={
            listSendSms   : listSendSms
        };
        return vm.service;

        function listSendSms(idUser) {
            var def = $q.defer();
            var user ={
                idUser : idUser
            };
            console.log(user);
            $http.get(API_CRM.url+"sms/campaigns",{
                params: user
            })
                .then(function(res){
                    def.resolve(res.data);

                },function(data) {
                    def.reject("Failed List All Campaigns");
                })

            return def.promise;
        }

    }
})();




