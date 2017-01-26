
(function () {
    'use strict';


    angular.module('BlurAdmin.pages.smsMarketing.contactsList')
        .controller('SmsMarketingModalCtrl', SmsMarketingModalCtrl)
        .controller('SmsMarketingPageCtrl', SmsMarketingPageCtrl);


    function SmsMarketingPageCtrl($scope) {

        var vm = this;


    };


    function SmsMarketingModalCtrl($scope, $uibModalInstance) {
        var vm = this;
        vm.contacts = {};

    }


})();
