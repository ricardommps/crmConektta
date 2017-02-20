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
            vm.contactsLists = [];
            vm.send = _send;
            vm.sendAwsSes = sendAwsSes;
            vm.create = _create;
            vm.verifyEmailIdentity = _verifyEmailIdentity;

            vm.totalPayable = 0;
            vm.disableSend = true;
            vm.placeholderSelect = "Carregando Lista...";
            vm.disableSelect = true;


            var user = JSON.parse($window.localStorage.getItem('conekttaUser'));
            if (user === null) {
                $state.go('signin');
            }
            var idUser = user[0].id;

            var jsonEmail = {id: idUser};
            var listsIds = [];
            var contactsEmails = [];
            var valueEmail = parseFloat(SHIPPINGVALUE.email);


            socket.emit('send:balanceEmail', jsonEmail);

            socket.on('send:errorBalanceEmail', function (error) {
                vm.balanceEmail = 0;
                toastr.error(error, 'Error');
            });

            socket.on('send:sucessBalanceEmail', function (data) {
                console.log(data);
                if (data === "Nao foi encontrado creditos para este usuario" ||
                    data === "parametro invalido") {
                    vm.balanceEmail = 0;
                } else {
                    vm.balanceEmail = parseFloat(data.split(':')[1].split('}')[0]);
                }

            });

            $scope.someFunction = function (item) {
                showContactList(item.id);
                vm.disableSelect = true
            };

            vm.removed = function (itemSelect, model) {
                vm.disableSelect = true;
                contactsEmails = [];
                if (vm.listsIds.length > 0) {
                    angular.forEach(vm.listsIds, function (value1, key1) {
                        showContactList(value1.id);
                    });
                } else {
                    vm.totalEmails = 0;
                    vm.totalPayable = 0;
                    vm.disableSelect = false;
                }
            };

            function showContactList(listId) {
                ListEmailListContactsService.showContactList(listId)
                    .then(function (res) {
                        countEmails(res.recipients);
                    }, function (data) {
                        //printConsole("ERROR");
                        //modal();
                    })
            };

            function _create() {
                vm.list_ids = [];
                for (var i = 0; i < vm.listsIds.length; i++) {
                    vm.list_ids.push(vm.listsIds[i].id);
                }
                var json =
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
                        "html_content": vm.advertising.html_content + "<a href='[unsubscribe]'> Click Here to Unsubscribe</a>",
                        "plain_content": "Check out our spring line! [unsubscribe]"
                    };

                AddAdvertisingService.createCampaigns(json)
                    .then(function (res) {
                        if (res.id > 0) {
                            toastr.success('Campanha criada com sucesso!');
                            $state.go('home.email.listEmailAdvertising');
                        } else {
                            toastr.error("Erro ao criar campanha", 'Error');
                        }

                    }, function (data) {
                        toastr.error("Erro ao criar campanha", 'Error');
                        //printConsole("ERROR");
                        //modal();
                    })
            }

            function countEmails(contact) {
                angular.forEach(contact, function (value1, key1) {
                    contactsEmails.push(value1.email);
                });

                contactsEmails = unique(contactsEmails);
                vm.totalEmails = contactsEmails.length;


                vm.totalPayable = parseFloat((valueEmail * vm.totalEmails));
                //printConsole(vm.totalPayable);
                if (vm.totalPayable <= vm.balanceEmail) {
                    vm.disableSend = false;
                } else {
                    vm.disableSend = true;
                }
                vm.disableSelect = false;
            }

            function unique(collection) {
                var output = [],
                    keys = [];

                angular.forEach(collection, function (item) {
                    // we check to see whether our object exists
                    var key = item;
                    // if it's not already part of our keys array
                    if (keys.indexOf(key) === -1) {
                        // add it to our keys array
                        keys.push(key);
                        // push this item to our final output array
                        output.push(item);
                    }
                });
                // return our array which should be devoid of
                // any duplicates
                return output;
            }


            ListEmailListContactsService.listAll()
                .then(function (res) {
                    vm.contactsLists = res.lists;
                    $scope.listA = vm.contactsLists;
                    $scope.items = vm.contactsLists;
                    //printConsole(vm.contactsLists);
                    vm.placeholderSelect = "Selecione listas de contato";
                    vm.disableSelect = false;
                }, function (data) {
                    vm.disableSelect = true;
                    //printConsole("ERROR");
                    //modal();
                });


            vm.createListSms = _createListSms;


            function _createListSms() {
                //printConsole("_createListSms");
            }

            function sendAwsSes () {

                var arrayListContacts = ["ricardommps@gmail.com","ricardommps@gmail.com","ricardomatta@outlook.com","ricardommps@g","elvis@conektta.com"];
                var from = vm.advertising.name + "<" + vm.advertising.from + ">";
                var eparam = {
                    Destination: {
                        ToAddresses: arrayListContacts
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
                    Source: "Bokarra Club<elvis@conektta.com.br>",
                    ReplyToAddresses: ["elvis@conektta.com.br"],
                    ReturnPath: "elvis@conektta.com.br"
                };
            }

            function _send() {
                vm.list_ids = [];
                for (var i = 0; i < vm.listsIds.length; i++) {
                    vm.list_ids.push(vm.listsIds[i].id);
                }
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
                    if (res == "Scheduled") {
                        toastr.success('Campanha enviado com sucesso! Valor debitado: R$' + vm.totalPayable);
                        $state.go('home.emailMarketing.advertising');
                    } else {
                        toastr.error("Não foi possivel enviar a campanha.Verifique parâmetros obrigatório", 'Error');
                    }
                });

            }


            //// Pick List Functions

            // init
            $scope.selectedA = [];
            $scope.selectedB = [];


            $scope.listB = [];
            $scope.checkedA = false;
            $scope.checkedB = false;

            function arrayObjectIndexOf(myArray, searchTerm, property) {
                for (var i = 0, len = myArray.length; i < len; i++) {
                    console.log(myArray[i]);
                    if (myArray[i][property] === searchTerm) return i;
                }
                return -1;
            }

            $scope.aToB = function () {
                //printConsole($scope.selectedA);
                for (var i in $scope.selectedA) {
                    var moveId = arrayObjectIndexOf($scope.items, $scope.selectedA[i], "id");
                    $scope.listB.push($scope.items[moveId]);
                    var delId = arrayObjectIndexOf($scope.listA, $scope.selectedA[i], "id");
                    $scope.listA.splice(delId, 1);
                }
                reset();

            };
            $scope.checkedA = false;
            $scope.checkedB = false;
            $scope.selectedAClick = function (item) {
                if (item.checked) {
                    $scope.selectedA.push(item.id);
                } else {
                    var index = $scope.selectedA.indexOf(item.id);
                    $scope.selectedA.splice(index, 1);
                }
                //printConsole($scope.selectedA);
            };

            $scope.selectedBClick = function (item) {
                if (item.checked) {
                    $scope.selectedA.push(item.id);
                } else {
                    var index = $scope.selectedA.indexOf(item.id);
                    $scope.selectedA.splice(index, 1);
                }
                //printConsole($scope.selectedA);
            };

            $scope.bToA = function () {
                for (var i in $scope.selectedB) {
                    var moveId = arrayObjectIndexOf($scope.items, $scope.selectedB[i], "id");
                    $scope.listA.push($scope.items[moveId]);
                    var delId = arrayObjectIndexOf($scope.listB, $scope.selectedB[i], "id");
                    $scope.listB.splice(delId, 1);
                }
                reset();

            };

            function reset() {
                $scope.selectedA = [];
                $scope.selectedB = [];
                $scope.toggle = 0;


            }

            $scope.toggleA = function () {

                if ($scope.selectedA.length > 0) {
                    $scope.selectedA = [];
                }
                else {
                    for (var i in $scope.listA) {
                        $scope.selectedA.push($scope.listA[i].id);
                    }
                }
            }

            $scope.toggleB = function () {

                if ($scope.selectedB.length > 0) {
                    $scope.selectedB = [];
                }
                else {
                    for (var i in $scope.listB) {
                        $scope.selectedB.push($scope.listB[i].id);
                    }
                }
            }

            $scope.drop = function (dragEl, dropEl, direction) {

                var drag = angular.element(dragEl);
                var drop = angular.element(dropEl);
                var id = drag.attr("data-id");
                var el = document.getElementById(id);

                if (!angular.element(el).attr("checked")) {
                    angular.element(el).triggerHandler('click');
                }

                direction();
                $scope.$digest();
            };


            function _verifyEmailIdentity() {
                SendEmailAdvertisingService.verifyEmailIdentity(vm.advertising.from)
                    .then(function (res) {
                        try {
                            console.log(res.data.ResponseMetadata.RequestId.length);
                            if(res.data.ResponseMetadata.RequestId.length > 0){
                                $state.go("home.email.successEmailIdentity");
                            }else{
                                toastr.error("Não foi possivel verificar seu E-mail", 'Error');
                            }
                        }
                        catch(err) {
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
