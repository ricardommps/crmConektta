angular.module('BlurAdmin.theme.components')

    .directive('columnChart', function () {
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
                        colors: ['#1e3e8e', '#80ab38','#ccc', '#d0ef95','#e3f9b7'],
                        chartArea:{left:10},
                        hAxis: {
                            textStyle: {color: 'black', fontName: 'Lato',
                                fontSize: 10}
                        },
                        legend: { position: 'top', maxLines: 3, textStyle: {color: 'black', fontSize: 16 } },
                        isStacked: true
                    };

                    var chart = new google.visualization.ColumnChart(elm[0]);
                    chart.draw(data, options);
                }, true);
            }
        }
    });