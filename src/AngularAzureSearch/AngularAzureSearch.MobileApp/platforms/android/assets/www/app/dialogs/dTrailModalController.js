(function () {
    'use strict';

    angular.module('app')
        .controller('dTrailModalController', ["$scope", "close", "$element", "trail", "dialogTitle",
            function ($scope, close, $element, trail, dialogTitle) {

                $scope.trail = trail;
                $scope.dialogTitle = dialogTitle;
                
                $scope.trailform = {};

                $scope.close = function () {
                    if (confirm("Are you sure you want to save this trail?")) {
                        close({
                            trail: $scope.trail,
                            isValid: $scope.trailform.$valid
                        }, 500); // close, but give 500ms for bootstrap to animate
                    }
                };

                $scope.cancel = function () {
                    $element.modal('hide');

                    close({
                        trail: $scope.trail,
                        isValid: false
                }, 500);
                };

            }]);
})();