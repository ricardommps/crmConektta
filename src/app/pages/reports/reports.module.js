(function () {
  'use strict';

  angular.module('BlurAdmin.pages.reports', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('reports', {
          url: '/reports',
          templateUrl: 'app/pages/reports/reports.html',
          title: 'Relatorios',
          controller: 'ReportsCtrl',
          controllerAs: 'vm',
          sidebarMeta: {
            icon: 'ion-stats-bars',
            order: 500,
          },
        });
  }

})();