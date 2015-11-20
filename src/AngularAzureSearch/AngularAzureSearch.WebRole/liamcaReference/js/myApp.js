angular.module('myApp', ['ngRoute', 'azureSearch', 'templates', 'homesCtrl', 'indexCtrl'])

  /**
   * Configuration
   */
    .config(function ($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    });