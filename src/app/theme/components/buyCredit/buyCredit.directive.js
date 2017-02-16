/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .directive('buyCredit', buyCredit);

    /** @ngInject */
    function buyCredit() {
        var jqWindow = $(window);
        return {
            restrict: 'EA',
            templateUrl: 'app/theme/components/buyCredit/buy-credit.html',
            controller: 'BuyCredit',
            controllerAs: 'vm'
        };
    }

})();
