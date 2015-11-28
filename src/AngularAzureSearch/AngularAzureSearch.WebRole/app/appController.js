(function () {
    "use strict";

    angular.module('app').controller('appController',
        ['$scope', '$rootScope', '$location', 'authService',
            function ($scope, $rootScope, $location, authService) {
                //$scope.state = 'unauthorized';
                //$scope.signIn = function () {
                //    $scope.state = 'authorized';
                //};

                $location.absUrl().replace(/http/g, 'https');

                $scope.login = {};
                $scope.success = false;
                $scope.message = "";
                $scope.resendEmailConfirmationLinkIsVisible = false;
                $scope.resend = {};
                $scope.registration = {};
                $scope.savedSuccessfully = false;

                $scope.isAuthenticated = $rootScope.isAuthenticated = authService.authentication.isAuth;
                $scope.userName = $rootScope.userName = authService.authentication.userName;

                $scope.newUser = $rootScope.newUser = true;

                $scope.refreshTokens = $rootScope.refreshTokens = [];
                $scope.tokenRefreshed = $rootScope.tokenRefreshed = false;
                $scope.tokenResponse = $rootScope.tokenResponse = null;

                $scope.submitLoginForm = $rootScope.submitLoginForm = function (isValid) {
                    authService.login($scope.login).then(function (response) {
                        $scope.success = true;
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

                $scope.resendConfirmEmail = $rootScope.resendConfirmEmail = function (userName) {
                    $scope.resend.Email = userName;

                    authService.resendConfirmEmail($scope.resend).then(function (response) {
                        $scope.success = true;
                        $scope.message = "Check your email to confirm your email address.";
                        $scope.resendEmailConfirmationLinkIsVisible = false;
                    }, function (err) {
                        $scope.message = err.error_description;
                    });
                };

                $scope.submitSignupForm = $rootScope.submitSignupForm = function (isValid) {

                    authService.saveRegistration($scope.registration).then(function (response) {

                        $scope.savedSuccessfully = true;
                        $scope.message = "You have registered successfully!  Please check your email to activate your account.";

                    },
                     function (response) {
                         console.log(angular.toJson(response));
                         var errors = [];
                         for (var key in response.data.ModelState) {
                             for (var i = 0; i < response.data.ModelState[key].length; i++) {
                                 errors.push(response.data.ModelState[key][i]);
                             }
                         }
                         $scope.message = errors.join(' ');
                     });
                };

                $scope.logOut = $rootScope.logOut = function () {
                    authService.logOut();
                    $scope.isAuthenticated = false;
                    console.log("logOut()/scope.isAuthenticated: " + $scope.isAuthenticated);

                    $location.path('/index');
                };

                $scope.toggleNewUser = $rootScope.toggleNewUser = function () {
                    $scope.newUser = $scope.newUser === false ? true : false;
                    broadcastUserState();
                };

                //tokensManagerService.getRefreshTokens().then(function (results) {

                //    $scope.refreshTokens = $rootScope.refreshTokens = results.data;

                //}, function (error) {
                //    alert(error.data.message);
                //});

                //$scope.deleteRefreshTokens = $rootScope.deleteRefreshTokens = function (index, tokenid) {

                //    tokenid = window.encodeURIComponent(tokenid);

                //    tokensManagerService.deleteRefreshTokens(tokenid).then(function (results) {

                //        $scope.refreshTokens.splice(index, 1);

                //    }, function (error) {
                //        alert(error.data.message);
                //    });
                //};

                //$scope.refreshToken = $rootScope.refreshToken = function () {

                //    authService.refreshToken().then(function (response) {
                //        $scope.tokenRefreshed = true;
                //        $scope.tokenResponse = response;
                //    },
                //     function (err) {
                //         $location.path('/');
                //     });
                //};

                var broadcastUserState = function () {
                    $rootScope.$broadcast('user-state-updated',
                        {
                            newUser: $scope.newUser
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