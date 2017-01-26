/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.inteligentWifi', ['ui.select', 'ngSanitize',
        'BlurAdmin.pages.inteligentWifi.dashboard',
        'BlurAdmin.pages.inteligentWifi.public'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('inteligentWifi', {
                url: '/inteligentWifi',
                abstract: true,
                template: '<div ui-view  autoscroll="true" autoscroll-body-top></div>',
                title: 'InteligentWifi',
                sidebarMeta: {
                    icon: 'ion-stats-bars',
                    order: 150,
                },
            });
    }

})();