(function () {
    "use strict";

    angular.module('dlMenu').directive('dlMenu', ['$timeout', function ($timeout) {
        return {
            /* restrict: 'AE', */
            scope: {
                footer: '@',
                widget: '@'
            },
            transclude: true,
            templateUrl: 'ext-modules/dlMenu/dlMenuTemplate.html',
            controller: 'dlMenuController',
            link: function (scope, el, attr) {
                var item = el.find('.dl-selectable-item:first');
                $timeout(function () {
                    item.trigger('click');
                });
            }
        };
    }]);

})();