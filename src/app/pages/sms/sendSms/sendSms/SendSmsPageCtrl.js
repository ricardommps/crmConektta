/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.sms')
        .controller('SendSmsPageCtrl', SendSmsPageCtrl);

    /** @ngInject */
    function SendSmsPageCtrl() {
        //printConsole("SendSmsPageCtrl");
    }

})();





https://email-verification.eu-west-1.amazonaws.com/?AWSAccessKeyId=AKIAJQA2TSFQTDSUODZQ&Context=252620909211&Identity.IdentityName=ricardommps%40gmail.com&Identity.IdentityType=EmailAddress&Namespace=Bacon&Operation=ConfirmVerification&Signature=h%2FrVqxUZgmkZNHwDG4ak0jXO6RKvGcRkAWAlXQ4HJqk%3D&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2017-02-15T13%3A00%3A22.011Z

    /**
     * @author v.lugovsky
     * created on 16.12.2015
     */
    (function () {
        'use strict';

        angular.module('BlurAdmin.pages.sms')
            .controller('SendSmsPageCtrl', SendSmsPageCtrl)

        function SendSmsPageCtrl($scope,
                                 $rootScope,
                                 ListSmsListContactsService,
                                 credits,
                                 socket,
                                 $window,
                                 SendSmsAdvertisingService,
                                 $state,
                                 toastr,
                                 SHIPPINGVALUE,
                                 $uibModal) {

            var vm = this;

            vm.advertising = {};
            vm.totalPhones = 0;
            $scope.totalPhones = 0;
            vm.contactsLists = [];
            vm.sendSms = _sendSms;
            vm.getCampanha = _getCampanha;
            vm.selectItem = _selectItem;

            vm.totalPayable = 0;
            $scope.totalPayable = 0;
            vm.disableSend = true;
            vm.placeholderSelect = "Carregando Lista...";
            vm.disableSelect = true;


            var user = JSON.parse($window.localStorage.getItem('conekttaUser'));
            if (user === null) {
                $state.go('signin');
            }
            var idUser = user[0].id;
            var contactsEmails = new Array();
            var jsonEmail = {id: idUser};
            var valueEmail = parseFloat(SHIPPINGVALUE.email);
            $scope.selected = [];

            socket.emit('send:balanceSms', jsonEmail);

            socket.on('send:errorBalancesms', function (error) {
                vm.balanceEmail = 0;
                toastr.error(error, 'Error');
            });

            socket.on('send:sucessBalanceSms', function (data) {

                if (data === "Nao foi encontrado creditos para este usuario" ||
                    data === "parametro invalido") {
                    vm.balanceEmail = 0;
                    $scope.balanceEmail = 0;
                } else {
                    vm.balanceEmail = parseFloat(data.split(':')[1].split('}')[0]);
                    $scope.balanceEmail = parseFloat(data.split(':')[1].split('}')[0]);
                }
                console.log(vm.balanceEmail);
            });
            listsContacts();
           function listsContacts() {
               ListSmsListContactsService.listAll(idUser)
                   .then(function (res) {
                       vm.contactsLists = JSON.parse(res);
                       console.log(res);
                       vm.placeholderSelect = "Selecione listas de contato";
                       vm.disableSelect = false;
                   }, function (data) {
                       vm.disableSelect = true;
                       //printConsole("ERROR");
                       //modal();
                   });
           }

            var updateSelected = function (action, id) {
                if (action == 'add' & $scope.selected.indexOf(id) == -1) $scope.selected.push(id);
                if (action == 'remove' && $scope.selected.indexOf(id) != -1) $scope.selected.splice($scope.selected.indexOf(id), 1);
                console.log($scope.selected);
                getContatosLista($scope.selected);
            };

            function _selectItem($event, id) {
                var checkbox = $event.target;
                var action = (checkbox.checked ? 'add' : 'remove');
                updateSelected(action, id);
            }


            $scope.isSelected = function (id) {
                return $scope.selected.indexOf(id) >= 0;
            };

            function _getCampanha() {
                console.log($scope.selected);
                var saveJson =
                    {
                        "id_dono_campanha": idUser,
                        "List_Contatos": {
                            "id_listas": $scope.selected
                        },
                        "Name": vm.advertising.title,
                        "Status": "",
                        "Sender": vm.advertising.nome,
                        "From": vm.advertising.from,
                        "Message": {
                            "Body": {
                                "Text": {
                                    "Data": vm.advertising.textData
                                }
                            },
                            "Subject": {
                                "Data": vm.advertising.subject
                            },
                            "cost": vm.totalPayable
                        }
                    };
                console.log(saveJson);
                SendSmsAdvertisingService.createSms(saveJson)
                    .then(function (res) {
                        if (res.success) {
                            if (res.reponse === "Campanha gravada com sucesso") {
                                toastr.success(res.reponse);
                                $state.go('home.sms.listSmsSend');
                            }
                        } else {
                            toastr.error("Erro ao criar campanha", 'Error');
                        }

                    }, function (data) {
                        toastr.error("Erro ao criar campanha", 'Error');
                    })
            }

            function _sendSms() {
                var cost = parseFloat(vm.totalPayable).toFixed(2);
                var jsonSendSms =
                    {

                        operation: [
                            {
                                id_usuario: idUser,
                                id_tp_credito: '1',
                                nr_pedido: '0',
                                valor: vm.totalPayable,
                                operacao: 'd'
                            }
                        ],

                        create: [
                            {
                                "id_dono_campanha": idUser,
                                "List_Contatos": {
                                    "id_listas": $scope.selected
                                },
                                "Name": vm.advertising.title,
                                "Status": "",
                                "Sender": vm.advertising.nome,
                                "From": vm.advertising.from,
                                "Message": {
                                    "Body": {
                                        "Text": {
                                            "Data": vm.advertising.textData
                                        }
                                    },
                                    "Subject": {
                                        "Data": vm.advertising.subject
                                    },
                                    "cost": cost
                                }
                            }
                        ],

                        credits: vm.balanceEmail,

                        sms: [
                            {
                                "id_dono_campanha": idUser,
                                "List_Contatos": {
                                    "id_listas": $scope.selected
                                },
                                "Name": vm.advertising.title,
                                "Status": "",
                                "Sender": vm.advertising.nome,
                                "From": vm.advertising.from,
                                "Message": {
                                    "Body": {
                                        "Text": {
                                            "Data": vm.advertising.textData
                                        }
                                    },
                                    "Subject": {
                                        "Data": vm.advertising.subject
                                    },
                                    "cost": cost
                                }
                            }
                        ]
                    };
                socket.emit('send:sendSms', jsonSendSms, function (res) {
                    console.log(res);
                    toastr.success('Campanha enviado com sucesso! Valor debitado: R$' + vm.totalPayable);
                    $state.go('home.sms.listSmsSend');
                });
            }



            function getContatosLista(list) {
                contactsEmails = new Array();
                if (list.length > 0) {
                    ListSmsListContactsService.getContatosLista(list)
                        .then(function (res) {
                            contactsEmails = res;
                            vm.totalPhones = contactsEmails.length;
                            $scope.totalPhones = contactsEmails.length;
                            vm.totalPayable = parseFloat((valueEmail * vm.totalPhones));
                            $scope.totalPayable = parseFloat((valueEmail * vm.totalPhones));
                            if (vm.totalPayable <= vm.balanceEmail) {
                                vm.disableSend = false;
                            } else {
                                vm.disableSend = true;
                            }
                            vm.disableSelect = false;
                        }, function (data) {
                            //printConsole("ERROR");
                            //modal();
                        })
                } else {
                    vm.totalPayable = 0;
                }
            }

        }


    })();

