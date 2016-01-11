(function () {
    "use strict";

    angular.module('angularazuresearch').factory('trailHub', ['$rootScope', 'apiSettings', function ($rootScope, apiSettings) {

        return {
            on: function (eventName, callback) {
                var hubUrl = apiSettings.apiUriBase;
                hubUrl = hubUrl.substring(0, hubUrl.length - 1);
                var settings = { useDefaultPath: true };
                var connection = $.hubConnection(hubUrl, settings);
                var trailHubProxy = connection.createHubProxy('trailHub');

                trailHubProxy.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(trailHubProxy, args);
                    });
                });
                // { jsonp: true, transport: 'longPolling' }
                connection.start().done(function () { });

            }
        };

    }]);

})();