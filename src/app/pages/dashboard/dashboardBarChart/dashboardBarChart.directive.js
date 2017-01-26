/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('dashboardBarChart', dashboardBarChart);

  /** @ngInject */
  function dashboardBarChart() {
    return {
      restrict: 'E',
      controller: 'dashboardBarChartCtrl',
      templateUrl: 'app/pages/dashboard/dashboardBarChart/dashboardBarChart.html'
    };
  }
})();