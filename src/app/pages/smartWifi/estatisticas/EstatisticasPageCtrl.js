(function () {
    'use strict';

    angular.module('BlurAdmin.pages.smartWifi')
        .controller('EstatisticasPageCtrl', EstatisticasPageCtrl);

    /** @ngInject */
    function EstatisticasPageCtrl($scope, RelatoriosService, $window) {
        var user = JSON.parse($window.localStorage.getItem('conekttaUser'));
        if (user === null) {
            $state.go('signin');
        }
        var idUser = user[0].id;

        var vm = this;
        vm.relatorio = {};
        vm.error = true;
        vm.errorUsuarios = true;
        vm.erroMsgUsuarios = "Carregando Informações...";
        vm.errorGender = true;
        vm.erroMsgGender = "Carregando Informações...";
        vm.resultData = {};
        vm.sendRelatorios = _sendRelatorios;

        var numberOfYears = (new Date()).getYear() - 10;
        var years = [2017];
        var months = $.map($(Array(12)), function (val, i) {
            return i + 1;
        });

        vm.years = years;
        vm.months = months;


        // allRelatorios();
        changeRelatorio();

        function changeRelatorio() {
            RelatoriosService.listPas(idUser)
                .then(function (res) {
                    if (res.data.success) {
                        vm.error = false
                        vm.pas = JSON.parse(res.data.reponse);
                        vm.relatorio.pa = vm.pas[0];
                        vm.relatorio.months = months[new Date().getMonth()];
                        vm.relatorio.years = years[0];
                        _sendRelatorios();
                    } else {
                        vm.error = true;
                        vm.relatorio.error = res.data.reponse.toString();
                        console.log(vm.relatorio.error);
                    }

                }, function (data) {
                    //printConsole("ERROR");
                    //modal();
                });
        }

        function _sendRelatorios() {
            var jsonRelatorios = {
                id_CRM: idUser,
                mes: vm.relatorio.months,
                ano: vm.relatorio.years,
                id_pa: vm.relatorio.pa.id_estabelecimento
            };
            RelatoriosService.all(jsonRelatorios)
                .then(function (res) {
                    console.log(res);
                    vm.resultData = JSON.parse(res.reponse);
                    relatoriosConectados();
                    relatoriosGender();
                    //printConsole(res);

                }, function (data) {
                    //printConsole("ERROR");
                    //modal();
                });

        }

        function relatoriosGender() {
            console.log("relatoriosGender");
            var masculino = 0;
            var feminino = 0;
            var nd = 0;
            var arrayResult = [];
            var totalMasc = 0;
            var totalFem = 0;
            var totalNd = 0;

            if (vm.resultData.conteudo.gender_masculino_total == 0 &&
                vm.resultData.conteudo.gender_feminino_total == 0 &&
                vm.resultData.conteudo.gender_nd_total == 0) {
                vm.errorGender = true;
                vm.erroMsgGender = "Nenhum dado encontrado";

            } else {
                vm.errorGender = false;
                vm.erroMsgGender = "";
                angular.forEach(vm.resultData.conteudo.mes_gender, function (value, key) {
                    if (value[0]) {

                        if (value[0].masculino) {
                            masculino = value[0].masculino;

                            if (value[1]) {
                                if (value[1].feminino) {
                                    feminino = value[1].feminino;
                                    if (value[2]) {
                                        nd = value[2].nd;
                                    } else {
                                        nd = 0;
                                    }
                                } else {
                                    if (value[1].nd) {
                                        nd = value[1].nd;
                                    } else {
                                        nd = 0;
                                    }
                                    feminino = 0;
                                }
                            } else {
                                feminino = 0;
                                nd = 0
                            }
                        } else if (value[0].feminino) {
                            feminino = value[0].feminino;
                            masculino = 0;
                            if (value[1]) {
                                nd = value[1].nd;
                            } else {
                                nd = 0;
                            }
                        } else {
                            masculino = 0;
                            feminino = 0;
                            nd = value[0].nd;
                        }

                        totalMasc = totalMasc + masculino;
                        totalFem = totalFem + feminino;
                        totalNd = totalNd + nd;
                        arrayResult.push([value.dia.toString(), masculino, feminino, nd]);
                    }
                });

                arrayResult.splice(0, 0, ['Dia', 'Masculino', 'Feminino', 'ND']);
                vm.dataColumnsGender = arrayResult;

                vm.dataPieGender = [
                    ['Task', 'Hours per Day'],
                    ['Masculino', totalMasc],
                    ['Feminino', totalFem],
                    ['ND', totalNd]
                ];
            }
            console.log(vm.dataColumnsGender);
            console.log(vm.dataPieGender);


        }

        function relatoriosConectados() {
            var conexoes = 0;
            var cadastros = 0;
            var arrayResult = [];
            var totalConexoes = 0;
            var totalCadastros = 0;

            if (vm.resultData.conteudo.conexoes.length == 0 && vm.resultData.conteudo.cadastros.length == 0) {
                vm.errorUsuarios = true;
                vm.erroMsgUsuarios = "Nenhum dado encontrado";
            } else {
                vm.errorUsuarios = false;
                vm.erroMsgUsuarios = ""

                angular.forEach(vm.resultData.conteudo.mes, function (value, key) {
                    if (value[0]) {
                        if (value[0].cadastros) {
                            cadastros = value[0].cadastros;
                            if (value[1]) {
                                conexoes = value[1].conexoes;
                            } else {
                                conexoes = 0
                            }
                        } else {
                            if (value[0].conexoes) {
                                conexoes = value[0].conexoes;
                            }
                            cadastros = 0;
                        }
                        totalConexoes = totalConexoes + conexoes;
                        totalCadastros = totalCadastros + cadastros;
                        arrayResult.push([value.dia.toString(), cadastros, conexoes]);
                    }

                });
                arrayResult.splice(0, 0, ['Dia', 'Cadastro', 'Conexões']);
                vm.dataColumnsUsuarios = arrayResult;
                console.log(vm.dataColumnsChart);

                vm.dataPieUsuarios = [
                    ['Task', 'Hours per Day'],
                    ['Cadastros', totalCadastros],
                    ['Conexões', totalConexoes]
                ];

            }

        }

        vm.widthPieChart = 220;
        vm.heightPieChart = 300;


        vm.widthColumnsChart = 980;
        vm.heightColumnsChart = 300;



    }

})();



