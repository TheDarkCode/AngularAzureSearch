(function () {
    "use strict";

    angular.module('app').directive('dSearch',
        ['searchService',
            function (searchService) {
                return {
                    templateUrl: 'app/widgets/dSearch/dSearchTemplate.html',
                    link: function (scope, el, attrs) {
                        scope.selectedSearch = null;
                        searchService.getSearch(scope.item.widgetSettings.id)
                            .then(function (data) {
                                scope.selectedSearch = data;
                            });
                    }
                };
            }]);

})();