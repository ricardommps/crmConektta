/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.sms', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('home.sms', {
                url: '/sms',
                templateUrl: 'app/pages/sms/sms.html',
                abstract: true,
                title: 'SMS',
                sidebarMeta: {
                    icon: 'ion-ios-location-outline',
                    order: 150,
                },
            })
            .state('home.sms.listSmsListContacts', {
                url: '/listSmsListContacts',
                templateUrl: 'app/pages/sms/contacts/listSmsListContacts/listSmsListContacts.html',
                controller: 'ListSmsListContactsPageCtrl',
                controllerAs: 'vm',
                title: 'LISTA DE CONTATOS',
                sidebarMeta: {
                    order: 0,
                },
            })
            .state('home.sms.createSmsListContacts', {
                url: '/createSmsListContacts',
                templateUrl: 'app/pages/sms/contacts/createSmsListContacts/createSmsListContacts.html',
                controller: 'CreateSmsListContactsPageCtrl',
                controllerAs: 'vm',
                title: 'CRIAR LISTA DE CONTATOS',
                sidebarMeta: {
                    order: 0,
                },
            })

            .state('home.sms.listSmsSend', {
                url: '/listSmsSend',
                templateUrl: 'app/pages/sms/sendSms/listSmsSend/listSmsSend.html',
                controller: 'ListSmsSendPageCtrl',
                controllerAs: 'vm',
                title: 'SMS ENVIADOS',
                sidebarMeta: {
                    order: 0,
                },
            })
            .state('home.sms.sendSms', {
                url: '/sendSms',
                templateUrl: 'app/pages/sms/sendSms/sendSms/sendSms.html',
                controller: 'SendSmsPageCtrl',
                controllerAs: 'vm',
                title: 'ENVIAR SMS',
                sidebarMeta: {
                    order: 0,
                },
            });
    }

})();
