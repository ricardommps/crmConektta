/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.smsMarketing', ['ui.select', 'ngSanitize',
        'BlurAdmin.pages.smsMarketing.advertising',
        'BlurAdmin.pages.smsMarketing.contacts',
        'BlurAdmin.pages.smsMarketing.contactsList'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('home.smsMarketing', {
                url: '/smsMarketing',
                abstract: true,
                template: '<div ui-view  autoscroll="true" autoscroll-body-top></div>',
                title: 'Sms',
                sidebarMeta: {
                    icon: 'ion-stats-bars',
                    order: 170
                },
            });
    }

})();
