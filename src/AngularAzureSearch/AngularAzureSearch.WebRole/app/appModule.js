(function () {
    "use strict";

    angular.module("app", ["ngRoute", "dlFramework", "ngStorage", "FBAngular", "LocalStorageModule"])

    // Change to your WebAPI's location. Debug :: http://localhost:10716/
    // GitHub Demo API Endpoint: http://githubapi.azurewebsites.net/
    .constant('apiSettings', {
        apiUriBase: 'http://githubapi.azurewebsites.net',
    });

})();
