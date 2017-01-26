(function () {
    'use strict';

    angular.module('BlurAdmin.pages.inteligentWifi.dashboard', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('inteligentWifi.dashboard', {
                url: '/dashboard',
                templateUrl: 'app/pages/inteligentWifi/dashboard/dashboard.html',
                title: 'Principal',
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 0,
                },
            });
    }

})();
