/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.ads', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('home.ads', {
                url: '/ads',
                templateUrl: 'app/pages/ads/ads.html',
                abstract: true,
                title: 'ADS',
                sidebarMeta: {
                    icon: 'ion-ios-location-outline',
                    order: 140,
                },
            })
            .state('home.ads.listAdsListContacts', {
                url: '/listAdsListContacts',
                templateUrl: 'app/pages/ads/contacts/listAdsListContacts/listAdsListContacts.html',
                controller: 'ListAdsListContactsPageCtrl',
                controllerAs: 'vm',
                title: 'LISTA DE CONTATOS',
                sidebarMeta: {
                    order: 0,
                },
            })
            .state('home.ads.createAdsListContacts', {
                url: '/createAdsListContacts',
                templateUrl: 'app/pages/ads/contacts/createAdsListContacts/createAdsListContacts.html',
                controller: 'CreateAdsListContactsPageCtrl',
                controllerAs: 'vm',
                title: 'CRIAR LISTA DE CONTATOS',
                sidebarMeta: {
                    order: 0,
                },
            })

            .state('home.ads.listAdsSend', {
                url: '/listAdsSend',
                templateUrl: 'app/pages/ads/sendAds/listAdsSend/listAdsSend.html',
                controller: 'ListAdsSendPageCtrl',
                controllerAs: 'vm',
                title: 'ADS ENVIADOS',
                sidebarMeta: {
                    order: 0,
                },
            })
            .state('home.ads.sendAds', {
                url: '/sendAds',
                templateUrl: 'app/pages/ads/sendAds/sendAds/sendAds.html',
                controller: 'SendAdsPageCtrl',
                controllerAs: 'vm',
                title: 'ENVIAR ADS',
                sidebarMeta: {
                    order: 0,
                },
            });
    }

})();
