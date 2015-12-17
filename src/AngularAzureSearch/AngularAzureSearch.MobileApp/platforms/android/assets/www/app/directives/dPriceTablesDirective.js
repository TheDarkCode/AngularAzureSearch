(function () {
    "use strict";

    angular.module('app').directive('dPriceTables', [function () {
        return {
            //restrict: 'E',
            scope: {

            },
            templateUrl: 'app/templates/dPriceTablesTemplate.html',
            //compile: function (element) {
            //    return recursionHelper.compile(element);
            //}
        }
    }]);

})();