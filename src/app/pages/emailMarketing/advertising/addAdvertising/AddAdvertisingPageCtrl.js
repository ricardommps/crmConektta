
(function () {
    'use strict';


    angular.module('BlurAdmin.pages.emailMarketing.addAdvertising')

        .controller('AddAdvertisingPageCtrl', AddAdvertisingPageCtrl);


    function AddAdvertisingPageCtrl($scope, ContactsListService, AddAdvertisingService) {
        var vm = this;
        vm.advertising={};
        vm.totalEmails = 0;
        vm.contactsLists =[];

        vm.send = _send;
        vm.create = _create;

        var listsIds = [];
        var contactsEmails = [];
        var listAllcontactsEmails =[];


        $scope.someFunction = function (item){
            showContactList(item.id);


        };

        $scope.removeFunction = function (item){
            contactsEmails = [];
            if(vm.listsIds.length>0){
                angular.forEach(vm.listsIds, function(value1, key1) {
                    showContactList(value1.id);
                })
            }else{
                vm.totalEmails = 0;
            }

        };
        
        function _create() {
            
        }
        function countEmails(contact) {
            angular.forEach(contact, function(value1, key1) {
                contactsEmails.push(value1.email);
            });

            contactsEmails = unique(contactsEmails);
            vm.totalEmails = contactsEmails.length;
            console.log(contactsEmails);

            
        }
        
        function unique(collection) {
            var output = [],
                keys = [];

            angular.forEach(collection, function(item) {
                // we check to see whether our object exists
                var key = item;
                // if it's not already part of our keys array
                if(keys.indexOf(key) === -1) {
                    // add it to our keys array
                    keys.push(key);
                    // push this item to our final output array
                    output.push(item);
                }
            });
            // return our array which should be devoid of
            // any duplicates
            return output;
        }
        function showContactList(listId) {
            console.log(listId);
            ContactsListService.showContactList(listId)
                .then(function(res) {
                    countEmails(res.recipients);

                },function(data) {
                    console.log("ERROR");
                    //modal();
                })
        }

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

            AddAdvertisingService.createAndSendEmailMk(json)
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
