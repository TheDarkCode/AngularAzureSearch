(function () {
    "use strict";

    angular.module('app').directive('dSearch',
        ['dataService',
            function (dataService) {
                return {
                    templateUrl: 'app/widgets/dSearch/dSearchTemplate.html',
                    link: function (scope, el, attrs) {
                        scope.selectedSearch = null;
                        dataService.getSearch(scope.item.widgetSettings.id)
                            .then(function (data) {
                                scope.selectedSearch = data;
                            });
                    }
                };
            }]);

})();