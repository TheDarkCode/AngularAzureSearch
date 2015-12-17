(function () {
    'use strict';

    angular.module('myApp')
        .controller('confirmEmailCtrl', ['$scope', '$rootScope', '$routeParams', 'authService', function ($scope, $rootScope, $routeParams, authService) {
            $scope.title = "Processing request... please wait.";
            $scope.message = $rootScope.message;

            var userId = $routeParams.userId;
            var code = $routeParams.code;
            console.log("confirming email - userId: " + userId + " - code: " + code);

            authService.confirmEmail(userId, code).then(function (response) {
                $scope.message = "Congratulations, you have been verified! ";
                $scope.title = "Congratulations!";
                $scope.success = true;
            }, function (err) {
                $scope.title = "Doh!";
                console.log(angular.toJson(err));
                $scope.message = err.error_description;
                $scope.success = false;
            });

        }]);
})();