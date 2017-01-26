/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages', [
        'ui.router',

        'BlurAdmin.pages.dashboard',
        'BlurAdmin.pages.profile',
        'BlurAdmin.pages.advertisings',
        'BlurAdmin.pages.connected',
        'BlurAdmin.pages.emailmk',
        'BlurAdmin.pages.emarketing',
        'BlurAdmin.pages.license',
        'BlurAdmin.pages.charts',
        'BlurAdmin.pages.reports',
        'BlurAdmin.pages.sms',
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
        $urlRouterProvider.otherwise('/dashboard');

        baSidebarServiceProvider.addStaticItem({
            title: 'Campanhas',
            icon: 'ion-arrow-graph-up-right',
            subMenu: [{
                title: 'Banner',
                stateRef: 'advertising'
            }, {
                title: 'SMS',
                stateRef: 'sms'
            }, {
                title: 'E-Marketing',
                stateRef: 'emarketing'
            }]
        });
    }

})();
