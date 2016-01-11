// AngularAzureSearch Mobile App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
function isRunningInRipple() {
    // in an actual device(or emulator) all url's in the webview are 'file:// ... ' (since I don't load any external urls)
    return document.URL.indexOf('http://') >= 0 || document.URL.indexOf('https://') >= 0;
  }

  angular.module('angularazuresearch', ['ionic', 'LocalStorageModule'])

  .run(['$ionicPlatform', '$timeout', function ($ionicPlatform, $timeout) {

    function disableRipplePopup() {
      var dialogBody = parent.document.getElementById("exec-dialog");
      var overlay = parent.document.querySelector(".ui-widget-overlay");
      var ngDialog = angular.element(dialogBody.parentElement);
      var ngOverlay = angular.element(overlay);
      var hideRules = { "height": "0px", "width": "0px", "display": "none" };
        ngDialog.css(hideRules); // hide annoying popup
        ngOverlay.css(hideRules); // hide annoying popup's backdrop
      }

      $ionicPlatform.ready(function () {

        // Block annoying ripple popup
        if (isRunningInRipple()) $timeout(disableRipplePopup);

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
      StatusBar.hide();
    });

    //authService.fillAuthData();
  }])

// Change to your WebAPI's location. Debug :: https://localhost:44301/
// GitHub Demo API Endpoint: https://githubapi.azurewebsites.net/
.constant('apiSettings', {
  apiUriBase: 'https://githubapi.azurewebsites.net/',
})

.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    //$httpProvider.interceptors.push('authInterceptorService');

    $stateProvider
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    .state('tabs.home', {
      url: '/home',
      views: {
        'home-tab': {
          templateUrl: 'templates/home.html'
        }
      }
    })

    .state('tabs.trails', {
      url: '/trails',
      views: {
        'trails-tab': {
          templateUrl: 'templates/trails.html',
          controller: 'TrailsController'
        }
      }
    })

    .state('tabs.detail', {
      url: '/trails/:trailId',
      views: {
        'trails-tab': {
          templateUrl: 'templates/detail.html',
          controller: 'TrailsController'
        }
      }
    })


    .state('tabs.planner', {
      url: '/planner',
      views: {
        'planner-tab': {
          templateUrl: 'templates/calendar.html',
          controller: 'CalendarController'
        }
      }
    })

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/dl/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.login', {
      url: "/login",
      views: {
        'menuContent': {
          templateUrl: "templates/dl/login.html"
        }
      }
    })

    .state('app.profile', {
      url: "/profile",
      views: {
        'menuContent': {
          templateUrl: "templates/dl/profile.html"
        }
      }
    });


    //$urlRouterProvider.otherwise('/tab/home');
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
  })

.controller('appController',
  ['$scope', '$rootScope', '$location',
  function ($scope, $rootScope, $location) {

                //$location.absUrl().replace(/http/g, 'https');

                //$scope.login = {};
                //$scope.success = false;
                //$scope.message = "";
                //$scope.resendEmailConfirmationLinkIsVisible = false;
                //$scope.resend = {};
                //$scope.registration = {};
                //$scope.savedSuccessfully = false;

                //$scope.isAuthenticated = $rootScope.isAuthenticated = authService.authentication.isAuth;
                //$scope.userName = $rootScope.userName = authService.authentication.userName;

                //if ($scope.isAuthenticated == false) {
                //    $scope.newUser = $rootScope.newUser = true;
                //}
                //else {
                //    $scope.newUser = false;
                //}

                //$scope.submitLoginForm = $rootScope.submitLoginForm = function (isValid) {
                //    authService.login($scope.login).then(function (response) {
                //        $scope.success = true;
                //        $scope.isAuthenticated = true;
                //        $rootScope.isAuthenticated = true;
                //        $rootScope.userName = authService.authentication.userName;
                //        broadcastAuthenticationStatus();
                //        console.log("appController/$scope.submitLoginForm().$scope.isAuthenticated: " + $scope.isAuthenticated);
                //        $location.path("/home");
                //    }, function (err) {
                //        if (err.error === "email_not_confirmed") {
                //            $scope.resendEmailConfirmationLinkIsVisible = true;
                //        }
                //        $scope.message = err.error_description;
                //    });
                //};

                //$scope.resendConfirmEmail = $rootScope.resendConfirmEmail = function (userName) {
                //    $scope.resend.Email = userName;

                //    authService.resendConfirmEmail($scope.resend).then(function (response) {
                //        $scope.success = true;
                //        $scope.message = "Check your email to confirm your email address.";
                //        $scope.resendEmailConfirmationLinkIsVisible = false;
                //    }, function (err) {
                //        $scope.message = err.error_description;
                //    });
                //};

                //$scope.submitSignupForm = $rootScope.submitSignupForm = function (isValid) {

                //    authService.saveRegistration($scope.registration).then(function (response) {

                //        $scope.savedSuccessfully = true;
                //        $scope.message = "You have registered successfully!  Please check your email to activate your account.";

                //    },
                //     function (response) {
                //         console.log(angular.toJson(response));
                //         var errors = [];
                //         for (var key in response.data.ModelState) {
                //             for (var i = 0; i < response.data.ModelState[key].length; i++) {
                //                 errors.push(response.data.ModelState[key][i]);
                //             }
                //         }
                //         $scope.message = errors.join(' ');
                //     });
                //};

                //$scope.logOut = $rootScope.logOut = function () {
                //    authService.logOut();
                //    $scope.isAuthenticated = false;
                //    console.log("logOut()/scope.isAuthenticated: " + $scope.isAuthenticated);

                //    $location.path('/index');
                //};

                //$scope.toggleNewUser = $rootScope.toggleNewUser = function () {
                //    $scope.newUser = $scope.newUser === false ? true : false;
                //    broadcastUserState();
                //};

                //var broadcastUserState = function () {
                //    $rootScope.$broadcast('user-state-updated',
                //        {
                //            newUser: $scope.newUser
                //        });
                //};

                //var broadcastAuthenticationStatus = function () {
                //    $rootScope.$broadcast('user-authenticated',
                //        {
                //            isAuthenticated: $scope.isAuthenticated,
                //            userName: authService.authentication.userName
                //        });
                //};
              }
              ])

.controller('TrailsController', ['$scope', '$http', '$state',
  function ($scope, $http, $state) {

    $http.get('js/data.json').success(function (data) {
      $scope.trails = data.trails;
      $scope.whichtrail = $state.params.trailId;
      $scope.data = { showDelete: false, showReorder: false };

      $scope.onItemDelete = function (item) {
        $scope.trails.splice($scope.trails.indexOf(item), 1);
      }

      $scope.doRefresh = function () {
        $http.get('js/data.json').success(function (data) {
          $scope.trails = data.trails;
          $scope.$broadcast('scroll.refreshComplete');
        });
      }

      $scope.toggleStar = function (item) {
        item.star = !item.star;
      }

      $scope.moveItem = function (item, fromIndex, toIndex) {
        $scope.trails.splice(fromIndex, 1);
        $scope.trails.splice(toIndex, 0, item);
      };
    });
  }]);
