(function () {
  'use strict';

  angular.module('BlurAdmin.pages.advertisings', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('advertising', {
          url: '/advertising',
          templateUrl: 'app/pages/advertisings/addAdvertising.html',
          title: 'Campanha',
          controller: 'AdvertisdCtrl',
          controllerAs: 'vm',
        });
  }

})();