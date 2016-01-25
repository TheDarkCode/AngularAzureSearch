(function () {
    'use strict';

    angular.module('app')
        .service('trailService', ["$http", "$q", "apiSettings", function ($http, $q, apiSettings) {
            var url = apiSettings.apiUriBase + 'api/trail'; //REST endpoint

            this.getTrails = function () {
                var deferred = $q.defer();

                $http.get(url)
                        .success(function (response) {
                            deferred.resolve(response.data);
                        })
                        .error(function () {
                            console.log("Error while making API call.");
                            deferred.reject();
                        });

                return deferred.promise;
            };

            this.getTrail = function (id) {
                var deferred = $q.defer();

                $http.get(url + '/' + id)
                        .success(function (response) {
                            deferred.resolve(response.data);
                        })
                        .error(function () {
                            console.log("Error while making API call.");
                            deferred.reject();
                        });

                return deferred.promise;
            };

            this.insertTrail = function (trail) {
                var deferred = $q.defer();

                $http.post(url, trail)
                        .success(function (response) {
                            deferred.resolve(response.data);
                        })
                        .error(function () {
                            console.log("Error while making API call.");
                            deferred.reject();
                        });

                return deferred.promise;
            };

            this.updateTrail = function (trail) {
                var deferred = $q.defer();

                $http.put(url + '/' + trail.id, trail)
                        .success(function (response) {
                            deferred.resolve(response.data);
                        })
                        .error(function () {
                            console.log("Error while making API call.");
                            deferred.reject();
                        });

                return deferred.promise;
            };

            this.deleteTrail = function (trail) {
                var deferred = $q.defer();

                $http.delete(url + '/' + trail.id)
                        .success(function (response) {
                            deferred.resolve(response.data);
                        })
                        .error(function () {
                            console.log("Error while making API call.");
                            deferred.reject();
                        });

                return deferred.promise;
            };
        }]);
})();
