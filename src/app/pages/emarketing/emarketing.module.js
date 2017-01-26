(function () {
  'use strict';

  angular.module('BlurAdmin.pages.emarketing', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('emarketing', {
          url: '/emarketing',
          templateUrl: 'app/pages/emarketing/emarketing.html',
          title: 'E-Marketing',
          controller: 'EmarketingCtrl',
          controllerAs: 'vm',
        });
  }

})();