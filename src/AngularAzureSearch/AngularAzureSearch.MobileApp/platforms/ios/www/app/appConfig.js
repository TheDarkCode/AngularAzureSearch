(function () {
    "use strict";

    angular.module('app').config(function ($provide, $httpProvider, paginationTemplateProvider) {
        $provide.decorator("$exceptionHandler", ["$delegate", function ($delegate) {
            return function (exception, cause) {
                $delegate(exception, cause);
                //alert.(exception.message);
            }

            paginationTemplateProvider.setPath('Scripts/dirPagination.tpl.html');
        }]);

        $httpProvider.interceptors.push('authInterceptorService');
    });

    //.config(function ($httpProvider) {
    //    $httpProvider.interceptors.push('authInterceptorService');
    //})

})();