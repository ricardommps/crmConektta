/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.smartWifi')
      .controller('DashboardProgressBarsCtrl', DashboardProgressBarsCtrl);

  /** @ngInject */
  function DashboardProgressBarsCtrl($scope, baConfig, layoutPaths, baUtil) {
      $scope.processing = "100%";
  }
})();