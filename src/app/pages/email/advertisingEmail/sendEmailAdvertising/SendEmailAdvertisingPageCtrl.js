https://email-verification.eu-west-1.amazonaws.com/?AWSAccessKeyId=AKIAJQA2TSFQTDSUODZQ&Context=252620909211&Identity.IdentityName=ricardommps%40gmail.com&Identity.IdentityType=EmailAddress&Namespace=Bacon&Operation=ConfirmVerification&Signature=h%2FrVqxUZgmkZNHwDG4ak0jXO6RKvGcRkAWAlXQ4HJqk%3D&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2017-02-15T13%3A00%3A22.011Z

    /**
     * @author v.lugovsky
     * created on 16.12.2015
     */
    (function () {
        'use strict';

        angular.module('BlurAdmin.pages.email')
            .controller('SendEmailAdvertisingPageCtrl', SendEmailAdvertisingPageCtrl)
            .directive("emailAvailable", emailAvailable);

        function SendEmailAdvertisingPageCtrl($scope,
                                              $rootScope,
                                              ListEmailListContactsService,
                                              credits,
                                              socket,
                                              $window,
                                              SendEmailAdvertisingService,
                                              $state,
                                              toastr,
                                              SHIPPINGVALUE,
                                              $uibModal) {

            var vm = this;
            vm.personalInfo = {};
            vm.productInfo = {};
            vm.shipment = {};

            vm.advertising = {};
            vm.totalEmails = 0;
            $scope.totalEmails = 0;
            vm.contactsLists = [];
            vm.send = _send;
            vm.sendAwsSes = _sendAwsSes;
            vm.getCampanha = _getCampanha;
            vm.verifyEmailIdentity = _verifyEmailIdentity;
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


            socket.emit('send:balanceEmail', jsonEmail);

            socket.on('send:errorBalanceEmail', function (error) {
                vm.balanceEmail = 0;
                $scope.balanceEmail = 0;
                toastr.error(error, 'Error');
            });

            socket.on('send:sucessBalanceEmail', function (data) {
                console.log(data);
                if (data === "Nao foi encontrado creditos para este usuario" ||
                    data === "parametro invalido") {
                    vm.balanceEmail = 0;
                    $scope.balanceEmail = 0;
                } else {
                    vm.balanceEmail = parseFloat(data.split(':')[1].split('}')[0]);
                    $scope.balanceEmail = parseFloat(data.split(':')[1].split('}')[0]);
                }

            });


            ListEmailListContactsService.listAll(idUser)
                .then(function (res) {
                    vm.contactsLists = JSON.parse(res);
                    vm.placeholderSelect = "Selecione listas de contato";
                    vm.disableSelect = false;
                }, function (data) {
                    vm.disableSelect = true;
                    //printConsole("ERROR");
                    //modal();
                });
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

            $scope.selected = [];
            $scope.isSelected = function (id) {
                return $scope.selected.indexOf(id) >= 0;
            };

            function _getCampanha() {
                var cost = parseFloat(vm.totalPayable).toFixed(2);
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
                        "Reply": vm.advertising.reply,
                        "Message": {
                            "Body": {
                                "Html": {
                                    "Data": vm.advertising.html_content
                                },
                                "Text": {
                                    "Data": "Hello, this is a test email!"
                                }
                            },
                            "Subject": {
                                "Data": vm.advertising.subject
                            },
                            "cost": cost
                        }
                    };

                SendEmailAdvertisingService.createCampaigns(saveJson)
                    .then(function (res) {
                        if (res.success) {
                            if (res.reponse === "Campanha gravada com sucesso") {
                                toastr.success(res.reponse);
                                $state.go('home.email.listEmailAdvertising');
                            }
                        } else {
                            toastr.error("Erro ao criar campanha", 'Error');
                        }

                    }, function (data) {
                        toastr.error("Erro ao criar campanha", 'Error');
                    })
            }

            function _sendAwsSes() {

                var from = vm.advertising.name + "<" + vm.advertising.from + ">";
                console.log(from);
                var cost = parseFloat(vm.totalPayable).toFixed(2);
                var jsonSendEmail =
                    {
                        operation: [
                            {
                                id_usuario: idUser,
                                id_tp_credito: '2',
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
                                "Reply": vm.advertising.reply,
                                "Message": {
                                    "Body": {
                                        "Html": {
                                            "Data": vm.advertising.html_content
                                        },
                                        "Text": {
                                            "Data": "Hello, this is a test email!"
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
                        email: [
                            {
                                Destination: {
                                    BccAddresses: contactsEmails
                                },
                                Message: {
                                    Body: {
                                        Html: {
                                            Data: vm.advertising.html_content
                                        },
                                        Text: {
                                            Data: "Hello, this is a test email!"
                                        }
                                    },
                                    Subject: {
                                        Data: vm.advertising.subject
                                    }
                                },
                                Source: from,
                                ReplyToAddresses: [vm.advertising.reply],
                                ReturnPath: vm.advertising.from
                            }
                        ]
                    };
                socket.emit('send:sendEmail', jsonSendEmail, function (res) {
                    console.log(res);
                    toastr.success('Campanha enviado com sucesso! Valor debitado: R$' + vm.totalPayable);
                    $state.go('home.email.listEmailAdvertising');
                });
            }

            function _send() {
                vm.list_ids = [];

                var jsonSendEmail =
                    {
                        operation: [
                            {
                                id_usuario: idUser,
                                id_tp_credito: '2',
                                nr_pedido: '0',
                                valor: vm.totalPayable,
                                operacao: 'd'
                            }
                        ],
                        credits: vm.balanceEmail,
                        email: [
                            {
                                "title": vm.advertising.title,
                                "subject": vm.advertising.subject,
                                "sender_id": 100787,
                                "list_ids": vm.list_ids,
                                "categories": [
                                    "spring line"
                                ],
                                "suppression_group_id": 2321,
                                "custom_unsubscribe_url": "",
                                "html_content": vm.advertising.html_content + "<a href='[unsubscribe]'>Click Here to Unsubscribe</a>",
                                "plain_content": "Check out our spring line! [unsubscribe]"
                            }
                        ]
                    };


                socket.emit('send:sendEmail', jsonSendEmail, function (res) {
                    toastr.success('Campanha enviado com sucesso! Valor debitado: R$' + vm.totalPayable);
                    $state.go('home.emailMarketing.advertising');
                });

            }


            function getContatosLista(list) {
                contactsEmails = new Array();
                if (list.length > 0) {
                    console.log("AKI");
                    ListEmailListContactsService.getContatosLista(list)
                        .then(function (res) {
                            contactsEmails = res;
                            vm.totalEmails = contactsEmails.length;
                            $scope.totalEmails = contactsEmails.length;
                            vm.totalPayable = parseFloat((valueEmail * vm.totalEmails));
                            $scope.totalPayable = parseFloat((valueEmail * vm.totalEmails));
                            console.log(totalEmails);
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


            function _verifyEmailIdentity() {
                SendEmailAdvertisingService.verifyEmailIdentity(vm.advertising.from)
                    .then(function (res) {
                        try {
                            console.log(res.data.ResponseMetadata.RequestId.length);
                            if (res.data.ResponseMetadata.RequestId.length > 0) {
                                $state.go("home.email.successEmailIdentity");
                            } else {
                                toastr.error("Não foi possivel verificar seu E-mail", 'Error');
                            }
                        }
                        catch (err) {
                            toastr.error("Não foi possivel verificar seu E-mail", 'Error');
                        }


                    }, function (data) {
                        console.log(data);
                    })
            }

        }

        ////// -> directive <- ///////
        function emailAvailable(SendEmailAdvertisingService) {
            var emailJson = {};
            return {
                require: 'ngModel',
                link: function (scope, elem, attr, ctrl) {
                    ctrl.$parsers.push(function (viewValue) {
                        // set it to true here, otherwise it will not
                        // clear out when previous validators fail.
                        console.log(viewValue);
                        ctrl.$setValidity('emailAvailable', false);

                        if (viewValue && viewValue.match(/[a-z0-9\-_]+@[a-z0-9\-_]+\.[a-z0-9\-_]{2,}/)) {
                            emailJson = {
                                email: viewValue
                            };

                            SendEmailAdvertisingService.listVerifiedEmailAddresses(emailJson)
                                .then(function (res) {
                                    if (res.data.verifyEmailIdentity) {
                                        ctrl.$setValidity('emailAvailable', true);
                                    } else {
                                        ctrl.$setValidity('emailAvailable', false);
                                    }

                                }, function (data) {
                                    ctrl.$setValidity('emailAvailable', false);
                                })

                        }
                        return viewValue;
                    });

                }
            };
        }

    })();
