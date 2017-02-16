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
    function ListEmailListContactsPageCtrl( $scope, ListEmailListContactsService, $uibModal) {
        //printConsole("ListEmailListContactsPageCtrl");
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
        ListEmailListContactsService.listAll()
            .then(function(res) {
                vm.contactsLists = res.lists;

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

