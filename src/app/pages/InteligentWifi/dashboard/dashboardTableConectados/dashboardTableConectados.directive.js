/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.inteligentWifi.dashboard')
      .directive('dashboardTableConectados', dashboardTableConectados);

  /** @ngInject */
  function dashboardTableConectados() {
    return {
      restrict: 'E',
      controller: 'dashboardTableConectadostCtrl',
      templateUrl: 'app/pages/inteligentWifi/dashboard/dashboardTableConectados/dashboardTableConectados.html'
    };
  }
})();