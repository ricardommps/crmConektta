/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.emailMarketing.addAdvertising', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('emailMarketing.addAdvertising', {
                url: '/addAdvertising',
                templateUrl: 'app/pages/emailMarketing/advertising/addAdvertising/addAdvertising.html',
                title: 'Criar Campanha',
                controller: 'AddAdvertisingPageCtrl',
                controllerAs: 'vm',
                sidebarMeta: {
                    order: 0,
                },
            });
    }

})();

