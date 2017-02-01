/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.smsMarketing.contacts', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('home.smsMarketing.contacts', {
                url: '/contacts',
                templateUrl: 'app/pages/smsMarketing/contacts/contacts.html',
                title: 'Contatos',
                controller: 'SmsMarketingPageCtrl',
                controllerAs: 'vm',
                sidebarMeta: {
                    order: 0,
                },
            });
    }

})();

