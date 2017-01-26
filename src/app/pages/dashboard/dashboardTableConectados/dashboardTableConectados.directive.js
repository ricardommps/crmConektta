/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('dashboardTableConectados', dashboardTableConectados);

  /** @ngInject */
  function dashboardTableConectados() {
    return {
      restrict: 'E',
      controller: 'dashboardTableConectadostCtrl',
      templateUrl: 'app/pages/dashboard/dashboardTableConectados/dashboardTableConectados.html'
    };
  }
})();