
(function () {
    'use strict';


    angular.module('BlurAdmin.pages.emailmk.advertising')

        .controller('AdvertisingPageCtrl', AdvertisingPageCtrl);


    function AdvertisingPageCtrl($scope, ContactsListService, AdvertisingService) {
        var vm = this;
        vm.advertising={};
        vm.save = _save;
        var listsIds = [];
        vm.contactsLists =[];

        ContactsListService.listAll()
            .then(function(res) {
                vm.contactsLists = res.lists;

            },function(data) {
                console.log("ERROR");
                //modal();
            })

        vm.createListSms = _createListSms;

        function _createListSms() {
            console.log("_createListSms");
        }

        function _save() {
            vm.list_ids =[];
            for(var i=0; i<vm.listsIds.length;i++){
                vm.list_ids.push(vm.listsIds[i].id);
            }
            var json =
            {
                "title": vm.advertising.title,
                "subject": vm.advertising.subject,
                "sender_id": 100787,
                "list_ids": vm.list_ids,
                "categories": [
                "spring line"
            ],
                "suppression_group_id": 2321,
                "custom_unsubscribe_url": "",
                "html_content": "<html><head><title></title></head><body>" + vm.advertising.html_content + "<a href='[unsubscribe]'>Click Here to Unsubscribe</a></body></html>",
                "plain_content": "Check out our spring line! [unsubscribe]"
            };

            AdvertisingService.createCampaigns(json)
                .then(function(res) {
                   console.log(res);

                },function(data) {
                    console.log("ERROR");
                    //modal();
                })
        }




    };


})();
