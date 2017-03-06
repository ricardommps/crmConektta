(function () {
    'use strict';

    angular.module('BlurAdmin.pages.mySmartWifi')

        .controller('RegisterEstablishmentsPageCtrl', RegisterEstablishmentsPageCtrl);

    function RegisterEstablishmentsPageCtrl($scope, $window, $stateParams, $state, RegisterEstablishmentsService,toastr) {
        console.log("RegisterEstablishmentsPageCtrl");
        if(!$stateParams.licenseNumber){
            $state.go('home.mySmartWifi.establishments');
        }
        var user = JSON.parse($window.localStorage.getItem('conekttaUser'));
        if (user === null) {
            $state.go('signin');
        }
        var idUser = user[0].id;

        var vm = this;
        vm.dataRegister = {};
        vm.dataRegister.cod_licenca = $stateParams.licenseNumber;
        vm.dataRegister.id_usuario = idUser;
        vm.register = _register;

        function _register(isValid) {
            console.log(isValid);
            if (isValid) {
                console.log(vm.dataRegister);
            }

            RegisterEstablishmentsService.register(vm.dataRegister)
                .then(function (res) {
                    console.log(res);
                    if (res.success) {
                        toastr.success(res.reponse);
                        $state.go('home.mySmartWifi.establishments');

                    } else {
                        toastr.error(error, 'Erro ao registrar o estabelecimento');
                    }
                    //, { objId: 479 }
                    // vm.contactsLists = JSON.parse(res);

                }, function (data) {
                    //printConsole("ERROR");
                    //modal();
                })
        }

    }

})();

