(function () {
    "use strict";

    angular.module('app').directive('dSearch', [function () {
        return {
            scope: false,
            templateUrl: 'app/templates/dSearchTemplate.html'
        }
    }]);

})();