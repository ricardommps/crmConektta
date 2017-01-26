/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.emailmk.contactsList', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('emailmk.contactsList', {
                url: '/contactsList',
                templateUrl: 'app/pages/emailmk/contactsList/contactsList.html',
                title: 'Lista de Contatos',
                controller: 'ContactsListPageCtrl',
                controllerAs: 'vm',
                sidebarMeta: {
                    order: 0,
                },
            });
    }

})();

