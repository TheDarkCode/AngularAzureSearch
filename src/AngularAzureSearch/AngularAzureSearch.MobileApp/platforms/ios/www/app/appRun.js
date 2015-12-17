(function () {
    "use strict";

    angular.module('app').run(['authService', function (authService) {
        authService.fillAuthData();
    }]);

})();