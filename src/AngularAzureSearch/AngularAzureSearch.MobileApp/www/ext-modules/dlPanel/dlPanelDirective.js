(function () {
    "use strict";

    angular.module("dlPanel").directive("dlPanel", function () {
        return {
            transclude: true,
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
            controller: "dlPanelController",
            templateUrl: "ext-modules/dlPanel/dlPanelTemplate.html"
        };
    });
})();