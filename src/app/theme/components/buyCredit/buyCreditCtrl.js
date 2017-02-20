/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('BuyCredit', BuyCredit);

    /** @ngInject */
    function BuyCredit($scope,$uibModal) {
        var vm = this;
        vm.buyCredit = _buyCredit;

        function _buyCredit() {
            $uibModal.open({
                animation: true,
                templateUrl: "app/theme/components/buyCredit/iframeModal.html",
                size: 'lg'
            });
        }

    }
})();