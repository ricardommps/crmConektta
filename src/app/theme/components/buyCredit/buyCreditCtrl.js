/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('BuyCredit', BuyCredit);

    /** @ngInject */
    function BuyCredit($scope) {
        var vm = this;
        vm.buyCredit = _buyCredit;

        function _buyCredit() {
            //printConsole("_buyCredit");
        }

    }
})();