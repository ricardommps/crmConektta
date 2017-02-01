/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.smsMarketing.contactsList', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('home.smsMarketing.contactsList', {
                url: '/contactsList',
                templateUrl: 'app/pages/smsMarketing/contactsList/contactsList.html',
                title: 'Lista de Contatos',
                controller: 'SmsMarketingPageCtrl',
                controllerAs: 'vm',
                sidebarMeta: {
                    order: 0,
                },
            });
    }

})();

