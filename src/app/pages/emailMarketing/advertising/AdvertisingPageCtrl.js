
(function () {
    'use strict';


    angular.module('BlurAdmin.pages.emailMarketing.advertising')

        .controller('AdvertisingPageCtrl', AdvertisingPageCtrl);


    function AdvertisingPageCtrl($scope, ContactsListService, AdvertisingService) {
        var vm = this;
        vm.advertising={};
        vm.send = _send;
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

        function _send() {
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
                "html_content": vm.advertising.html_content + "<a href='[unsubscribe]'>Click Here to Unsubscribe</a>",
                "plain_content": "Check out our spring line! [unsubscribe]"
            };

            AdvertisingService.createAndSendEmailMk(json)
                .then(function(res) {
                   if(res.status === "Scheduled"){
                        console.log("sucesso");
                   }else{
                       console.log("erro");
                   }

                },function(data) {
                    console.log("ERROR");
                    //modal();
                })
        }




    };


})();
