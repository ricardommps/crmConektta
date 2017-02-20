/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.smartWifi')
      .controller('dashboardBarChartCtrl', dashboardBarChartCtrl);

  /** @ngInject */
  function dashboardBarChartCtrl($scope, baConfig, layoutPaths, baUtil) {
   $scope.newColors = ["#1e3e8e", "#dfb81c", "#e85656", "#2dacd1", "#90b900", "#1b867b"]
   $scope.barData = [
      {y: "Jan", a: 100},
      {y: "Fev", a: 75},
      {y: "Mar", a: 50},
      {y: "Abr", a: 75},
      {y: "Maio", a: 50},
      {y: "Jun", a: 75},
      {y: "Jul", a: 100},
      {y: "Ago", a: 50},
      {y: "Set", a: 75},
      {y: "Out", a: 50},
      {y: "Nov", a: 75},
      {y: "Dez", a: 100},
    ];
  }
})();