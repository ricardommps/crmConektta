/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.emailmk.advertising', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('emailmk.advertising', {
                url: '/advertising',
                templateUrl: 'app/pages/emailmk/advertising/advertising.html',
                title: 'Campanha',
                controller: 'AdvertisingPageCtrl',
                controllerAs: 'vm',
                sidebarMeta: {
                    order: 0,
                },
            });
    }

})();

