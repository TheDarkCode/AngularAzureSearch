(function() {
    "use strict";

    angular.module('dlMenu').controller('dlMenuController',
        ['$scope', '$rootScope',
            function ($scope, $rootScope) {

                $scope.isVertical = true;
                $scope.openMenuScope = null;
                $scope.showMenu = true;
                $scope.allowHorizontalToggle = true;

                this.getActiveElement = function () {
                    return $scope.activeElement;
                };

                this.setActiveElement = function (el) {
                    $scope.activeElement = el;
                };
                
                this.setRoute = function (route) {
                    /* Could use $rootScope.$emit but would only work up same tree */
                    $rootScope.$broadcast('dl-menu-item-selected-event',
                        { route: route });
                };

                this.isVertical = function () {
                    return $scope.isVertical;
                };

                this.setOpenMenuScope = function (scope) {
                    $scope.openMenuScope = scope;
                    console.log("setOpenMenuScope called on: " + scope)
                };

                $scope.$on('dl-menu-show', function (evt, data) {
                    console.log("dl-menu show called")
                    $scope.showMenu = data.show;
                    $scope.isVerticle = data.isVerticle;
                    $scope.allowHorizontalToggle = data.allowHorizontalToggle;
                });

                $scope.toggleMenuOrientation = function () {
                    /* close any open menus */
                    if ($scope.openMenuScope) {
                        console.log("$scope.openMenuScope: " + $scope.openMenuScope)
                        $scope.openMenuScope.closeMenu();
                    }

                    $scope.isVertical = !$scope.isVertical;

                    $rootScope.$broadcast('dl-menu-orientation-changed-event',
                        { isMenuVertical: $scope.isVertical });
                };

                angular.element(document).bind('click', function (e) {
                    if ($scope.openMenuScope && !$scope.isVertical) {
                        if ($(e.target).parent().hasClass('dl-selectable-item')) {
                            console.log("has selectable-item and returned");
                            return;
                        }
                        $scope.$apply(function () {
                            console.log("$scope.openMenuScope.closeMenu called")
                            $scope.openMenuScope.closeMenu();
                        });
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });

            }
        ]);

})();