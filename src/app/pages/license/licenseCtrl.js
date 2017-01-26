(function () {
  'use strict';

  angular.module('BlurAdmin.pages.license')

  .controller('LicenseCtrl', LicenseCtrl);

  /** @ngInject */
  function LicenseCtrl($timeout, $http, $scope) {
    var vm = this;
    vm.licenseCod ='';
    vm.listLicense=[];
    vm.addLicense = addLicense;
    function addLicense(){
    	console.log(vm.licenseCod);
    	var newLicense = {
    		ponto	:'Wifi Aberto',
    		status	:'ativo',
    		codigo	:vm.licenseCod,
    		dataAtivacao: new Date()
    	};
    	vm.listLicense.push(newLicense);
    	console.log(vm.listLicense);
    	vm.licenseCod = '';
    }


   
  //Fim
  }

// --- Operaçõe referente a Upload da imagem  --- //

})();

