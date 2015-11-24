(function () {
    "use strict";

    angular.module("app", ["ngRoute", "dlFramework", "ngStorage", "FBAngular", "homesCtrl", "LocalStorageModule"])

    // Change to your WebAPI's location.
    .constant('apiSettings', {
        apiUriBase: 'http://localhost:10716/',
    });

})();
