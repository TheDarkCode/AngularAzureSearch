angular.module('indexCtrl', [])
  .controller('indexRoute', function () {

  })

  /**
   * Homes Configuration
   */
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            controller: 'indexRoute',
            templateUrl: '/js/app/indexCtrl/index.html'
        });
    });