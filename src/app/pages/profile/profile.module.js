/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.profile', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('profile', {
          url: '/profile',
          title: 'Meus Dados',
          templateUrl: 'app/pages/profile/profile.html',
          controller: 'ProfilePageCtrl',
          controllerAs: 'vm',
          sidebarMeta: {
            icon: 'ion-person',
            order: 1000,
          },
        });
  }

})();
