/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.emailMarketing', ['ui.select', 'ngSanitize',
        'BlurAdmin.pages.emailMarketing.addAdvertising',
        'BlurAdmin.pages.emailMarketing.advertising',
        'BlurAdmin.pages.emailMarketing.contacts',
        'BlurAdmin.pages.emailMarketing.contactsList'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('emailMarketing', {
                url: '/emailMarketing',
                abstract: true,
                template: '<div ui-view  autoscroll="true" autoscroll-body-top></div>',
                title: 'E-mail Marketing',
                sidebarMeta: {
                    icon: 'ion-stats-bars',
                    order: 160,
                },
            });
    }

})();
