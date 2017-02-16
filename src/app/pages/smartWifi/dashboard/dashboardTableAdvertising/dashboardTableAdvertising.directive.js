/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.smartWifi')
      .directive('dashboardTableAdvertising', dashboardTableAdvertising);

  /** @ngInject */
  function dashboardTableAdvertising() {
    return {
      restrict: 'E',
      controller: 'dashboardTableAdvertisingtCtrl',
      templateUrl: 'app/pages/smartWifi/dashboard/dashboardTableAdvertising/dashboardTableAdvertising.html'
    };
  }
})();