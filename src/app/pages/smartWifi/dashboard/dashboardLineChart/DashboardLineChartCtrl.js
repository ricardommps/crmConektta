/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.smartWifi')
      .controller('DashboardLineChartCtrl', DashboardLineChartCtrl);

  /** @ngInject */
  function DashboardLineChartCtrl($scope, baConfig, layoutPaths, baUtil) {
      $scope.newColors = ["#1e3e8e", "#dfb81c", "#e85656", "#2dacd1", "#90b900", "#1b867b"];
      $scope.lineData = [
        {y: "2006", a: 100, b: 90},
        {y: "2007", a: 75, b: 65},
        {y: "2008", a: 50, b: 40},
        {y: "2009", a: 75, b: 65},
        {y: "2010", a: 50, b: 40},
        {y: "2011", a: 75, b: 65},
        {y: "2012", a: 100, b: 90}
      ];
  }
})();