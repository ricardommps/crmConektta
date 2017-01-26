/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.emailmk.contacts', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('emailmk.contacts', {
                url: '/contacts',
                templateUrl: 'app/pages/emailmk/contacts/contacts.html',
                title: 'Contatos',
                controller: 'ContactsPageCtrl',
                controllerAs: 'vm',
                sidebarMeta: {
                    order: 0,
                },
            });
    }

})();

