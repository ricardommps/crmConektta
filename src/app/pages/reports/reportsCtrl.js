(function () {
  'use strict';

  angular.module('BlurAdmin.pages.reports')


  .controller('ReportsCtrl', ReportsCtrl);

  /** @ngInject */
  function ReportsCtrl($scope, baConfig, $timeout) {
    console.log("ReportsCtrl");
    var vm = this;
    vm.myFormatter = function(input) {
      return input + '%';
    };
    $scope.colors = ["#3769a2", "#ff6600", "#e85656", "#2dacd1", "#90b900", "#1b867b"];
    $scope.donutData = [
      {label: "Homens", value: 60},
      {label: "Mulheres", value: 40}
    ];

    $scope.stackedBarData = {
     labels: [
     'Jan', 
     'Fev', 
     'Mar', 
     'Abr',
     'Maio', 
     'Jun', 
     'Jul', 
     'Ago',
     'Set', 
     'Out', 
     'Nov', 
     'Dez'
     ],
     series: [
     [800000, 1200000, 1400000, 1300000,800000, 1200000, 1400000, 1300000,800000, 1200000, 1400000, 1300000],
     [500000, 600000, 400000, 600000,500000, 600000, 400000, 600000,500000, 600000, 400000, 600000]
     ]
   };

   $scope.stackedBarOptions = {
    fullWidth: true,
    height: "300px",
    stackBars: true,
    axisY: {
      labelInterpolationFnc: function (value) {
        return (value / 1000);
      }
    }
  };

  $timeout(function(){
    new Chartist.Bar('#stacked-bar', $scope.stackedBarData, $scope.stackedBarOptions);
  });

  //Fim
}

// --- Operaçõe referente a Upload da imagem  --- //

})();

