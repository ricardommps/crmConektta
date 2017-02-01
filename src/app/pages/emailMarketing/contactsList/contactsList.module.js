/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.emailMarketing.contactsList', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('home.emailMarketing.contactsList', {
                url: '/contactsList',
                templateUrl: 'app/pages/emailMarketing/contactsList/contactsList.html',
                title: 'Lista de Contatos',
                controller: 'ContactsListPageCtrl',
                controllerAs: 'vm',
                sidebarMeta: {
                    order: 0,
                },
            });
    }

})();

