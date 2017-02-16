/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.smartWifi')
      .directive('dashboardProgressBars', dashboardProgressBars);

  /** @ngInject */
  function dashboardProgressBars() {
    return {
      restrict: 'E',
      controller: 'DashboardProgressBarsCtrl',
      templateUrl: 'app/pages/smartWifi/dashboard/dashboardProgressBars/dashboardProgressBars.html'
    };
  }
})();