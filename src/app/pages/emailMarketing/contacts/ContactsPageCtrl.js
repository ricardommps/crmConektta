
(function () {
    'use strict';


    angular.module('BlurAdmin.pages.emailMarketing.contacts')
        .controller('ContactsModalCtrl',ContactsModalCtrl)
        .controller('ContactsPageCtrl', ContactsPageCtrl);


    function ContactsPageCtrl($scope, ContactsService, $uibModal, $timeout) {
        var vm = this;
        vm.contacts = {};
        vm.rowSelects=[];
        vm.nameList = "";

        vm.displayContcts = false;
        vm.displayContctsError = false;

        vm.changeValue = _changeValue;
        vm.openSaveModal = _openSaveModal;

        $scope.$on("refreshListContacts",function () {
            vm.displayContcts = false;
            vm.displayContctsError = false;
            listContacts();
        });

        function listContacts() {
            ContactsService.listContacts()
                .then(function(res) {
                    var json = JSON.parse(res);
                    vm.contacts = json.data;
                    vm.displayContcts = true;
                    vm.displayContctsError = false;

                },function(data) {
                    console.log("ERROR");
                    vm.displayContcts = false;
                    vm.displayContctsError = true;
                })
        }

        $timeout(listContacts, 1000);

        function _openSaveModal() {
            $uibModal.open({
                animation: true,
                templateUrl: "app/pages/emailMarketing/contacts/contactsModal.html",
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

    function ContactsModalCtrl($scope, $rootScope, $uibModalInstance, contacts, ContactsService, toastr ) {
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
                        toastr.success('Lista de contatos criada com sucesso!');
                        $uibModalInstance.close($scope.link);
                        $rootScope.$broadcast("refreshListContacts");
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
