/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages', [
        'ui.router',
        'BlurAdmin.signin',
        'BlurAdmin.pages.sides',
        'BlurAdmin.pages.inteligentWifi',
        'BlurAdmin.pages.advertisings',
        'BlurAdmin.pages.emailMarketing',
        'BlurAdmin.pages.emarketing',
        'BlurAdmin.pages.smsMarketing',
        'BlurAdmin.pages.sms'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
       // $urlRouterProvider.otherwise('/inteligentWifi/dashboard');
        $urlRouterProvider.otherwise('/signin');

    }

})();
