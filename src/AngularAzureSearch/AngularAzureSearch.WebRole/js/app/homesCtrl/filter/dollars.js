(function () {
    "use strict";

    angular.module('homesCtrl').filter('dollars', ['$filter', function ($filter) {
        return function (value, precision) {
            return $filter('currency')(value, '$', precision || 0);
        };
    }]);
})();