(function () {
    'use strict';

    angular.module('app')
        .service('templateService', ["$http", "apiSettings", function ($http, apiSettings) {
            var url = apiSettings.apiUriBase + 'api/template'; //REST endpoint

            this.getTemplates = function () {
                return $http.get(url)
                        .then(function (response) {
                            return response.data;
                        });
            };

            this.getTemplate = function (id) {
                return $http.get(url + '/' + id);
            };

            this.insertTemplate = function (template) {
                return $http.post(url, template)
                            .then(function (response) {
                                return response.data;
                            });
            };

            this.updatTemplate = function (template) {
                return $http.put(url + '/' + template.id, template)
                            .then(function (response) {
                                return response.data;
                            });
            };

            this.deletetemplate = function (template) {
                return $http.delete(url + '/' + template.id)
                        .then(function (response) {
                            return response.data;
                        });
            };
        }]);
})();