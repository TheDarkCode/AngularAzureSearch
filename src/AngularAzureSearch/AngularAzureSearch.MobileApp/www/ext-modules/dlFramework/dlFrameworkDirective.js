(function () {
    "use strict";

    angular.module("dlFramework").directive("dlFramework", function () {
        return {
            transclude: true,
            scope: {
                title: '@',
                subtitle: '@',
                iconFile: '@'
                /* iconXs: '@' */
            },
            controller: "dlFrameworkController",
            templateUrl: "ext-modules/dlFramework/dlFrameworkTemplate.html"
        };
    });
})();