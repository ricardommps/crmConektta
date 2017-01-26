
(function () {
    'use strict';


    angular.module('BlurAdmin.pages.emailmk.contactsList')
        .controller('ContactsModalCtrl', ContactsModalCtrl)
        .controller('ContactsListPageCtrl', ContactsListPageCtrl);


    function ContactsListPageCtrl($scope, ContactsListService, $uibModal) {

        var vm = this;
        vm.contactsLists =[];
        vm.viewContacts = _viewContacts;
        vm.openModal = _openModal;

        function _openModal(item) {
            $uibModal.open({
                animation: true,
                templateUrl: "app/pages/emailmk/contactsList/contactsModal.html",
                controller: ContactsModalCtrl,
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    contacts: function() {
                        return item;
                    }
                }
            });
        }

        function _viewContacts(item) {
            console.log(item);
        }
        ContactsListService.listAll()
            .then(function(res) {
               vm.contactsLists = res.lists;

            },function(data) {
                console.log("ERROR");
                //modal();
            })


    };


    function ContactsModalCtrl($scope, $uibModalInstance, contacts, ContactsListService) {
        var vm = this;
        vm.contacts = {};

        ContactsListService.showContactList(contacts.id)
            .then(function(res) {
                vm.contacts = res.recipients;
                console.log(vm.contacts);

            },function(data) {
                console.log("ERROR");
                //modal();
            })
    }


})();
