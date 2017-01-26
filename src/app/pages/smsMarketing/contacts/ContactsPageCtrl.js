
(function () {
    'use strict';


    angular.module('BlurAdmin.pages.smsMarketing.contacts')
        .controller('SmsMarketingModalCtrl',SmsMarketingModalCtrl)
        .controller('SmsMarketingPageCtrl', SmsMarketingPageCtrl);


    function SmsMarketingPageCtrl($scope) {
        var vm = this;


    }

    function SmsMarketingModalCtrl($scope, $uibModalInstance, contacts, ContactsService ) {
        var vm = this;

    }


})();
