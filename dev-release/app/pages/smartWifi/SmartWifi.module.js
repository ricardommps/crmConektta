/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.smartWifi', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('home.smartWifi', {
                url: '/smartWifi',
                templateUrl: 'app/pages/smartWifi/smartWifi.html',
                abstract: true,
                title: 'SMART WIFI',
                sidebarMeta: {
                    icon: 'ion-ios-location-outline',
                    order: 120
                }
            })
            .state('home.smartWifi.dashboard', {
                url: '/dashboard',
                templateUrl: 'app/pages/smartWifi/dashboard//dashboard.html',
                title: 'PRINCIPAL',
                sidebarMeta: {
                    order: 0
                }
            });
    }

})();

