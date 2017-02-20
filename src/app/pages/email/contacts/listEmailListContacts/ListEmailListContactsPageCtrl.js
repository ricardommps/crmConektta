/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.email')

        .controller('ListEmailListContactsPageCtrl', ListEmailListContactsPageCtrl)
        .controller('ListContactsEmailList', ListContactsEmailList);

    /** @ngInject */
    function ListEmailListContactsPageCtrl( $scope, ListEmailListContactsService, $uibModal, $window) {
        //printConsole("ListEmailListContactsPageCtrl");
        var user = JSON.parse($window.localStorage.getItem('conekttaUser'));
        if(user === null){
            $state.go('signin');
        }
        var idUser = user[0].id;

        var vm = this;
        vm.contactsLists =[];
        vm.viewContacts = _viewContacts;
        vm.openModal = _openModal;

        function _openModal(item) {
            $uibModal.open({
                animation: true,
                templateUrl: "app/pages/email/contacts/listEmailListContacts/listContactsEmailListModal.html",
                controller: ListContactsEmailList,
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    contacts: function() {
                        return item;
                    }
                }
            });
        }

        function _viewContacts(item) {
            //printConsole(item);
        }
        ListEmailListContactsService.listAll(idUser)
            .then(function(res) {
                console.log(res);
                vm.contactsLists = JSON.parse(res);

            },function(data) {
                //printConsole("ERROR");
                //modal();
            })

    }

    function ListContactsEmailList($scope, $uibModalInstance, contacts, ListEmailListContactsService) {
        var vm = this;
        vm.contacts = {};

        ListEmailListContactsService.showContactList(contacts.id)
            .then(function(res) {
                vm.contacts = res.recipients;
                //printConsole(vm.contacts);

            },function(data) {
                //printConsole("ERROR");
                //modal();
            })
    }

})();

