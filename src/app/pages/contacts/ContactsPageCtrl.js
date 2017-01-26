
(function () {
    'use strict';


    angular.module('BlurAdmin.pages.contacts')

        .controller('ContactsModalCtrl', ContactsModalCtrl)
        .controller('ContactsPageCtrl', ContactsPageCtrl);

    function ContactsModalCtrl($scope, $uibModalInstance, contacts) {
        var vm = this;
        vm.createList = _createList;
        console.log(contacts);
        function _createList() {
            var jsonList ={
                listName : vm.nameList,
                recipients : [contacts]
            };
            console.log(jsonList);
        }
        $scope.link = '';
        $scope.ok = function () {
            $uibModalInstance.close($scope.link);
        };
    }

    function ContactsPageCtrl($scope, ContactsService, $uibModal) {
        var vm = this;
        vm.contacts = {};
        vm.rowSelects=[];
        vm.nameList = "";

        vm.changeValue = _changeValue;
        vm.createList = _createList;
        vm.openSaveModal = _openSaveModal;

        function _openSaveModal() {
            $uibModal.open({
                animation: true,
                templateUrl: "app/pages/contacts/contactsModal.html",
                controller: ContactsModalCtrl,
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    contacts: function() {
                        return vm.rowSelects;
                    }
                }
            });
        }




        function _createList() {

            var jsonList ={
                listName : vm.nameList,
                recipients : [vm.rowSelects]
            };
            console.log(jsonList);
            /*ContactsService.creatListToSendgrid(vm.rowSelects)
                .then(function(res) {
                    vm.contacts = JSON.parse(res);
                    console.log(vm.contacts);

                },function(data) {
                    console.log("ERROR");
                    //modal();
                })*/

        }

        function  _changeValue(selected,row) {
            var index = vm.rowSelects.indexOf(row);
            var json = {
                "email": row.email,
                "first_name": row.first_name,
                "last_name": row.last_name
            };
            console.log(json);
            console.log(index);
            if(selected){
                vm.rowSelects.push(json);
            }else{
                vm.rowSelects.splice(index, 1);
            }
            console.log(vm.rowSelects);
        }

        ContactsService.listContacts()
            .then(function(res) {
                vm.contacts = JSON.parse(res);
                console.log(vm.contacts);

            },function(data) {
                console.log("ERROR");
                //modal();
            })


    };


})();
