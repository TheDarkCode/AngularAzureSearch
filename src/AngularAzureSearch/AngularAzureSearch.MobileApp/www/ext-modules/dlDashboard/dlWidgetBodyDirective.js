(function () {
    "use strict";

    angular.module('dlDashboard').directive('dlWidgetBody',
        ['$compile', '$modal',
            function ($compile, $modal) {
                return {
                    templateUrl: 'ext-modules/dlDashboard/dlWidgetBodyTemplate.html',
                    link: function (scope, element, attrs) {
                        var newElement = angular.element(scope.item.template);
                        element.append(newElement);
                        $compile(newElement)(scope);

                        scope.shrink = function () {
                            
                        };

                        scope.close = function () {
                            scope.widgets.splice(scope.widgets.indexOf(scope.item), 1);
                        };

                        scope.settings = function () {
                            var options = {
                                templateUrl: scope.item.widgetSettings.templateUrl,
                                controller: scope.item.widgetSettings.controller,
                                scope: scope
                            };

                            $modal.open(options);
                        };

                        scope.iconClicked = function () {
                            /* 
                                Empty function is used by 
                                ng-click in dlWidgetBodyTemplate
                                as mobile-fix so icon clicks do 
                                not get intercepted by widgets
                            */
                        };
                    }
                };
            }
        ]);

})();