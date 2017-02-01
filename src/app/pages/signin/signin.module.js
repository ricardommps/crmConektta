(function() {
    'use strict';

    angular.module('BlurAdmin.signin', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('signin', {
                url: '/signin',
                cache: false,
                templateUrl: 'app/pages/signin/signin.html',
                controller: 'SignInCtrl',
                controllerAs: 'vm'

            })


        .state('forgotpwd', {
            url: '/signin/forgot',
            cache: false,
            templateUrl: 'app/pages/signin/forgotpwd.html',
            controller: 'SignInCtrl',
            controllerAs: 'vm'

        })

        .state('confirm', {
            url: '/signin/confirm',
            cache: false,
            templateUrl: 'app/pages/signin/confirm.html',
            controller: 'SignInCtrl',
            controllerAs: 'vm'
        });
    }
})();
