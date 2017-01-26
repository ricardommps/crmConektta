(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sms', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('sms', {
          url: '/sms',
          templateUrl: 'app/pages/sms/createSms.html',
          title: 'SMS',
          controller: 'SmsCtrl',
          controllerAs: 'vm',
        });
  }

})();