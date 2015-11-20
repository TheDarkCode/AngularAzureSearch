(function () {
    "use strict";

    angular.module('app').controller('dSelectSearchController',
    ['$scope', 'searchService',
        function ($scope, searchService) {
            $scope.isLoaded = false;
            searchService.getSearches().then(function (data) {
                $scope.searches = data;
                $scope.isLoaded = true;

                for (var i = 0; i < data.length; i++) {
                    if (data[i] == $scope.item.widgetSettings.id)
                        $scope.selectedSearch = data[i];
                }
            });

            $scope.saveSettings = function () {
                $scope.item.widgetSettings.id = $scope.selectedSearch.id;
                $scope.$parent.selectedSearch = $scope.selectedSearch;
                $scope.$close();
            };
        }
    ]);
})();