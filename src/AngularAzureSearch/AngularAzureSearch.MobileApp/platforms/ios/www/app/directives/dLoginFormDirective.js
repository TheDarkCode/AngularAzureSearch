(function () {
    "use strict";

    angular.module('app').directive('dLoginForm', [function () {
        return {
            scope: false,
            templateUrl: 'app/templates/dLoginFormTemplate.html'
        }
    }]);

})();