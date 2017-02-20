
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.sms')
        .controller('ListSmsSendPageCtrl', ListSmsSendPageCtrl);

    /** @ngInject */
    function ListSmsSendPageCtrl($scope,ListSmsAdvertisingService,$timeout, toastr,
                                          $window,SHIPPINGVALUE)
    {
        var vm = this;
        vm.campaigns = [];
        vm.displayCampaigns = false;
        vm.displayCampaignsError = false;

        var user = JSON.parse($window.localStorage.getItem('conekttaUser'));
        if(user === null){
            $state.go('signin');
        }
        var idUser = user[0].id;
        console.log(idUser);

        var jsonEmail = {id: idUser};
        var contactsEmails = [];
        var valueEmail = parseFloat(SHIPPINGVALUE.email);

        listSendSms();
        function listSendSms() {
            ListSmsAdvertisingService.listSendSms(idUser)
                .then(function(res) {
                    console.log(res);
                    var jsonRes = JSON.parse(res);
                    vm.campaigns = jsonRes.data;
                    console.log(vm.campaigns);
                    vm.displayCampaigns = true
                    vm.displayCampaignsError = false;

                },function(data) {
                    //printConsole("ERROR");
                    vm.displayCampaignsError = true;
                    vm.displayCampaigns = false;
                })

        }


    }

})();


