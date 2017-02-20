'use strict';

angular.module('BlurAdmin', [
    'ngAnimate',
    'base64',
    'btford.socket-io',
    'angular-jwt',
    'ui.bootstrap',
    'ui.sortable',
    'ui.router',
    'ngTouch',
    'toastr',
    'angular-storage',
    'smart-table',
    "xeditable",
    'ui.slimscroll',
    'ngJsTree',
    'ngFileUpload',
    'imageCropper',
    'cloudinary',
    'constants',
    'angular-progress-button-styles',
    'BlurAdmin.socketService',
    'BlurAdmin.credits',
    'BlurAdmin.userInfo',
    'BlurAdmin.theme',
    'BlurAdmin.signin',
    'BlurAdmin.pages'
])
    .config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }])

    .run(function ($rootScope, $state, $window, jwtHelper) {

        $rootScope.$on('$locationChangeSuccess', function () {


            var token = $window.localStorage.getItem('conektta');

            if (token === null) {
                $state.go('signin');
            }
            var user = JSON.parse($window.localStorage.getItem('conekttaUser'));
            if (user === null) {
                $state.go('signin');
            }


        });

        $rootScope.$on('$stateChangeStart', function (evt, to, params) {
            if (to.redirectTo) {
                evt.preventDefault();
                $state.go(to.redirectTo, params, {
                    location: 'replace'
                });
            }
        });
    });

