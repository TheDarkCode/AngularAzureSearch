(function () {
    'use strict';

    angular.module('angularazuresearch')
        .service('trailService', ["$http", "apiSettings", function ($http, apiSettings) {
            var url = apiSettings.apiUriBase + 'api/trail'; //REST endpoint

            this.getTrails = function () {
                return $http.get(url)
                        .then(function (response) {
                            return response.data;
                        });
            };

            this.getTrail = function (id) {
                return $http.get(url + '/' + id);
            };

            this.insertTrail = function (trail) {
                return $http.post(url, trail)
                            .then(function (response) {
                                return response.data;
                            });
            };

            this.updateTrail = function (trail) {
                return $http.put(url + '/' + trail.id, trail)
                            .then(function (response) {
                                return response.data;
                            });
            };

            this.deleteTrail = function (trail) {
                return $http.delete(url + '/' + trail.id)
                        .then(function (response) {
                            return response.data;
                        });
            };
        }]);
})();