(function () {
    "use strict";

    angular.module('app').controller('appController',
        ['$scope', '$rootScope', '$location', 'authService',
            function ($scope, $rootScope, $location, authService) {
                //$scope.state = 'unauthorized';
                //$scope.signIn = function () {
                //    $scope.state = 'authorized';
                //};

                $scope.login = {};
                $scope.success = false;
                $scope.message = "";
                $scope.resendEmailConfirmationLinkIsVisible = false;
                $scope.resend = {};

                $scope.isAuthenticated = $rootScope.isAuthenticated = authService.authentication.isAuth;
                $scope.userName = $rootScope.userName = authService.authentication.userName;

                $scope.submitLoginForm = function (isValid) {
                    authService.login($scope.login).then(function (response) {
                        $scope.success = true;
                        //eventAggregator.trigger("isAuthenticated", true);
                        $scope.isAuthenticated = true;
                        $rootScope.isAuthenticated = true;
                        $rootScope.userName = authService.authentication.userName;
                        broadcastAuthenticationStatus();
                        console.log("appController/$scope.submitLoginForm().$scope.isAuthenticated: " + $scope.isAuthenticated);
                        $location.path("/home");
                    }, function (err) {
                        if (err.error === "email_not_confirmed") {
                            $scope.resendEmailConfirmationLinkIsVisible = true;
                        }
                        $scope.message = err.error_description;
                    });
                };

                $scope.resendConfirmEmail = function (userName) {
                    $scope.resend.Email = userName;

                    authService.resendConfirmEmail($scope.resend).then(function (response) {
                        $scope.success = true;
                        $scope.message = "Check your email to confirm your email address.";
                        $scope.resendEmailConfirmationLinkIsVisible = false;
                    }, function (err) {
                        $scope.message = err.error_description;
                    });
                };

                var broadcastAuthenticationStatus = function () {
                    $rootScope.$broadcast('user-authenticated',
                        {
                            isAuthenticated: $scope.isAuthenticated,
                            userName: authService.authentication.userName
                        });
                };
            }
        ]);

})();