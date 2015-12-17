(function () {
    "use strict";

    angular.module('dlPriceTable').directive('dlPriceItem', function () {
        return {
            /*restrict: 'AE',*/
            require: '^dlPriceTable',
            scope: {
                title: '@',
                price: '@',
                route: '@',
                buttoncolor: '@',
                buttontext: '@',
                color: '@',
                features: '=',
                featured: '@',
                theme: '@',
                classes: '@',
                group: '@'
            },
            templateUrl: 'ext-modules/dlPriceTable/dlPriceItemTemplate.html',
            link: function (scope, el, attr, ctrl) {
            }
        };
    });

})();