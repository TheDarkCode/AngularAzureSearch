(function () {
    "use strict";

    angular.module('app').config(['$routeProvider', function ($routeProvider) {
        var routes = [
            {
                url: '/dashboard',
                config: {
                    template: '<d-dashboard></d-dashboard>'
                }
            },
            {
                url: '/homes',
                config: {
                    template: '<d-homes></d-homes>',
                    reloadOnSearch: false
                }
            },
            //{
            //    url: '/trails',
            //    config: {
            //        template: '<d-trails></d-trails>',
            //        reloadOnSearch: false
            //    }
            //}
        ];

        routes.forEach(function (route) {
            $routeProvider.when(route.url, route.config);
        });

        $routeProvider.otherwise({ redirectTo: '/dashboard' });

    }]);
})();