(function () {
    'use strict';

    angular.module('BlurAdmin.pages.inteligentWifi.public', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('home.inteligentWifi.public', {
                url: '/public',
                templateUrl: 'app/pages/inteligentWifi/public/public.html',
                title: 'Publico',
                sidebarMeta: {
                    order: 0
                },
            });
    }

})();
