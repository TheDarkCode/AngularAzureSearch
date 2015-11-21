(function () {
    "use strict";

    angular.module('dlGallery').directive('dlGalleryItem', function () {
        return {
            /*restrict: 'AE',*/
            require: '^dlGallery',
            scope: {
                label: '@',
                src: '@',
                alt: '@',
                crossorigin: '@',
                height: '@',
                width: '@',
                ismap: '@',
                longdesc: '@',
                usemap: '@',
                route: '@'
            },
            templateUrl: 'ext-modules/dlGallery/dlGalleryItemTemplate.html',
            link: function (scope, el, attr, ctrl) {
            }
        };
    });

})();