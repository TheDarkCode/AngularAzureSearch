(function () {
    "use strict";

    /* Mock Search Service Used for Demo */

    angular.module('app').factory('searchService',
        ['$timeout',
            function ($timeout) {

                var searches = [
                    {
                        id: 103,
                        name: 'Subtle Grayscale',
                        content: ''
                    },
                    {
                        id: 104,
                        name: 'Bentley',
                        content: ''
                    },
                    {
                        id: 101,
                        name: 'Lunar Landscape',
                        content: ''
                    },
                    {
                        id: 102,
                        name: 'Midnight Commander',
                        content: ''
                    }
                ];


                var getSearches = function () {
                    return $timeout(function () {
                        return searches;
                    }, 500);
                };

                var getSearch = function (id) {
                    return $timeout(function () {
                        for (var i = 0; i < search.length; i++)
                            if (searches[i].id == id)
                                return searches[i];
                        return undefined;
                    }, 300);
                };

                return {
                    getSearches: getSearches,
                    getSearch: getSearch
                }
            }]);
})();