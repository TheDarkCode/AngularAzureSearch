/**
 * Homes Configuration
 */
.config(function ($routeProvider) {
    $routeProvider.when('/homes', {
        controller: 'homesRoute',
        templateUrl: 'views/homes.html',
        reloadOnSearch: false
    });
});