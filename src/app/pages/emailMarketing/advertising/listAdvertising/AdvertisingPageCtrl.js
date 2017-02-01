
(function () {
    'use strict';


    angular.module('BlurAdmin.pages.emailMarketing.advertising')

        .controller('advertisingPageCtrl', advertisingPageCtrl);


    function advertisingPageCtrl($scope, ContactsListService, AdvertisingService,
                                 AddAdvertisingService, $timeout, toastr) {
        var vm = this;
        vm.campaigns = {};
        vm.displayCampaigns = false;
        vm.displayCampaignsError = false;

        vm.sendEmail = _sendEmail;

        function _sendEmail(item) {
            console.log(item.id);
            AddAdvertisingService.sendCampaigns(item)
                .then(function(res) {
                    if(res.errors){
                        console.log(res.errors[0].message);
                        toastr.error("Erro ao enviar campanha!", 'Error');
                    }else{
                        console.log("sucess");
                        toastr.success('Campanha enviada com sucesso!');
                        vm.displayCampaigns = false;
                        vm.displayCampaignsError = false;
                        $timeout(listCampaigns, 1000);
                    }



                },function(data) {
                    console.log("ERROR");
                    //modal();
                })
        }

        function listCampaigns() {
            AdvertisingService.campaigns()
                .then(function(res) {
                    vm.campaigns = res.result;
                    vm.displayCampaigns = true
                    vm.displayCampaignsError = false;

                },function(data) {
                    console.log("ERROR");
                    vm.displayCampaignsError = true;
                    vm.displayCampaigns = false;
                })
        }

        $timeout(listCampaigns, 1000);



    }

})();
