(function () {
    "use strict";

    angular.module('app').directive('dDashboard', ['$localStorage',function ($localStorage) {
        return {
            scope: {
            },
            template: '<dl-dashboard></dl-dashboard>',
            link: function (scope) {

                scope.title = 'Dashboard';

                /* Default Gridster Options */
                /* For more options see: github.com/ManifestWebDesign/angular-gridster */
                scope.gridsterOpts = {
                    columns: 12, /* default: 6, the width of the grid, in columns */
                    margins: [20, 20], /* default: [10,10], the pixel distance between each widget */
                    outerMargin: false, /* default: true, whether margins apply to outer edges of the grid */
                    pushing: true, /* default: true, whether to push other items out of the way on move or resize */
                    floating: true, /* default: true, whether to automatically float items up so they stack */
                    swapping: false /* default: false, whether or not to have items of the same size switch places instead */
                };

                scope.widgetDefinitions = [
                    {
                        title: 'Homes',
                        settings: {
                            sizeX: 4,
                            sizeY: 4,
                            minSizeX: 4,
                            minSizeY: 4,
                            template: '<d-trails></d-trails>',
                            widgetSettings: {
                                id: 103,
                                templateUrl: 'app/dialogs/dSelectSearchTemplate.html',
                                controller: 'dSelectSearchController'
                            }
                        }
                    },
                    {
                        title: 'Trails',
                        settings: {
                            sizeX: 4,
                            sizeY: 4,
                            minSizeX: 4,
                            minSizeY: 4,
                            template: '<d-trails></d-trails>',
                            widgetSettings: {
                                id: 103,
                                templateUrl: 'app/dialogs/dSelectSearchTemplate.html',
                                controller: 'dSelectSearchController'
                            }
                        }
                    },
                ];

                scope.widgets = $localStorage.widgets || [
                    // WIDGET SETTINGS TEMPLATE ::
                    //{
                    //    title: 'Search',
                    //    settings: {
                    //        sizeX: 4,
                    //        sizeY: 4,
                    //        minSizeX: 4,
                    //        minSizeY: 4,
                    //        template: '<d-search></d-search>',
                    //        widgetSettings: {
                    //            id: 103,
                    //            templateUrl: 'app/dialogs/dSelectSearchTemplate.html',
                    //            controller: 'dSelectSearchController'
                    //        }
                    //    }
                    //}
                    {
                        title: 'Homes',
                        settings: {
                            sizeX: 4,
                            sizeY: 4,
                            minSizeX: 4,
                            minSizeY: 4,
                            template: '<d-trails></d-trails>',
                            widgetSettings: {
                                id: 103,
                                templateUrl: 'app/dialogs/dSelectSearchTemplate.html',
                                controller: 'dSelectSearchController'
                            }
                        }
                    }
                ];
                

                scope.widgets = $localStorage.widgets || [

                ];


                /* Alter for larger dashboards with more numerous widgets */
                scope.$watch('widgets', function () {
                    $localStorage.widgets = scope.widgets;
                }, true);
            }
        }
    }]);

})();