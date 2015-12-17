(function () {
    "use strict";

    angular.module('dlSearch').directive('dlSearch', ['$timeout', function ($timeout) {
        return {
            /* restrict: 'AE', */
            scope: {
                title: '@',
                type: '@',
                layout: '@',
                icon: '@',
                color: '@',
                features: '=',
                theme: '@',
                classes: '@',
                bodyclasses: '@'
            },
            transclude: true,
            templateUrl: 'ext-modules/dlSearch/dlSearchFullMapTemplate.html',
            controller: 'dlSearchRoute',
            reloadOnSearch: false,
            link: function (scope, el, attr) {
            }
        };
    }]);

})();