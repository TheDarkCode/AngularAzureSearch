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
                    //{
                    //    title: 'Temperature',
                    //    settings: {
                    //        sizeX: 3,
                    //        sizeY: 3,
                    //        minSizeX: 2,
                    //        minSizeY: 2,
                    //        template: '<d-temperature></d-temperature>',
                    //        widgetSettings: {
                    //            id: 101,
                    //            templateUrl: 'app/dialogs/dSelectLocationTemplate.html',
                    //            controller: 'dSelectLocationController'
                    //        }
                    //    }
                    //},
                    //{
                    //    title: 'Inventory',
                    //    settings: {
                    //        sizeX: 3,
                    //        sizeY: 3,
                    //        minSizeX: 2,
                    //        minSizeY: 2,
                    //        template: '<d-inventory></d-inventory>',
                    //        widgetSettings: {
                    //            id: 101,
                    //            templateUrl: 'app/dialogs/dSelectLocationTemplate.html',
                    //            controller: 'dSelectLocationController'
                    //        }
                    //    }
                    //},
                    //{
                    //    title: 'Employee',
                    //    settings: {
                    //        sizeX: 3,
                    //        sizeY: 3,
                    //        minSizeX: 2,
                    //        minSizeY: 2,
                    //        template: '<d-employee></d-employee>',
                    //        widgetSettings: {
                    //            id: 9001,
                    //            templateUrl: 'app/dialogs/dSelectEmployeeTemplate.html',
                    //            controller: 'dSelectEmployeeController'
                    //        }
                    //    }
                    //},
                    //{
                    //    title: 'Maps',
                    //    settings: {
                    //        sizeX: 3,
                    //        sizeY: 3,
                    //        minSizeX: 2,
                    //        minSizeY: 2,
                    //        template: '<d-maps></d-maps>',
                    //        widgetSettings: {
                    //            id: 9001,
                    //            templateUrl: 'app/dialogs/dSelectLocationTemplate.html',
                    //            controller: 'dSelectLocationController'
                    //        }
                    //    }
                    //},
                    {
                        title: 'Code Editor',
                        settings: {
                            sizeX: 4,
                            sizeY: 4,
                            minSizeX: 3,
                            minSizeY: 2,
                            template: '<d-code-editor></d-code-editor>',
                            widgetSettings: {
                                id: 8001,
                                templateUrl: 'app/dialogs/dSelectFileTemplate.html',
                                controller: 'dSelectFileController'
                            }
                        }
                    },
                    {
                        title: 'Chat',
                        settings: {
                            sizeX: 4,
                            sizeY: 4,
                            minSizeX: 4,
                            minSizeY: 4,
                            template: '<d-chat></d-chat>',
                            widgetSettings: {
                                id: 103,
                                templateUrl: 'app/dialogs/dSelectChatTemplate.html',
                                controller: 'dSelectChatController'
                            }
                        }
                    },
                    {
                        title: 'Map',
                        settings: {
                            sizeX: 4,
                            sizeY: 4,
                            minSizeX: 4,
                            minSizeY: 4,
                            template: '<d-map></d-map>',
                            widgetSettings: {
                                id: 4001,
                                templateUrl: 'app/dialogs/dSelectMapTemplate.html',
                                controller: 'dSelectMapController'
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