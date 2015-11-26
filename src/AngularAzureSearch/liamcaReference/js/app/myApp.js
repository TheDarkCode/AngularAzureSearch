angular.module('myApp', ['ngRoute', 'azureSearch', 'homesCtrl', 'indexCtrl', 'trailsCtrl'])

  /**
   * Configuration
   */
    .config(function ($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    });