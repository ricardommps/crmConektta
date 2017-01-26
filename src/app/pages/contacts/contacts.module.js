/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.contacts', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('contacts', {
          url: '/contacts',
          title: 'Meus Contatos',
          templateUrl: 'app/pages/contacts/contacts.html',
          controller: 'ContactsPageCtrl',
          controllerAs: 'vm',
          sidebarMeta: {
            icon: 'ion-person',
            order: 1000,
          },
        });
  }

})();
