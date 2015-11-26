(function () {
    "use strict";

    angular.module("app", ["ngRoute", "dlFramework", "ngStorage", "FBAngular", "homesCtrl", "LocalStorageModule"])

    // Change to your WebAPI's location. Debug :: http://localhost:10716/
    .constant('apiSettings', {
        apiUriBase: 'http://githubapi.azurewebsites.net/',
    });

})();
