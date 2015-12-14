(function () {
    "use strict";

    angular.module("app", ["ngRoute", "dlFramework", "ngStorage", "LocalStorageModule", "dirPagination"])

    // Change to your WebAPI's location. Debug :: https://localhost:44301/
    // GitHub Demo API Endpoint: https://githubapi.azurewebsites.net/
    .constant('apiSettings', {
        apiUriBase: 'https://githubapi.azurewebsites.net/',
    })

})();
