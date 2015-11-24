.directive('map', function () {
    return {
        restrict: 'A',
        scope: {
            'ready': '&'
        },
        link: function (scope, element, attr) {
            element.height(500);
            var map = new Microsoft.Maps.Map(element.get(0), {
                // Bing Maps Credentials
                credentials: 'YOUR BING MAPS KEY',
                showDashboard: false,
                showCopyright: false,
                showScalebar: false,
                enableSearchLogo: false,
                enableClickableLogo: false,
                mapTypeId: Microsoft.Maps.MapTypeId.road,
                backgroundColor: new Microsoft.Maps.Color(0, 0, 0, 0)
            });
            scope.$on('$destroy', function () {
                console.log('destroyed map');
                scope.$applyAsync(map.dispose);
            });

            scope.ready({ map: map });
        }
    };
})