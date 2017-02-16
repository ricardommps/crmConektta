/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.email', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('home.email', {
                url: '/email',
                templateUrl: 'app/pages/email/email.html',
                abstract: true,
                title: 'EMAIL',
                sidebarMeta: {
                    icon: 'ion-ios-location-outline',
                    order: 130,
                },
            })
            .state('home.email.listEmailListContacts', {
                url: '/listEmailListContacts',
                templateUrl: 'app/pages/email/contacts/listEmailListContacts/listEmailListContacts.html',
                controller: 'ListEmailListContactsPageCtrl',
                controllerAs: 'vm',
                title: 'LISTA DE CONTATOS',
                sidebarMeta: {
                    order: 0,
                },
            })
            .state('home.email.createEmailListContacts', {
                url: '/createEmailListContacts',
                templateUrl: 'app/pages/email/contacts/createEmailListContacts/createEmailListContacts.html',
                controller: 'CreateEmailListContactsPageCtrl',
                controllerAs: 'vm',
                title: 'CRIAR LISTA DE CONTATOS',
                sidebarMeta: {
                    order: 0,
                },
            })

            .state('home.email.listEmailAdvertising', {
                url: '/listEmailAdvertising',
                templateUrl: 'app/pages/email/advertisingEmail/listEmailAdvertising/listEmailAdvertising.html',
                controller: 'ListEmailAdvertisingPageCtrl',
                controllerAs: 'vm',
                title: 'LISTA DE CAMPANHAS',
                sidebarMeta: {
                    order: 0,
                },
            })
            .state('home.email.sendEmailAdvertising', {
                url: '/sendEmailAdvertising',
                templateUrl: 'app/pages/email/advertisingEmail/sendEmailAdvertising/sendEmailAdvertising.html',
                controller: 'SendEmailAdvertisingPageCtrl',
                controllerAs: 'vm',
                title: 'CRIAR CAMPANHA',
                sidebarMeta: {
                    order: 0,
                },
            })

            .state('home.email.successEmailIdentity', {
                url: '/successEmailIdentity',
                templateUrl: 'app/pages/email/advertisingEmail/sendEmailAdvertising/successEmailIdentity.html',
                controller: 'SuccessEmailIdentityPageCtrl',
                controllerAs: 'vm',
                title: 'Verificação de Email',

            });
    }

})();
