(function () {
    "use strict";

    angular.module('dlParallax').directive('parallax', function () {
      return {
        restrict: 'A',
        scope: {
          parallaxRatio: '@',
          parallaxVerticalOffset: '@',
          parallaxHorizontalOffset: '@',
        },
        link: function($scope, elem, attrs) {
          var setPosition = function () {
            if(!$scope.parallaxHorizontalOffset) $scope.parallaxHorizontalOffset = '0';
            var calcValY = $window.pageYOffset * ($scope.parallaxRatio ? $scope.parallaxRatio : 1.1 );
            if (calcValY <= $window.innerHeight) {
              var topVal = (calcValY < $scope.parallaxVerticalOffset ? $scope.parallaxVerticalOffset : calcValY);
              var hozVal = ($scope.parallaxHorizontalOffset.indexOf("%") === -1 ? $scope.parallaxHorizontalOffset + 'px' : $scope.parallaxHorizontalOffset);
              elem.css('transform', 'translate(' + hozVal + ', ' + topVal + 'px)');
            }
          };

          setPosition();

          angular.element($window).bind("scroll", setPosition);
          angular.element($window).bind("touchmove", setPosition);
        }  // link function
      };
    });

})();