/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('dashboardTableAdvertisingtCtrl', dashboardTableAdvertisingtCtrl);

  /** @ngInject */
  function dashboardTableAdvertisingtCtrl($scope, baConfig, layoutPaths, baUtil) {

  	$scope.metricsTableData = [
      {
        image: 'app/browsers/chrome.svg',
        name: 'Google Chrome',
        views: 353,
        click: 350
      },
      {
        image: 'app/browsers/firefox.svg',
        name: 'Mozilla Firefox',
        views: 134,
        click: 100
      },
      {
        image: 'app/browsers/ie.svg',
        name: 'Internet Explorer',
        views: 60,
        click: 20
      },
      {
        image: 'app/browsers/safari.svg',
        name: 'Safari',
        views: 234,
        click: 190
      },
      {
        image: 'app/browsers/opera.svg',
        name: 'Opera',
        views: 279,
        click: 234
      }
    ];

  }
})();
