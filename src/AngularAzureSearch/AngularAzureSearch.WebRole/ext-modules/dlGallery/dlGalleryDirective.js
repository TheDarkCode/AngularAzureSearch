(function () {
    "use strict";

    angular.module('dlGallery').directive('dlGallery', ['$timeout', function ($timeout) {
        return {
            /* restrict: 'AE', */
            scope: {
                theme: '@',
                type: '@',
                sort: '@',
                filter: '@',
                controls: '@',
                masonry: '@',
                columns: '@',
                random: '@',
                title: '@',
                subtitle: '@',
                longdesc: '@'
            },
            transclude: true,
            templateUrl: 'ext-modules/dlGallery/dlGalleryTemplate.html',
            controller: 'dlGalleryController',
            link: function (scope, el, attr) {
            }
        };
    }]);

})();