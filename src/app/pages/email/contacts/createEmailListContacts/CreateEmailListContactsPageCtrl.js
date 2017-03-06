/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.email')
        .controller('CreateEmailListContactsPageCtrl', CreateEmailListContactsPageCtrl)
        .controller('NameListContacts', NameListContacts);


    /** @ngInject */
    function CreateEmailListContactsPageCtrl($scope, CreateEmailListContactsService,
                                             $uibModal, $timeout, $window) {
        var user = JSON.parse($window.localStorage.getItem('conekttaUser'));
        if(user === null){
            $state.go('signin');
        }
        var idUser = user[0].id;

        var vm = this;
        vm.contacts = {};
        vm.rowSelects=[];
        vm.nameList = "";

        vm.displayContcts = false;
        vm.displayContctsError = false;

        vm.changeValue = _changeValue;
        vm.openSaveModal = _openSaveModal;
        vm.selectItem = _selectItem;


        var updateSelected = function (action, id) {
            if (action == 'add' & $scope.selected.indexOf(id) == -1) $scope.selected.push(id);
            if (action == 'remove' && $scope.selected.indexOf(id) != -1) $scope.selected.splice($scope.selected.indexOf(id), 1);
        };

        function _selectItem($event, id) {
            var checkbox = $event.target;
            var action = (checkbox.checked ? 'add' : 'remove');
            updateSelected(action, id);
        }

        $scope.selected = [];
        $scope.isSelected = function (id) {
            return $scope.selected.indexOf(id) >= 0;
        };

        $scope.$on("refreshListContacts",function () {
            vm.displayContcts = false;
            vm.displayContctsError = false;
            listContacts();
        });

        function listContacts() {
            CreateEmailListContactsService.listContacts(idUser)
                .then(function(res) {
                    if(res.status){
                        //printConsole(res.data.data)
                    }
                    //var json = JSON.parse(res);
                    vm.contacts = JSON.parse(res.data);
                    vm.displayContcts = true;
                    vm.displayContctsError = false;

                },function(data) {
                    //printConsole("ERROR");
                    vm.displayContcts = false;
                    vm.displayContctsError = true;
                })
        }

        $timeout(listContacts, 1000);

        function _openSaveModal() {
            $uibModal.open({
                animation: true,
                templateUrl: "app/pages/email/contacts/createEmailListContacts/nameListContactsModal.html",
                controller: NameListContacts,
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    contacts: function() {
                        return $scope.selected;
                    },
                    ussr: function() {
                        return idUser;
                    },
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
            //printConsole(vm.rowSelects.indexOf(row.email));
            if(selected){
                vm.rowSelects.push(json);
            }else{
                vm.rowSelects.splice(index, 1);
            }
            //printConsole(vm.rowSelects);
        }
    }

    function NameListContacts($scope, $rootScope, $uibModalInstance, contacts,ussr,
                              CreateEmailListContactsService, toastr ) {
        var vm = this;
        vm.createList = _createList;
        function _createList() {
            var jsonList ={
                id_dono_lista : ussr,
                nome_lista : vm.nameList,
                contatos : contacts
            };

            CreateEmailListContactsService.createLists(jsonList)
                .then(function(res) {
                    if(res.status == "200"){
                        toastr.success('Lista de contatos criada com sucesso!');
                        $uibModalInstance.close($scope.link);
                        $rootScope.$broadcast("refreshListContacts");
                    }
                    //printConsole(res);

                },function(data) {
                    //printConsole("ERROR");
                    //modal();
                })

        }
        $scope.link = '';
        $scope.ok = function () {
            $uibModalInstance.close($scope.link);
        };
    }

})();

