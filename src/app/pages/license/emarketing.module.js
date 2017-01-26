(function () {
  'use strict';

  angular.module('BlurAdmin.pages.license', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('license', {
          url: '/license',
          templateUrl: 'app/pages/license/license.html',
          title: 'Licença',
          controller: 'LicenseCtrl',
          controllerAs: 'vm',
          sidebarMeta: {
            icon: 'ion-checkmark-round',
            order: 1100,
          },
        });
  }

})();