(function () {
    'use strict';

    angular.module('app')
        .controller('loginCtrl', ["$location", "authService", '$scope', '$rootScope', function ($location, authService, $scope, $rootScope) {
            var vm = this;

            vm.login = {};
            vm.success = false;
            vm.message = "";
            vm.resendEmailConfirmationLinkIsVisible = false;
            vm.resend = {};

            vm.isAuthenticated = authService.authentication.isAuth;

            vm.logOut = function () {
                authService.logOut();
                vm.isAuthenticated = false;

                $location.path('/home');
            };

            vm.submitLoginForm = function (isValid) {
                authService.login(vm.login).then(function (response) {
                    vm.success = true;
                    vm.isAuthenticated = true;
                    broadcastAuthenticationStatus();
                    $location.path("/home");
                }, function (err) {
                    if (err.error === "email_not_confirmed") {
                        vm.resendEmailConfirmationLinkIsVisible = true;
                    }
                    vm.message = err.error_description;
                });
            };

            vm.resendConfirmEmail = function (userName) {
                vm.resend.Email = userName;

                authService.resendConfirmEmail(vm.resend).then(function (response) {
                    vm.success = true;
                    vm.message = "Check your email to confirm your email address.";
                    vm.resendEmailConfirmationLinkIsVisible = false;
                }, function (err) {
                    vm.message = err.error_description;
                });
            };

            var broadcastAuthenticationStatus = function () {
                $rootScope.$broadcast('user-authenticated',
                    {
                        isAuthenticated: authService.authentication.userName,
                        userName: authService.authentication.userName
                    });
            };

            //vm.submitLoginForm = function (isValid) {
            //    authService.login(vm.login).then(function (response) {
            //        vm.success = true;
            //        //eventAggregator.trigger("isAuthenticated", true);
            //        $location.path("/home");
            //    }, function (err) {
            //        vm.message = err.error_description;
            //    });
            //};

        }]);
})();