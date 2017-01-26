(function () {
  'use strict';

  angular.module('BlurAdmin.pages.connected', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('connected', {
          url: '/connected',
          templateUrl: 'app/pages/connected/connected.html',
          title: 'Conectados',
          controller: 'ConnectedCtrl',
          controllerAs: 'vm',
          sidebarMeta: {
            icon: 'ion-happy-outline',
            order: 800,
          },
        });
  }

})();