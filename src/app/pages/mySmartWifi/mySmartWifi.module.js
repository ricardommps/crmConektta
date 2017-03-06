(function () {
    'use strict';

    angular.module('BlurAdmin.pages.mySmartWifi', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('home.mySmartWifi', {
                url: '/mySmartWifi',
                templateUrl: 'app/pages/mySmartWifi/mySmartWifi.html',
                abstract: true,
                title: 'My SmartWifi'

            })
            .state('home.mySmartWifi.registerEstablishments', {
                url: '/registerEstablishments',
                templateUrl: 'app/pages/mySmartWifi/registerEstablishments/registerEstablishments.html',
                controller: 'RegisterEstablishmentsPageCtrl',
                controllerAs: 'vm',
                title: 'Registrar Estabelecimento',
                params: {
                    'licenseNumber': ''
                }

            })
            .state('home.mySmartWifi.establishments', {
                url: '/establishments',
                templateUrl: 'app/pages/mySmartWifi/establishments/establishments.html',
                controller: 'EstablishmentsPageCtrl',
                controllerAs: 'vm',
                title: 'Ativar um novo Smart Wifi'
            });
    }

})();

