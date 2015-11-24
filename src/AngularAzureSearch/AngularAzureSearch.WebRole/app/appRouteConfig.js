(function () {
    "use strict";

    angular.module('app').config(['$routeProvider', function ($routeProvider) {
        var routes = [
            {
                url: '/dashboard',
                config: {
                    template: '<d-dashboard></d-dashboard>',
                    reloadOnSearch: false
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
            {
                url: '/login',
                config: {
                    controller: "loginCtrl",
                    templateUrl: "/app/loginCtrl/login.html"
                }
            },
            {
                url: '/signup',
                config: {
                    controller: "signupCtrl",
                    templateUrl: "/app/signupCtrl/signup.html"
                }
            },
            {
                url: '/confirmemail',
                config: {
                    controller: "confirmEmailCtrl",
                    templateUrl: "/app/confirmEmailCtrl/confirmEmail.html"
                }
            }
        ];

        routes.forEach(function (route) {
            $routeProvider.when(route.url, route.config);
        });

        $routeProvider.otherwise({ redirectTo: '/dashboard' });
    }]);
})();