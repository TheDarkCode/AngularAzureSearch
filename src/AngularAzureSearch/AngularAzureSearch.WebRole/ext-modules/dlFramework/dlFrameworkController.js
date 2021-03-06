﻿(function () {
    "use strict";

    angular.module("dlFramework").controller("dlFrameworkController",
        ['$scope', '$window', '$timeout', '$rootScope', '$location', 'Fullscreen',
            function ($scope, $window, $timeout, $rootScope, $location, Fullscreen) {

                $scope.isMenuVisible = true;
                $scope.isMenuButtonVisible = true;
                $scope.isNavbarMenuButtonVisible = true;
                $scope.isMenuVertical = true;
                $scope.isFullScreen = false;
                $scope.userName = $rootScope.userName;
                $scope.isAuthenticated = $rootScope.isAuthenticated;

                $scope.$on('user-authenticated', function (evt, data) {
                    console.log("user authenticated called")
                    $scope.isAuthenticated = data.isAuthenticated;
                    $scope.userName = data.userName;
                });

                $scope.logOut = $rootScope.logOut;

                $scope.$on('dl-menu-item-selected-event', function (evt, data) {
                    $scope.routeString = data.route;
                    $location.path(data.route);
                    checkWidth();
                    broadcastMenuState();
                });

                $scope.$on('dl-menu-orientation-changed-event', function (evt, data) {
                    $scope.isMenuVertical = data.isMenuVertical;
                    $timeout(function () {
                        $($window).trigger('resize');
                    }, 0);
                });

                $($window).on('resize.dlFramework', function () {
                    $scope.$apply(function () {
                        checkWidth();
                        broadcastMenuState();
                    });
                });

                $scope.$on('dlFullscreen.change', function () {
                    $scope.$apply(function () {
                        checkWidth();
                        broadcastMenuState();
                    });
                });

                $scope.$on("$destroy", function () {
                    /* remove the handler that has been added earlier */
                    $($window).off("resize.dlFramework");
                });

                var checkWidth = function () {
                    //console.log("checkWidth called");
                    var width = Math.max($($window).width(), $window.innerWidth);
                    /* If Tablet or Greater (768px) Menu Visible Bool Set True */
                    $scope.isMenuVisible = (width > 1200);
                    $scope.isMenuButtonVisible = !$scope.isMenuVisible;
                };

                $scope.menuButtonClicked = function () {
                    $scope.isMenuVisible = !$scope.isMenuVisible;
                    broadcastMenuState();
                    //$scope.$apply();
                };

                var broadcastMenuState = function () {
                    $rootScope.$broadcast('dl-menu-show',
                        {
                            show: $scope.isMenuVisible,
                            isVerticle: $scope.isMenuVerticle,
                            allowHorizontalToggle: !$scope.isMenuButtonVisible
                        });
                };

                $scope.goFullscreen = function () {

                    // Fullscreen
                    if (Fullscreen.isEnabled()) {
                        Fullscreen.cancel();
                    }
                    else {
                        Fullscreen.all();
                    }

                    // Set Fullscreen to a specific element (bad practice)
                    // Fullscreen.enable( document.getElementById('img') )

                };

                $scope.goFullScreenViaWatcher = function () {
                    $scope.isFullScreen = !$scope.isFullScreen;
                };

                $timeout(function () {
                    checkWidth();
                }, 0);
            }
        ]);
})();