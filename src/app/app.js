'use strict';

angular.module('BlurAdmin', [
    'ngAnimate',
    'base64',
    'ui.utils.masks',
    'ui.mask',
    'ngMessages',
    'googlechart',
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
    'constants',
    'angular-progress-button-styles',
    'BlurAdmin.socketService',
    'BlurAdmin.editorEmailMk',
    'BlurAdmin.credits',
    'BlurAdmin.userInfo',
    'BlurAdmin.theme',
    'BlurAdmin.signin',
    'BlurAdmin.pages'
])

    .run(function ($rootScope, $state, $window, jwtHelper) {

        $rootScope.$on('$locationChangeSuccess', function () {


            var token = $window.localStorage.getItem('conektta');
            console.log(token);
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

