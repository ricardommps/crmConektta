/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.emailMarketing.contacts', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('home.emailMarketing.contacts', {
                url: '/contacts',
                templateUrl: 'app/pages/emailMarketing/contacts/contacts.html',
                title: 'Contatos',
                controller: 'ContactsPageCtrl',
                controllerAs: 'vm',
                sidebarMeta: {
                    order: 0,
                },
            });
    }

})();

