/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.smsMarketing.advertising', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('smsMarketing.advertising', {
                url: '/advertising',
                templateUrl: 'app/pages/smsMarketing/advertising/advertising.html',
                title: 'Campanha',
                controller: 'AdvertisingPageCtrl',
                controllerAs: 'vm',
                sidebarMeta: {
                    order: 0,
                },
            });
    }

})();

