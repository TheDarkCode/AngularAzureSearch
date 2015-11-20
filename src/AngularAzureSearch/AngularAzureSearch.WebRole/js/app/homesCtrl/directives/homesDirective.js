(function () {
    "use strict";

    angular.module('homesCtrl').directive('homesDirective', ['$timeout', function ($timeout) {
        return {
            /* restrict: 'AE', */
            scope: {
            },
            transclude: true,
            templateUrl: '/js/app/homesCtrl/homes.html',
            controller: 'homesRoute',
            reloadOnSearch: false,
            link: function (scope, el, attr) {
            }
        };
    }]);

})();