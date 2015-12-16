(function () {
    "use strict";

    angular.module("dlFramework").directive("dlClickAnywhere", "$document", function ($document) {
        return {
            restrict: 'A',
            link: function (scope, elem, attr, ctrl) {
                elem.bind('click', function (e) {
                    // this part keeps it from firing the click on the document.
                    e.stopPropagation();
                });
                $document.bind('click', function () {
                    // magic here.
                    scope.$apply(attr.dlClickAnywhere);
                })
            }
        };
    });
})();