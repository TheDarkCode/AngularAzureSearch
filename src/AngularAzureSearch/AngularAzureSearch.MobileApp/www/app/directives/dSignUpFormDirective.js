(function () {
    "use strict";

    angular.module('app').directive('dSignUpForm', [function () {
        return {
            scope: false,
            templateUrl: 'app/templates/dSignUpFormTemplate.html'
        }
    }]);

})();