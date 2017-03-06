/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.smartWifi', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('home.smartWifi', {
                url: '/smartWifi',
                templateUrl: 'app/pages/smartWifi/smartWifi.html',
                abstract: true,
                title: 'Smart Wifi',
                sidebarMeta: {
                    icon: 'ion-wifi',
                    order: 120,
                },
            })
            .state('home.smartWifi.usuarios', {
                url: '/usuarios',
                templateUrl: 'app/pages/smartWifi/usuarios/usuarios.html',
                controller: 'UsuariosPageCtrl',
                controllerAs: 'vm',
                title: 'Usuarios',
                sidebarMeta: {
                    order: 0,
                },
            })
            .state('home.smartWifi.estatisticas', {
                url: '/estatisticas',
                templateUrl: 'app/pages/smartWifi/estatisticas/estatisticas.html',
                controller: 'EstatisticasPageCtrl',
                controllerAs: 'vm',
                title: 'Estatísticas',
                sidebarMeta: {
                    order: 0,
                },
            });
    }

})();

