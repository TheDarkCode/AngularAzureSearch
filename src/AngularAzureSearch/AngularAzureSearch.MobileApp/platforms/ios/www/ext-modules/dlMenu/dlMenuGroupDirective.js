(function () {
    "use strict";

    angular.module('dlMenu').directive('dlMenuGroup', function () {
        return {
            restrict: 'E',
            require: '^dlMenu',
            transclude: true,
            scope: {
                label: '@',
                icon: '@'
            },
            templateUrl: 'ext-modules/dlMenu/dlMenuGroupTemplate.html',
            link: function (scope, el, attrs, ctrl) {
                scope.isOpen = false;
                scope.closeMenu = function () {
                    scope.isOpen = false;
                    console.log("closeMenu() called");
                };
                scope.clicked = function () {
                    scope.isOpen = !scope.isOpen;
                    console.log("clicked called");
                    console.log("isOpen: " + scope.isOpen);

                    if (el.parents('.dl-subitem-section').length == 0)
                        scope.setSubmenuPosition();
                    ctrl.setOpenMenuScope(scope);


                    console.log("ctrl.setOpenMenuScope: " + scope)
                };
                scope.isVertical = function () {
                    return ctrl.isVertical() || el.parents('.dl-subitem-section').length > 0;
                };

                scope.setSubmenuPosition = function () {
                    var pos = el.offset();
                    console.log(pos);
                    /* adjust pos.left + # (ie: 20) if using other fonts */
                    $('.dl-subitem-section').css({ 'left': pos.left, 'top': 36 })
                };
            }
        };
    });

})();