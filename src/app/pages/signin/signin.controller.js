(function() {
    'use strict';

    angular.module('BlurAdmin.signin')
    .controller('SignInCtrl', SignInCtrl);

    /** @ngInject */
    function SignInCtrl($scope, $state, $window, $timeout, SigninService, toastr) {
        console.log("SignInCtrl");
        var vm = this;
        vm.formdata = {};
        vm.signIn = _signIn;
        vm.register = _register;
        
        function _register() {
            var url = "https://world.conektta.com.br/#!/cadastro/anunciante";
            $window.location.href = url
        }
        
        function _signIn(form) {
            if(!form.$invalid) {
                SigninService.login(vm.formdata)
                    .then(function (res) {
                        console.log(res.token);
                        // var tokenPayload = jwtHelper.decodeToken(res.token);
                        // console.log(tokenPayload);
                        if (res.success) {
                            setToken(res.token);
                            setUser(res.user);
                            $state.go('home');

                        } else {
                            toastr.error("Usuario ou senha inválidos", 'Atenção');
                        }

                    }, function (data) {

                        console.log("ERROR");
                        //modal();
                    })
            }
        }
        
        function setToken(token) {
            localStorage.setItem("conektta", JSON.stringify(token));
        }

        function setUser(user) {
            var jsonObj = JSON.parse(user);
            jsonObj[0].password = "*******";
            localStorage.setItem("conekttaUser", JSON.stringify(jsonObj));
        }
        $scope.signIn = function() {
            //$state.go('home');

        };

    }
})();
