(function() {
    'use strict';

    angular.module('BlurAdmin.signin')
    .controller('SignInCtrl', SignInCtrl);

    /** @ngInject */
    function SignInCtrl($scope, $state, $window, $timeout, SigninService, toastr, $rootScope, socket) {
        var vm = this;
        vm.formdata = {};
        vm.signIn = _signIn;
        vm.register = _register;
        
        function _register() {
            var url = "https://world.conektta.com.br/#!/cadastro/anunciante";
            $window.location.href = url
        }
        
        function _signIn(form) {
            console.log(form.$invalid);
            if(!form.$invalid) {
                SigninService.login(vm.formdata)
                    .then(function (res) {
                        // var tokenPayload = jwtHelper.decodeToken(res.token);
                        // //printConsole(tokenPayload);
                        if (res.success) {
                            setTokenAndUser(res.token,res.user);
                            setUser(res.user);
                            //$state.go('home');

                        } else {
                            toastr.error("Usuario ou senha inválidos", 'Atenção');
                        }

                    }, function (data) {

                        printDebug("ERROR");
                        //modal();
                    })
            }
        }
        
        function setTokenAndUser(token,user) {
            localStorage.setItem("conektta", JSON.stringify(token));

            var jsonObj = JSON.parse(user);
            jsonObj[0].password = "*******";
            localStorage.setItem("conekttaUser", JSON.stringify(jsonObj));
            socket.emit('connection', user);
            $state.go('home.dashboard');
        }

        function setUser(user) {

        }
        $scope.signIn = function() {
            //$state.go('home');

        };

    }
})();
