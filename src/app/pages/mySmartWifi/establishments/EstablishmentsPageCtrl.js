(function () {
    'use strict';

    angular.module('BlurAdmin.pages.mySmartWifi')

        .controller('EstablishmentsPageCtrl', EstablishmentsPageCtrl)
        .directive("licenseMask", licenseMask);

    function EstablishmentsPageCtrl($scope, $window, EstablishmentsService,
                                    $state, toastr) {
        console.log("EstablishmentsPageCtrl");
        var user = JSON.parse($window.localStorage.getItem('' +
            'conekttaUser'));
        if (user === null) {
            $state.go('signin');
        }
        var idUser = user[0].id;
        var vm = this;
        vm.queryLicense = _queryLicense;

        list();

        function _queryLicense() {
            EstablishmentsService.queryLicense(vm.licenseCod)
                .then(function (res) {
                    if (res.success) {
                        $state.go('home.mySmartWifi.registerEstablishments', {licenseNumber: vm.licenseCod});
                    } else {
                        toastr.warning(res.reponse);
                    }
                    //, { objId: 479 }
                    // vm.contactsLists = JSON.parse(res);

                }, function (data) {
                    //printConsole("ERROR");
                    //modal();
                })
        }

        function list() {

            EstablishmentsService.list(idUser)
                .then(function (res) {
                    if(res.success){
                        vm.estabelecimentos = JSON.parse(res.response);

                    }
                    //vm.estabelecimentos = JSON.parse(res);

                }, function (data) {
                    //printConsole("ERROR");
                    //modal();
                })

        }

    }

    function licenseMask() {
        var emailJson = {};
        return {
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {
                ctrl.$parsers.push(function (viewValue) {


                    console.log(viewValue.length);
                    if(viewValue.length == 4){
                        console.log(">>>>>");
                        viewValue = viewValue + "-";

                    }
                    console.log(viewValue);
                    return viewValue;
                });

            }
        };
    }


})();

