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
        'BlurAdmin.pages.smartWifi',
        'BlurAdmin.pages.sms',
        'BlurAdmin.pages.email',
        'BlurAdmin.pages.ads'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
       // $urlRouterProvider.otherwise('/inteligentWifi/dashboard');
        $urlRouterProvider.otherwise('/signin');

    }

})();
