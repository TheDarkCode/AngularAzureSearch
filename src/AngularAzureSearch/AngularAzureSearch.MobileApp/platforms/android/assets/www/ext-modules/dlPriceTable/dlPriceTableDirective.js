(function () {
    "use strict";

    angular.module("dlPriceTable").directive("dlPriceTable", function () {
        return {
            transclude: true,
            scope: {
                title: '@',
                price: '@',
                route: '@',
                buttoncolor: '@',
                buttontext: '@',
                color: '@',
                features: '=',
                theme: '@',
                classes: '@'
            },
            controller: "dlPriceTableController",
            templateUrl: "ext-modules/dlPriceTable/dlPriceTableTemplate.html"
        };
    });
})();