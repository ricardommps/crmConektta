/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.inteligentWifi.dashboard')
      .directive('dashboardProgressBars', dashboardProgressBars);

  /** @ngInject */
  function dashboardProgressBars() {
    return {
      restrict: 'E',
      controller: 'DashboardProgressBarsCtrl',
      templateUrl: 'app/pages/inteligentWifi/dashboard/dashboardProgressBars/dashboardProgressBars.html'
    };
  }
})();