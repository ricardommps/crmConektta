
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.sms')

        .controller('ListSmsListContactsPageCtrl', ListSmsListContactsPageCtrl)
        .controller('ListContactsSmsList', ListContactsSmsList);

    /** @ngInject */
    function ListSmsListContactsPageCtrl( $scope, ListSmsListContactsService, $uibModal, $window) {
        //printConsole("ListEmailListContactsPageCtrl");
        var user = JSON.parse($window.localStorage.getItem('conekttaUser'));
        if(user === null){
            $state.go('signin');
        }
        var idUser = user[0].id;

        var vm = this;
        vm.contactsLists =[];



        ListSmsListContactsService.listAll(idUser)
            .then(function(res) {
                vm.contactsLists = JSON.parse(res);

            },function(data) {
                //printConsole("ERROR");
                //modal();
            })

    }

    function ListContactsSmsList($scope, $uibModalInstance, contacts, ListEmailListContactsService) {
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


