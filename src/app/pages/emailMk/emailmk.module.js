/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.emailmk', ['ui.select', 'ngSanitize',
        'BlurAdmin.pages.emailmk.advertising',
        'BlurAdmin.pages.emailmk.contacts',
        'BlurAdmin.pages.emailmk.contactsList'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('emailmk', {
                url: '/emailmk',
                abstract: true,
                template: '<div ui-view  autoscroll="true" autoscroll-body-top></div>',
                title: 'E-mail Marketing',
                sidebarMeta: {
                    icon: 'ion-stats-bars',
                    order: 150,
                },
            });
    }

})();
