(function () {
    'use strict';

    angular.module('app')
        .controller('trailsController', ["$scope", "trailService", "authService",
            function ($scope, trailService, authService) {
                
                $scope.trails = [];
                $scope.trail = {};

                $scope.trailFormIsVisible = false;

                $scope.dialogTitle = "";


                // Load the list of trails.
                trailService.getTrails()
                                .then(function (data) {
                                    $scope.trails = data;
                                    //console.log("trails: " + angular.toJson(data));
                                });

                $scope.showAddTrailForm = function () {
                    hideAllForms();
                    $scope.trail = {};
                    $scope.trailFormIsVisible = true;
                    $scope.dialogTitle = "Add";
                };

                $scope.submitTrailForm = function (isValid, trail) {
                    if (!isValid) {
                        return;
                    }

                    if (trail.id == null) {
                        trailService.insertTrail(trail).then(function (data) {
                            //trail.id = data.id;
                            $scope.trails.push(data.Result);
                            $scope.trailFormIsVisible = false;
                            $scope.trail = {};
                        });
                    } else {
                        trailService.updateTrail(trail).then(function (data) {
                            $scope.trailFormIsVisible = false;
                            $scope.trail = {};
                        });
                    }
                };

                $scope.cancelTrailForm = function () {
                    //$("#trailform input").removeAttr("required");
                    $scope.trailFormIsVisible = false;
                    $scope.trail = {};
                };

                $scope.update = function (idx) {
                    hideAllForms();
                    $scope.dialogTitle = "Edit";
                    $scope.trail = $scope.trails[idx];
                    $scope.trailFormIsVisible = true;
                };

                $scope.delete = function (idx) {
                    if (confirm("Are you sure you want to delete this trail?")) {
                        var g = $scope.trails[idx];
                        trailService.deleteTrail(g).then(function (data) {
                            $scope.trails.splice(idx, 1);
                        });
                    }
                };

                function hideAllForms() {
                    $scope.trailFormIsVisible = false;
                }

            }]);
})();