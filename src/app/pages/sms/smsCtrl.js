(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sms')

  .controller('SmsCtrl', SmsCtrl)
  .controller('ModalSms',ModalSms);


  function ModalSms($scope,itens,$rootScope){
    var vm = this;
    vm.itens = itens;
    vm.saveList = saveList;
    function saveList(name){
      console.log(name);
      var listSave = {
         name: name,
         contactList:{
          contacts:vm.itens
         }
      }
      console.log(listSave);
      $rootScope.$broadcast('updateContactList', listSave);
    
    }
  }
  /** @ngInject */
  function SmsCtrl($timeout, $http, $scope, $uibModal) {
    console.log("SmsCtrl")
    var vm = this;
    vm.rowSelects=[];
    vm.list = [];
    vm.changeValue = changeValue;
    vm.smartTablePageSize = 10;
    vm.createListSms = createListSms;
    vm.saveList = saveList;
    vm.listClients=[];

    $scope.$on("updateContactList",function (event, obj) {
        console.log(obj);
        vm.list.push(obj);
        console.log(vm.list);
    });

    function saveList(name){
      console.log(name);
      var listSave = {
         name: name,
         contactList:{
          contacts:vm.rowSelects
         }
      }
      console.log(vm.rowSelects);
      console.log(listSave);
    
    }

    function openModal(){
      var page = 'app/pages/sms/createListModal.html';
      var size = 'sm';
      $uibModal.open({
        animation: true,
        templateUrl: page,
        controller: 'ModalSms',
        controllerAs: 'vm',
        size: size,
        resolve: {
          itens: function () {
            return vm.rowSelects;
          }
        }
      });
    }

   

    function createListSms(){
      console.log("createListSms");
      openModal();
    }

    function changeValue(selected,row){
       var index = vm.rowSelects.indexOf(row);
       console.log(index);
      if(selected){
        if(index < 0){
          vm.rowSelects.push(row);
        }
      }else{
        if(index >= 0){
          vm.rowSelects.splice(index, 1);
        }
      }
      console.log(vm.rowSelects);
    }
    vm.smartTableData = [
      {
        id: 1,
        nome: 'Mark',
        idade: 32,
        genero: 'Masculino',
        pontos: 'Rede de Teste',
        datacad: '31/12/2016'
      },
      {
        id: 2,
        nome: 'Jacob',
        idade: 31,
        genero: 'Masculino',
        pontos: 'Rede da Maria',
        datacad: '23/10/2016'
      },
      {
        id: 3,
        nome: 'Larry',
        idade: 33,
        genero: 'Feminino',
        pontos: 'Rede da Maria',
        datacad: '31/12/2016'
      },
      {
        id: 4,
        nome: 'Larry',
        idade: 33,
        genero: 'Feminino',
        pontos: 'Rede da Maria',
        datacad: '31/12/2016'
      },
      {
        id: 5,
        nome: 'Larry',
        idade: 33,
        genero: 'Feminino',
        pontos: 'Rede da Maria',
        datacad: '31/12/2016'
      },
      {
        id: 6,
        nome: 'Larry',
        idade: 33,
        genero: 'Feminino',
        pontos: 'Rede da Maria',
        datacad: '31/12/2016'
      },
      {
        id: 7,
        nome: 'Larry',
        idade: 33,
        genero: 'Feminino',
        pontos: 'Rede da Maria',
        datacad: '31/12/2016'
      },
      {
        id: 8,
        nome: 'Larry',
        idade: 33,
        genero: 'Feminino',
        pontos: 'Rede da Maria',
        datacad: '31/12/2016'
      },
      {
        id: 9,
        nome: 'Larry',
        idade: 33,
        genero: 'Feminino',
        pontos: 'Rede da Maria',
        datacad: '31/12/2016'
      },
      {
        id: 10,
        nome: 'Karen',
        idade: 33,
        genero: 'Feminino',
        pontos: 'Rede da Maria',
        datacad: '31/12/2016'
      },
      {
        id: 11,
        nome: 'Mark',
        idade: 33,
        genero: 'Feminino',
        pontos: 'Rede da Maria',
        datacad: '31/12/2016'
      },
      {
        id: 12,
        nome: 'Jacob',
        idade: 33,
        genero: 'Feminino',
        pontos: 'Rede da Maria',
        datacad: '31/12/2016'
      },
      {
        id: 13,
        nome: 'Haik',
        idade: 33,
        genero: 'Feminino',
        pontos: 'Rede da Maria',
        datacad: '31/12/2016'
      },
      {
        id: 14,
        nome: 'Garegin',
        idade: 33,
        genero: 'Feminino',
        pontos: 'Rede da Maria',
        datacad: '31/12/2016'
      },
      {
        id: 15,
        nome: 'Krikor',
        idade: 33,
        genero: 'Feminino',
        pontos: 'Rede da Maria',
        datacad: '31/12/2016'
      },
      {
        id: 16,
        nome: "Francisca",
        idade: 33,
        genero: 'Feminino',
        pontos: 'Rede da Maria',
        datacad: '31/12/2016'
      },
      {
        id: 17,
        nome: "Tillman",
        idade: 33,
        genero: 'Feminino',
        pontos: 'Rede da Maria',
        datacad: '31/12/2016'
      },
      {
        id: 18,
        nome: "Jimenez",
        idade: 33,
        genero: 'Feminino',
        pontos: 'Rede da Maria',
        datacad: '31/12/2016'
      }
    ];

  
  //Fim
  }


})();

