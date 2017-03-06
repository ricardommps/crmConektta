angular.module('BlurAdmin.theme.components')

    .directive('gChart',function (){
        return {
            restrict: 'A',
            link: function ($scope, elm, attrs) {
                $scope.$watch('chart', function () {
                    var type = $scope.chart.type;
                    console.log($scope.chart);
                    var chart = " ";
                    if(type=="1"){
                        chart = new google.visualization.LineChart(elm[0]);
                    }
                    else if(type=="2"){
                        chart = new google.visualization.BarChart(elm[0]);
                    }
                    else if(type=="3"){
                        chart = new google.visualization.ColumnChart(elm[0]);
                    }
                    else if(type=="4"){
                        chart = new google.visualization.PieChart(elm[0]);
                    }

                    chart.draw($scope.chart.data, $scope.chart.options);
                },true);
            }
        }
    });