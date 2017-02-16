https://email-verification.eu-west-1.amazonaws.com/?AWSAccessKeyId=AKIAJQA2TSFQTDSUODZQ&Context=252620909211&Identity.IdentityName=ricardommps%40gmail.com&Identity.IdentityType=EmailAddress&Namespace=Bacon&Operation=ConfirmVerification&Signature=h%2FrVqxUZgmkZNHwDG4ak0jXO6RKvGcRkAWAlXQ4HJqk%3D&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2017-02-15T13%3A00%3A22.011Z

    /**
     * @author v.lugovsky
     * created on 16.12.2015
     */
    (function () {
        'use strict';

        angular.module('BlurAdmin.pages.email')
            .controller('SuccessEmailIdentityPageCtrl', SuccessEmailIdentityPageCtrl)

        function SuccessEmailIdentityPageCtrl($scope, $rootScope, $state) {
            var vm = this;
            console.log("SuccessEmailIdentityPageCtrl");

        }

    })();
