(function () {
    "use strict";

    angular.module('app').config(['$routeProvider', function ($routeProvider) {
        var routes = [
            {
                url: '/dashboard',
                config: {
                    template: '<d-dashboard></d-dashboard>'
                }
            }
        ];

        routes.forEach(function (route) {
            $routeProvider.when(route.url, route.config);
        });

        $routeProvider.otherwise({ redirectTo: '/dashboard' });

    }]);
})();