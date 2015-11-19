angular.module('myApp', ['ngRoute', 'azureSearch', 'templates', 'homesCtrl', 'indexCtrl', 'trailsCtrl'])

  /**
   * Configuration
   */
    .config(function ($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    });