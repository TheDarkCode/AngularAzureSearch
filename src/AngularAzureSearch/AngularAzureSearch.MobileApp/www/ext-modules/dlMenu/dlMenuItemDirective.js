(function () {
    "use strict";

    angular.module('dlMenu').directive('dlMenuItem', function () {
        return {
            restrict: 'AE',
            require: '^dlMenu',
            scope: {
                label: '@',
                icon: '@',
                route: '@'
            },
            templateUrl: 'ext-modules/dlMenu/dlMenuItemTemplate.html',
            link: function (scope, el, attr, ctrl) {
                scope.isActive = function () {
                    return el === ctrl.getActiveElement();
                };

                scope.isVertical = function () {
                    return ctrl.isVertical() || el.parents('.dl-subitem-section').length > 0;
                };

                el.on('click', function (evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    scope.$apply(function () {
                        ctrl.setActiveElement(el);
                        ctrl.setRoute(scope.route);
                    });
                    console.log("menu item clicked");
                });
            }
        };
    });

})();