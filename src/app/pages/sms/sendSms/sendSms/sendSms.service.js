
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.sms')
        .factory('SendSmsAdvertisingService', SendSmsAdvertisingService); //Define o nome a função do seu .service

    function SendSmsAdvertisingService($q, $http, API_CRM) {

        var vm = this;
        vm.service ={
            createSms   : createSms
        };
        return vm.service;


        function createSms(json) {
            var def = $q.defer();
            console.log(json);
            $http.post(API_CRM.url+"sms/campaigns",json)
                .then(function(res){
                    def.resolve(res.data);

                },function(data) {
                    def.reject("Failed");
                })

            return def.promise;
        }









    }
})();




