
(function () {
    'use strict';


    angular.module('BlurAdmin.pages.emailMarketing.advertising')

        .controller('advertisingPageCtrl', advertisingPageCtrl);


    function advertisingPageCtrl($scope, ContactsListService, AdvertisingService, AddAdvertisingService) {
        var vm = this;
        vm.campaigns = {};

        vm.sendEmail = _sendEmail;

        function _sendEmail(item) {
            console.log(item.id);
            AddAdvertisingService.sendCampaigns(item)
                .then(function(res) {
                    if(res.errors){
                        console.log(res.errors[0].message);
                    }else{
                        console.log("sucess");
                    }



                },function(data) {
                    console.log("ERROR");
                    //modal();
                })
        }
        AdvertisingService.campaigns()
            .then(function(res) {
                vm.campaigns = res.result;
                console.log(vm.campaigns);

            },function(data) {
                console.log("ERROR");
                //modal();
            })

    };

})();
