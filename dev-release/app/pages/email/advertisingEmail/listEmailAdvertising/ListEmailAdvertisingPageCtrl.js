/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.email')
        .controller('ListEmailAdvertisingPageCtrl', ListEmailAdvertisingPageCtrl);

    /** @ngInject */
    function ListEmailAdvertisingPageCtrl($scope,
                                          ListEmailListContactsService,
                                          ListEmailAdvertisingService,
                                          SendEmailAdvertisingService,
                                          socket,
                                          $timeout,
                                          toastr,
                                          $window,
                                          SHIPPINGVALUE)
    {
        //printConsole("ListEmailAdvertisingPageCtrl");
        var vm = this;
        vm.campaigns = [];
        vm.displayCampaigns = false;
        vm.displayCampaignsError = false;

        vm.sendEmail = _sendEmail;

        var user = JSON.parse($window.localStorage.getItem('conekttaUser'));
        if(user === null){
            $state.go('signin');
        }
        var idUser = user[0].id;

        var jsonEmail = {id: idUser};
        var contactsEmails = [];
        var valueEmail = parseFloat(SHIPPINGVALUE.email);

        socket.emit('send:balanceEmail', jsonEmail);

        socket.on('send:errorBalanceEmail', function (error) {
            vm.balanceEmail = 0;
            toastr.error(error, 'Error');
        });

        socket.on('send:sucessBalanceEmail', function (data) {
            if(data === "Nao foi encontrado creditos para este usuario" ||
            data === "parametro invalido"){
                vm.balanceEmail = 0;
            }else{
                vm.balanceEmail = parseFloat(data.split(':')[1].split('}')[0]);
            }

        });


        function _sendEmail(item) {
            //printConsole(item.id);
            SendEmailAdvertisingService.sendCampaigns(item)
                .then(function(res) {
                    if(res.errors){
                        //printConsole(res.errors[0].message);
                        toastr.error("Erro ao enviar campanha!", 'Error');
                    }else{
                        //printConsole("sucess");
                        toastr.success('Campanha enviada com sucesso!');
                        vm.displayCampaigns = false;
                        vm.displayCampaignsError = false;
                        $timeout(listCampaigns, 1000);
                    }



                },function(data) {
                    //printConsole("ERROR");
                    //modal();
                })
        }

        function listCampaigns() {
            ListEmailAdvertisingService.campaigns()
                .then(function(res) {
                    vm.campaigns = res.result;
                    vm.displayCampaigns = true
                    vm.displayCampaignsError = false;

                },function(data) {
                    //printConsole("ERROR");
                    vm.displayCampaignsError = true;
                    vm.displayCampaigns = false;
                })

        }

        function showContactList(listId) {
            ListEmailListContactsService.showContactList(listId)
                .then(function (res) {
                    countEmails(res.recipients);
                }, function (data) {
                    //printConsole("ERROR");
                    //modal();
                })
        };

        function countEmails(contact) {
            //printConsole("countEmails");
            angular.forEach(contact, function (value1, key1) {
                contactsEmails.push(value1.email);
            });

            contactsEmails = unique(contactsEmails);
            var totalEmails = contactsEmails.length;

            vm.totalPayable = parseFloat((valueEmail * totalEmails));

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

        $timeout(listCampaigns, 1000);

    }

})();


