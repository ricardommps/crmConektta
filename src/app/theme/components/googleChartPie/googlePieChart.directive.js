angular.module('BlurAdmin.theme.components')

    .directive('pieChart', function () {
        return {
            restrict: 'EA',
            scope: {
                title: '@title',
                width: '@width',
                height: '@height',
                data: '=data',
                selectFn: '&select'
            },
            link: function ($scope, elm, attrs) {
                $scope.$watch('chart', function () {

                    var data = google.visualization.arrayToDataTable($scope.data);
                    var options = {
                        width: $scope.width,
                        height: $scope.height,
                        colors: ['#1e3e8e', '#80ab38','#aed65f', '#d0ef95','#e3f9b7'],
                        chartArea:{left:50},
                        legend: { position: 'none' }
                    };

                    var chart = new google.visualization.PieChart(elm[0]);
                    chart.draw(data, options);
                }, true);
            }
        }
    });