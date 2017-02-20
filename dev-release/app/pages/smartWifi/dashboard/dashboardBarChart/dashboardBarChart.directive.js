/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.smartWifi')
      .directive('dashboardBarChart', dashboardBarChart);

  /** @ngInject */
  function dashboardBarChart() {
    return {
      restrict: 'E',
      controller: 'dashboardBarChartCtrl',
      templateUrl: 'app/pages/smartWifi/dashboard/dashboardBarChart/dashboardBarChart.html'
    };
  }
})();