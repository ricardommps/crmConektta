
(function () {
    'use strict';


    angular.module('BlurAdmin.pages.emailmk.contacts')
        .controller('ContactsModalCtrl',ContactsModalCtrl)
        .controller('ContactsPageCtrl', ContactsPageCtrl);


    function ContactsPageCtrl($scope, ContactsService, $uibModal) {
        var vm = this;
        vm.contacts = {};
        vm.rowSelects=[];
        vm.nameList = "";

        vm.changeValue = _changeValue;
        vm.openSaveModal = _openSaveModal;

        ContactsService.listContacts()
            .then(function(res) {
                vm.contacts = JSON.parse(res);
                console.log(vm.contacts);

            },function(data) {
                console.log("ERROR");
                //modal();
            })

        function _openSaveModal() {
            $uibModal.open({
                animation: true,
                templateUrl: "app/pages/emailmk/contacts/contactsModal.html",
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

        function  _changeValue(selected,row) {
            var index = vm.rowSelects.map(function(e) { return e.email; }).indexOf(row.email);
            var json = {
                "email": row.email,
                "first_name": row.first_name,
                "last_name": row.last_name
            };
            console.log(vm.rowSelects.indexOf(row.email));
            if(selected){
                vm.rowSelects.push(json);
            }else{
                vm.rowSelects.splice(index, 1);
            }
            console.log(vm.rowSelects);
        }


    }

    function ContactsModalCtrl($scope, $uibModalInstance, contacts, ContactsService ) {
        var vm = this;
        vm.createList = _createList;
        function _createList() {
            var jsonList ={
                listName : vm.nameList,
                contacts : [contacts]
            };

            ContactsService.contactdb(jsonList)
                .then(function(res) {
                    if(res.status == "200"){
                        $uibModalInstance.close($scope.link);
                    }
                    console.log(res);

                },function(data) {
                    console.log("ERROR");
                    //modal();
                })

        }
        $scope.link = '';
        $scope.ok = function () {
            $uibModalInstance.close($scope.link);
        };
    }


})();
