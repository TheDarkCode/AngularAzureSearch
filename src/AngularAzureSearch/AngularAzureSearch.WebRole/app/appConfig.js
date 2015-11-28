(function () {
    "use strict";

    angular.module('app').config(function ($provide, $httpProvider) {
        $provide.decorator("$exceptionHandler", ["$delegate", function ($delegate) {
            return function (exception, cause) {
                $delegate(exception, cause);
                //alert.(exception.message);
            }
        }]);

        $httpProvider.interceptors.push('authInterceptorService');
    })

    //.config(function ($httpProvider) {
    //    $httpProvider.interceptors.push('authInterceptorService');
    //})

    .run(['authService', function (authService) {
        authService.fillAuthData;
    }]);

})();