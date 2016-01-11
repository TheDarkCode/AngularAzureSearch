(function () {
    "use strict";

    angular.module('dlSearch').filter('dollars', ['$filter', function ($filter) {
        return function (value, precision) {
            return $filter('currency')(value, '$', precision || 0);
        };
    }]);
})();