(function () {
    "use strict";

    angular.module('dlParallax').directive('parallaxBackground', function () {
        return {
            restrict: 'A',
            transclude: true,
            template: '<div ng-transclude></div>',
            scope: {
                parallaxRatio: '@',
                parallaxVerticalOffset: '@',
            },
            link: function ($scope, elem, attrs) {
                var setPosition = function () {
                    var calcValY = (elem.prop('offsetTop') - $window.pageYOffset) * ($scope.parallaxRatio ? $scope.parallaxRatio : 1.1) - ($scope.parallaxVerticalOffset || 0);
                    // horizontal positioning
                    elem.css('background-position', "50% " + calcValY + "px");
                };

                // set our initial position - fixes webkit background render bug
                angular.element($window).bind('load', function (e) {
                    setPosition();
                    $scope.$apply();
                });

                angular.element($window).bind("scroll", setPosition);
                angular.element($window).bind("touchmove", setPosition);
            }  // link function
        };
    });

})();