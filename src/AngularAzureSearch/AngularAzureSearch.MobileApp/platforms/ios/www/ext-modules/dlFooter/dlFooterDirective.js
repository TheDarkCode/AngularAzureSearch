(function () {
    "use strict";

    angular.module("dlFooter").directive("dlFooter", function () {
        return {
            transclude: true,
            scope: {
                socialname: '@',
                copyright: '@',
                protectedYears: '@',
                twitter: '@',
                facebook: '@',
                linkedin: '@',
                instagram: '@',
                angellist: '@',
                bizspark: '@'
            },
            controller: "dlFooterController",
            templateUrl: "ext-modules/dlFooter/dlFooterTemplate.html"
        };
    });
})();