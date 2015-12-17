(function () {
    "use strict";

    angular.module('dlDashboard').directive('dlDashboard', function () {
        return {
            templateUrl: 'ext-modules/dlDashboard/dlDashboardTemplate.html',
            link: function (scope, element, attrs) {
                scope.addNewWidget = function (widget) {
                    var newWidget = angular.copy(widget.settings);
                    scope.widgets.push(newWidget);
                };
            }
        };
    });
})();