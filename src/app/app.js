'use strict';

angular.module('BlurAdmin', [
    'ngAnimate',
    'base64',
    'angular-jwt',
    'ui.bootstrap',
    'ui.sortable',
    'ui.router',
    'ngTouch',
    'toastr',
    'smart-table',
    "xeditable",
    'ui.slimscroll',
    'ngJsTree',
    'ngFileUpload',
    'imageCropper',
    'cloudinary',
    'constants',
    'angular-progress-button-styles',
    'BlurAdmin.theme',
    'BlurAdmin.signin',
    'BlurAdmin.pages'
])
    .run(function ($rootScope, $state, $window, jwtHelper) {
        $rootScope.$on('$locationChangeSuccess', function () {
            console.log('$locationChangeSuccess changed!', new Date());
            var token = $window.localStorage.getItem('conektta');
            if (token === null){

                $state.go('signin')
            }



        });

        $rootScope.$on('$stateChangeStart', function(evt, to, params) {
            if (to.redirectTo) {
                evt.preventDefault();
                $state.go(to.redirectTo, params, {
                    location: 'replace'
                });
            }
        });
    });