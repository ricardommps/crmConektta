/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .controller('MsgCenterCtrl', MsgCenterCtrl);

  /** @ngInject */
  function MsgCenterCtrl($scope, $sce, credits, UserInfo, $rootScope,socket, $window, toastr) {
      var vm = this;
      vm.balanceSms = 0;
      vm.balanceEmail = 0;

      var user = JSON.parse($window.localStorage.getItem('conekttaUser'));
      if(user === null){
          $state.go('signin');
      }
      var idUser = user[0].id;

      var tpCredito = "sms";


      userInfo();

      socket.on('send:errorBalanceEmail', function (error) {
          vm.balanceEmail = 0;
          toastr.error(error, 'Error');
      });

      socket.on('send:sucessBalanceEmail', function (data) {
          //printConsole("send:sucessBalanceEmail");
          if(data === "Nao foi encontrado creditos para este usuario" ||
            data === "parametro invalido"){
              vm.balanceEmail = 0;
          }else{
              //printConsole(data);
              vm.balanceEmail = parseFloat(data.split(':')[1].split('}')[0]).toFixed(2);
          }
      });

      socket.on('send:errorBalanceSms', function (error,userId) {
          if(userId.id == idUser ){
              vm.balanceSms = 0;
          }

          //userInfo();
      });

      socket.on('send:sucessBalanceSms', function (data) {
          //printConsole("send:sucessBalanceSms");
          if(data === "Nao foi encontrado creditos para este usuario" ||
              data === "parametro invalido"){
              vm.balanceSms = 0;
          }else{
              vm.balanceSms = parseFloat(data.split(':')[1].split('}')[0]).toFixed(2);
          }
      });




      socket.on('send:sucessPostDebit', function (data) {
          //printConsole("send:sucessPostDebit");
          //printConsole(data);
          //userInfo();
      });

      function userInfo() {
          UserInfo.user()
              .then(function(res) {
                  idUser = res[0].id;
                  balanceSMS();
                  balanceEmail();

              },function(data) {
                  //printConsole("ERROR");
                  //modal();
              })
      }

      function balanceSMS() {
          var jsonEmail = {id:idUser};
          socket.emit('send:balanceSms',jsonEmail);
      }

      function balanceEmail() {
          var jsonEmail = {id:idUser};
          socket.emit('send:balanceEmail',jsonEmail);
         /* tpCredito = "email";
          credits.balance(idUser,tpCredito)
              .then(function(res) {
                  if(res === "Nao foi encontrado creditos para este usuario"){
                      vm.balanceEmail = 0;
                  }else{
                      vm.balanceEmail = parseFloat(res.split(':')[1].split('}')[0]).toFixed(2);
                  }

              },function(data) {
                  //printConsole("ERROR");
                  //modal();
              })*/
      }

  }
})();