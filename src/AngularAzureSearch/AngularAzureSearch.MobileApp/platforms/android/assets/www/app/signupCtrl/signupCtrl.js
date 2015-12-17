(function () {
    'use strict';

    angular.module('app')
        .controller('signupCtrl', ['$scope', 'authService', function ($scope, authService) {
            $scope.registration = {};
            $scope.savedSuccessfully = false;
            $scope.message = "";

            $scope.submitSignupForm = function (isValid) {

                authService.saveRegistration($scope.registration).then(function (response) {

                    $scope.savedSuccessfully = true;
                    $scope.message = "You have registered successfully!  Please check your email to activate your account.";

                },
                 function (response) {
                     console.log(angular.toJson(response));
                     var errors = [];
                     for (var key in response.data.ModelState) {
                         for (var i = 0; i < response.data.ModelState[key].length; i++) {
                             errors.push(response.data.ModelState[key][i]);
                         }
                     }
                     $scope.message = errors.join(' ');
                 });
            };

        }]);
})();