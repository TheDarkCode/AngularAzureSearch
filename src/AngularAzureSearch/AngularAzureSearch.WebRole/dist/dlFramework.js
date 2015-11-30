(function () {

    // dlStyles Not Included
    angular.module("dlFramework", ["dlMenu", "dlDashboard", "dlFooter", "dlPanel", "dlGallery", "dlPriceTable", "dlParallax", "dlSearch", "FBAngular"]);
})();

(function() {


    angular.module('dlFramework').directive('dlUserProfileSmall', function () {
        return {
            scope: false,
            templateUrl: 'ext-modules/dlFramework/dlUserProfile/dlUserProfileSmallTemplate.html'
        };
    });
})();
(function() {


    angular.module('dlFramework').directive('dlUserProfile', function () {
        return {
            scope: false,
            templateUrl: 'ext-modules/dlFramework/dlUserProfile/dlUserProfileTemplate.html'
        };
    });
})();
(function () {


    angular.module("dlSearch", ['azureSearch', 'mapping', 'html', 'userInput', 'FBAngular']);
})();

angular.module("dlSearch").run(["$templateCache", function($templateCache) {$templateCache.put("ext-modules/dlSearch/dlSearchTemplate.html","<div>\r\n    <div class=\"container\">\r\n\r\n        <form ng-submit=\"search()\" ng-controller=\"dlSearchForm\">\r\n\r\n            <div class=\"input-group\">\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"model.query.q\" placeholder=\"e.g. boston or seattle or back bay\" ng-model-options=\"{debounce:{\'default\':100, \'blur\':0}}\" ng-change=\"suggest()\" ng-click=\"searchInputClicked($event)\" ng-disabled=\"loading\">\r\n\r\n                <div class=\"input-group-btn\">\r\n                    <button type=\"submit\" class=\"btn btn-default\" title=\"search\" ng-disabled=\"loading\">\r\n\r\n                        <span class=\"glyphicon glyphicon-search\">\r\n                        </span>\r\n                    </button>      <button ng-if=\"model.query.filter || model.query.order\" type=\"button\" class=\"btn btn-link\" ng-click=\"resetFilter()\" title=\"reset filters\" ng-disabled=\"loading\">reset</button>\r\n                </div>\r\n            </div>\r\n\r\n            <div style=\"position:fixed;z-index:9999;left:0;right:0;\" ng-if=\"suggestResult.$resolved\">\r\n\r\n                <div class=\"container\">\r\n                    <ul class=\"list-group\" style=\"background:white;margin-top:-1px;\">\r\n                        <li class=\"list-group-item\" ng-repeat=\"doc in suggestResult.value\" ng-click=\"clickSuggest($event, doc[\'@search.text\'])\">          <a href=\"\" ng-bind-html=\"html(doc[\'@search.text\'])\"></a>        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </form>\r\n    </div>\r\n    <hr>\r\n\r\n    <div>\r\n\r\n        <div>\r\n\r\n            <div class=\"row\" style=\"height:100%\">\r\n                <!-- map column -->\r\n\r\n                <div class=\"col-xs-12 col-sm-6\" style=\"height:100%\" ng-controller=\"dlSearchMap\">\r\n\r\n                    <div style=\"position:relative;z-index:100;padding:20px;\">\r\n\r\n                        <div class=\"btn-group\">\r\n                            <button type=\"button\" class=\"btn btn-default btn-small\" ng-click=\"currentLocation()\"><span class=\"glyphicon glyphicon-screenshot\" aria-hidden=\"true\"></span></button>          <button type=\"button\" class=\"btn btn-default btn-small\" ng-click=\"drawPolygon()\"><span class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\"></span></button>          <button type=\"button\" class=\"btn btn-default btn-small\" ng-click=\"searchMapArea()\"><span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span></button>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <p ng-if=\"drawing\" style=\"top:0;background:white;position:relative;z-index:100;margin-right:-15px;padding:5px 20px;\">        <kbd>double-click</kbd> or <kbd>enter</kbd> to end. <kbd>ESC</kbd> to cancel.      </p>\r\n\r\n                    <div id=\"map\" map ready=\"mapReady(map)\">\r\n                    </div>\r\n                </div>\r\n                <!-- loading -->\r\n\r\n                <div class=\"col-xs-6 col-sm-6\" ng-if=\"!result.$resolved\" style=\"height:100%;\">\r\n\r\n                    <div class=\"text-center\" style=\"font-size:32px;padding-top:100px;color:#ccc;border:1px solid #eee;height:100%;\">\r\n                        Loading\r\n                    </div>\r\n                </div>\r\n                <!-- result column -->\r\n\r\n                <div class=\"col-xs-12 col-sm-4\" style=\"height:100%;\" ng-if=\"result.$resolved\">\r\n                    <!-- result detail -->\r\n\r\n                    <div id=\"result-detail\" ng-if=\"model.detail\" ng-controller=\"dlSearchDetail\">\r\n                        <img ng-src=\"{{model.detail.imageUrls[model.detail[\'@image\']]}}\" style=\"border:1px solid #ccc;height:100%;width:auto;float:left;margin-right:4px;max-width:120px;\" ng-click=\"nextImage()\">\r\n\r\n                        <p>\r\n                            <b>{{model.detail.street}}</b> <small>&bull; {{model.detail.city}}, {{model.detail.state}} {{model.detail.zip}}</small>          <div>\r\n                                <br>{{model.detail.dom}} <ng-pluralize count=\"model.detail.dom\" when=\"{1:\'day\', other:\'days\'}\"></ng-pluralize> on market\r\n\r\n                                <span class=\"text-muted\">\r\n\r\n                                    <span ng-if=\"model.detail.propertyType\">\r\n                                        &bull; {{model.detail.propertyType}}\r\n                                    </span>\r\n\r\n                                    <span ng-if=\"model.detail.propertyType && model.detail.yearBuilt\">\r\n                                        &bull;\r\n                                    </span>\r\n\r\n                                    <span ng-if=\"model.detail.yearBuilt\">\r\n                                        built {{model.detail.yearBuilt}}\r\n                                    </span>\r\n                                </span>\r\n                                <br>\r\n\r\n                                <span ng-if=\"model.detail.pricePerSqft\">\r\n                                    {{model.detail.pricePerSqft|dollars}} / sqft.\r\n                                </span>\r\n\r\n                                <span ng-if=\"model.detail.lotsize\" class=\"text-muted\">\r\n                                    &bull; lot size {{model.detail.lotsize|number}} sqft.\r\n                                </span>\r\n\r\n                                <span ng-if=\"model.detail.hoa\">\r\n                                    <br><abbr title=\"Home Owners\' Association\">HOA</abbr> {{model.detail.hoa|dollars}}\r\n                                </span>\r\n                            </div>\r\n                        </p>\r\n\r\n                        <div>\r\n                        </div>\r\n                    </div>\r\n                    <!-- result sorting -->\r\n\r\n                    <div class=\"small\" style=\"margin-bottom:6px;\" ng-controller=\"dlSearchSort\">\r\n\r\n                        <div class=\"pull-right\">\r\n\r\n                            <span class=\"text-muted\">\r\n                                sort by\r\n                            </span>\r\n\r\n                            <div class=\"dropdown\" style=\"display: inline-block;\">\r\n                                <a href=\"\" data-toggle=\"dropdown\" style=\"padding-right:2px;\">{{orderBy.label}}</a>\r\n                                <ul class=\"dropdown-menu\" style=\"right:0;left:auto;\">\r\n                                    <li ng-repeat=\"(field, label) in orderFields\">                <a ng-href=\"{{orderUrl(field)}}\">{{label}}</a>              </li>\r\n                                </ul>\r\n                            </div>          <a href=\"{{toggleDirUrl()}}\" style=\"font-size:8px;\">\r\n\r\n                                <span ng-if=\"orderDir ==\'asc\'\" class=\"glyphicon glyphicon-triangle-top\" title=\"ascending (low to high)\">\r\n                                </span>\r\n\r\n                                <span ng-if=\"orderDir == \'desc\'\" class=\"glyphicon glyphicon-triangle-bottom\" title=\"descending (high to low)\">\r\n                                </span>\r\n                            </a>\r\n                        </div>\r\n\r\n                        <div class=\"text-muted\">\r\n                            1 - {{result.value.length}} of {{result[\'@odata.count\']}} results\r\n                        </div>\r\n                    </div>\r\n                    <!-- result list -->\r\n                    <ul id=\"result-list\" class=\"list-group\">\r\n                        <li class=\"list-group-item\" ng-repeat=\"doc in result.value\" ng-click=\"focusResult($event)\" ng-mouseover=\"resultMouseIn($event)\" ng-mouseleave=\"resultMouseOut($event)\" ng-controller=\"dlSearchRepeater\" ng-class=\"{\'is-detail\':doc[\'@active\']}\">\r\n                            <h5>\r\n                                <a href=\"\">{{doc.street}}</a>            <small style=\"padding-left:1em;\">\r\n                                    {{doc.city}}\r\n\r\n                                    <span ng-if=\"doc.city != doc.neighborhood\">\r\n                                        ({{doc.neighborhood}})\r\n                                    </span>\r\n                                </small>\r\n                            </h5>\r\n\r\n                            <p class=\"small\">\r\n                                <b style=\"padding-right:4px;\">{{doc.price|dollars}}</b>\r\n\r\n                                <span class=\"text-muted\">\r\n                                    {{doc.sqft|number}} sqft. &bull;              {{doc.beds|number}} beds\r\n\r\n                                    <span ng-if=\"doc.baths\">\r\n                                        &bull; {{doc.baths|number}} bath\r\n                                    </span>\r\n                                </span>\r\n                            </p>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n                <!-- facet column -->\r\n                <div class=\"hidden-xs col-sm-3 col-md-2\" style=\"height:100%;overflow:auto;\" ng-controller=\"dlSearchFacets\">\r\n                    <ul class=\"list-unstyled facets\" ng-if=\"result && result.$resolved\">\r\n                        <li>\r\n                            <h4>Price</h4>\r\n\r\n                            <form class=\"form-inline inline2\">\r\n                                <select class=\"form-control input-sm\" ng-model=\"filter.price.min\" ng-options=\"x|dollars for x in buckets.price\" ng-change=\"applyFilter()\">\r\n\r\n                                    <option value=\"\">no min</option>\r\n                                </select> -\r\n                                <select class=\"form-control input-sm\" ng-model=\"filter.price.max\" ng-options=\"x|dollars for x in buckets.price\" ng-change=\"applyFilter()\">\r\n\r\n                                    <option value=\"\">no max</option>\r\n                                </select>\r\n                            </form>\r\n                        </li>\r\n                        <li>\r\n                            <h4>Beds</h4>\r\n\r\n                            <form class=\"form-inline inline2\">\r\n                                <select class=\"form-control input-sm\" ng-model=\"filter.beds.min\" ng-options=\"x|number for x in buckets.beds\" ng-change=\"applyFilter()\">\r\n\r\n                                    <option value=\"\">no min</option>\r\n                                </select> -\r\n                                <select class=\"form-control input-sm\" ng-model=\"filter.beds.max\" ng-options=\"x|number for x in buckets.beds\" ng-change=\"applyFilter()\">\r\n\r\n                                    <option value=\"\">no max</option>\r\n                                </select>\r\n                            </form>\r\n                        </li>\r\n                        <li>\r\n                            <h4>Min Baths</h4>\r\n\r\n                            <form class=\"form-inline inline2\">\r\n                                <select class=\"form-control input-sm\" ng-model=\"filter.baths.min\" ng-options=\"x+\'+\' for x in buckets.baths\" ng-change=\"applyFilter()\">\r\n\r\n                                    <option value=\"\">no min</option>\r\n                                </select>\r\n                            </form>\r\n                        </li>\r\n                        <li ng-repeat=\"field in [\'neighborhood\', \'propertyType\', \'pricePerSqft\']\">\r\n                            <h4>{{fieldLabel(field)}}</h4>\r\n                            <ul class=\"list-unstyled\">\r\n                                <li ng-repeat=\"facet in result[\'@search.facets\'][field]\">\r\n                                    <a href=\"{{facetUrl(field, facet, facetType[field])}}\">\r\n\r\n                                        <span ng-if=\"facet.to && !facet.from\">\r\n                                            &lt; {{facetLabel(field, facet.to)}}\r\n                                        </span>\r\n\r\n                                        <span ng-if=\"facet.to && facet.from\">\r\n                                            {{facetLabel(field, facet.from)}} - {{facetLabel(field, facet.to)}}\r\n                                        </span>\r\n\r\n                                        <span ng-if=\"!facet.to && facet.from\">\r\n                                            &gt; {{facetLabel(field, facet.from)}}\r\n                                        </span>\r\n\r\n                                        <span ng-if=\"facet.value\">\r\n                                            {{facetLabel(field, facet.value)}}\r\n                                        </span>\r\n                                    </a>\r\n\r\n                                    <span class=\"text-muted small\">\r\n                                        : {{facet.count|number}}\r\n                                    </span>\r\n                                </li>\r\n                            </ul>\r\n                        </li>\r\n                        <li>\r\n                            <h4>Square Feet</h4>\r\n\r\n                            <form class=\"form-inline inline2\">\r\n                                <select class=\"form-control input-sm\" ng-model=\"filter.sqft.min\" ng-options=\"x|number for x in buckets.sqft\" ng-change=\"applyFilter()\">\r\n\r\n                                    <option value=\"\">no min</option>\r\n                                </select> -\r\n                                <select class=\"form-control input-sm\" ng-model=\"filter.sqft.max\" ng-options=\"x|number for x in buckets.sqft\" ng-change=\"applyFilter()\">\r\n\r\n                                    <option value=\"\">no max</option>\r\n                                </select>\r\n                            </form>\r\n                        </li>\r\n                        <li>\r\n                            <h4>Max HOA</h4>\r\n\r\n                            <form class=\"form-inline inline2\">\r\n                                <select class=\"form-control input-sm\" ng-model=\"filter.hoa.max\" ng-options=\"x|dollars for x in buckets.hoa\" ng-change=\"applyFilter()\">\r\n\r\n                                    <option value=\"\">no max</option>\r\n                                </select>\r\n                            </form>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");}]);
(function () {


    angular.module('dlSearch').controller('dlSearchSort', ['$scope', '$location', function ($scope, $location) {

        $scope.$watch('model.query.order', function (newValue) {
            if (newValue) {
                var parts = newValue.split(' ');
                $scope.orderBy = { field: parts[0], label: $scope.orderFields[parts[0]] };
                $scope.orderDir = parts[1] || 'asc';
            }
        });

        $scope.orderFields = {
            dom: 'days on market',
            price: 'price',
            pricePerSqft: 'price per sqft.',
            yearBuilt: 'year built',
            hoa: 'association fee',
            location: 'distance'
        };

        $scope.toggleDirUrl = function () {
            if (!$scope.orderBy) return;
            var urlParams = angular.copy($location.search())
                      , path = $location.path()
              , dir = $scope.orderDir == 'asc' ? 'desc' : 'asc';

            urlParams.order = $scope.orderBy.field + ' ' + dir;
            return '#' + path + '?' + $.param(urlParams, true);
        };

        $scope.orderUrl = function (field) {
            var urlParams = angular.copy($location.search())
                      , path = $location.path();

            urlParams.order = field + ' ' + $scope.orderDir;
            return '#' + path + '?' + $.param(urlParams, true);
        };
    }]);
})();
(function () {


    angular.module('dlSearch').controller('dlSearchRoute', ['$scope', '$location', '$sce', 'currentLocation', 'search', 'bestView', 'groupFilters', function ($scope, $location, $sce, currentLocation, search, bestView, groupFilters) {

        // return cleansed HTML
        $scope.html = function (text) {
            return $sce.trustAsHtml(text);
        };

        // manually refresh results since route disables reloadOnSearch
        $scope.$on('$routeUpdate', function (a, b) {
            $scope.model.query = b.params;
            $scope.refreshResults();
        });

        // set detail document
        $scope.setFocusResult = function (doc, centerMap) {
            if ($scope.model.detail) {
                $scope.model.detail['@map.pin'].html.removeClass('active-pin');
                $scope.model.detail['@active'] = false;
            }
            $scope.model.detail = doc;
            $scope.model.detail['@image'] = 0;
            $scope.model.detail['@active'] = true;
            $scope.model.detail['@map.pin'].html.addClass('active-pin');
            if (centerMap) {
                $scope.model.map.setView({ animate: true, center: $scope.model.detail['@map.location'], zoom: 20 });
            } else {
                $scope.model.detail['@scrollTo']();
            }
        };

        // refresh results
        $scope.refreshResults = function () {
            $scope.loading = true;
            var searchParams = {
                //search: "",
                search: $scope.model.query.q,
                searchMode: 'all',
                $orderby: $scope.model.query.order,
                $filter: $scope.model.query.filter || null,
                $top: 100,
                $count: true,
                facet: [
                  'neighborhood',
                  'propertyType',
                  'pricePerSqft,values:100|300|500|700|1000|1500'
                ]
            };

            var result;
            if (_.startsWith($scope.model.query.order, 'location')) {
                var parts = $scope.model.query.order.split(' ')
                  , field = parts[0]
                  , dir = parts[1] || 'asc';
                result = { $promise: currentLocation() };
                result.$promise = result.$promise.then(function (loc) {
                    var lon = loc.coords.longitude, lat = loc.coords.latitude;
                    searchParams.$orderby = 'geo.distance(' + field + ", geography'POINT(" + lon + ' ' + lat + ")') " + dir;
                    return search('homes', searchParams).$promise;
                });
            } else {
                result = search('homes', searchParams);
            }

            if ($scope.model.map) $scope.model.map.entities.clear();


            $scope.model.filters = groupFilters($scope.model.query.filter);

            result.$promise.then(function (data) {
                $scope.loading = false;
                if ($scope.model.detail) delete $scope.model.detail;
                $scope.result = data;
                var locations = [], pins = {};
                data.value = data.value.filter(function (d) {
                    return d.location;
                });
                data.value.forEach(function (d, i) {
                    d['@map.location'] = new Microsoft.Maps.Location(d.location.coordinates[1], d.location.coordinates[0]);
                    d['@map.pin'] = new Microsoft.Maps.Pushpin(d['@map.location'], {
                        htmlContent: '<span class="map-pin"></span>',
                        anchor: new Microsoft.Maps.Point(10, 10),
                        width: 20,
                        height: 20
                    });
                    d['@map.pin'].document = d;
                    d['@map.pin'].html = $();
                    d['@scrollTo'] = function () {
                        $('#result-list').find('li').get(i).scrollIntoView();
                    };

                    $scope.model.map.entities.push(d['@map.pin']);
                    locations.push(d['@map.location']);
                    pins[i] = d['@map.pin'];

                    Microsoft.Maps.Events.addHandler(d['@map.pin'], 'click', function (e) {
                        $scope.$apply(function () {
                            $scope.setFocusResult(e.target.document);
                        });
                    });
                    Microsoft.Maps.Events.addHandler(d['@map.pin'], 'mouseover', function (e) {
                        e.target.html.addClass('hover-pin');
                    });
                    Microsoft.Maps.Events.addHandler(d['@map.pin'], 'mouseout', function (e) {
                        e.target.html.removeClass('hover-pin');
                    });
                });

                // find pushpin DOM nodes
                var maxCycles = 10;
                (function findPushpins() {
                    _.each(pins, function (v, k) {
                        if (v.cm1002_er_etr) {
                            v.html = $(v.cm1002_er_etr.dom).find(':first-child');
                            if (v === data.value[0]['@map.pin']) {
                                setTimeout(function () {
                                    Microsoft.Maps.Events.invoke(v, 'click', { target: v });
                                });
                            }
                            delete pins[k];
                        }
                    });

                    if (_.size(pins) > 0 && --maxCycles > 0) {
                        setTimeout(findPushpins);
                    }
                })();

                if ($scope.model.bestView !== false) {
                    $scope.model.map.setView(bestView(locations));
                }
                $scope.model.bestView = true;
            });
        };

        // main
        $scope.model = {};
        $scope.model.query = $location.search();
        $scope.model.query.order = $scope.model.query.order || 'dom';
        $scope.refreshResults();
    }]);
})();
(function () {


    angular.module('dlSearch').controller('dlSearchRepeater', ['$scope', function ($scope) {
        $scope.focusResult = function () {
            $scope.setFocusResult($scope.doc, true);
        };
        $scope.resultMouseIn = function () {
            $scope.doc['@map.pin'].html.addClass('hover-pin');
        };
        $scope.resultMouseOut = function () {
            $scope.doc['@map.pin'].html.removeClass('hover-pin');
        };

    }]);
})();
(function () {


    angular.module('dlSearch').controller('dlSearchMap', ['$scope', '$location', 'searchBounds', 'formatFilter', 'drawPolygon', 'currentLocation', function ($scope, $location, searchBounds, formatFilter, drawPolygon, currentLocation) {

        // assign map
        $scope.mapReady = function (map) {
            $scope.model.map = map;
        };

        $scope.currentLocation = function () {

            currentLocation().then(function (loc) {
                var zoom = $scope.model.map.getZoom();
                if (zoom < 12) zoom = 12;
                $scope.model.map.setView({ center: new Microsoft.Maps.Location(loc.coords.latitude, loc.coords.longitude), zoom: zoom });
            });

        };

        $scope.searchMapArea = function () {
            searchPolygon(searchBounds($scope.model.map.getBounds()));
        };

        $scope.drawPolygon = function () {
            $scope.drawing = true;
            drawPolygon($scope.model.map, function (polygon) {
                $scope.drawing = false;
                searchPolygon(polygon);
            });
        };

        function searchPolygon(points) {
            if (!points) return;
            if (points.length < 4) return;

            points = points.map(function (d) { // must be ccwise [[lat, lon]]
                return d[1] + ' ' + d[0]; // reverse for azure search
            }).join(',');

            var filter = formatFilter({
                value: points,
                type: 'Edm.GeographyPoint',
                operator: 'geo.intersects',
                name: 'location'
            });
            if ($scope.model.query.filter) {
                $scope.model.query.filter = $scope.model.query.filter.replace(/(?: and )?geo\.intersects\(\w+, geography'POLYGON\(\([^)]+\)\)'\)/, '');
            }

            $scope.model.query.filter = $scope.model.query.filter ? $scope.model.query.filter + ' and ' : '';
            $scope.model.query.filter += filter;
            $scope.model.bestView = false;
            delete $scope.model.query.q;

            $location.search($scope.model.query);
        }
    }]);
})();
(function () {


    angular.module('dlSearch').controller('dlSearchForm', ['$scope', '$location', '$window', 'suggest', 'cancelInput', function ($scope, $location, $window, suggest, cancelInput) {
        // execute search
        $scope.search = function () {
            clearSuggestions();
            $scope.allowSuggest = false;
            $location.search($scope.model.query);
            $window.setTimeout(function () {
                $scope.allowSuggest = true;
            }, 1000);
        };

        $scope.resetFilter = function () {
            delete $scope.model.query.order;
            delete $scope.model.query.filter;
            $location.search($scope.model.query);
        };

        // execute search suggestion
        $scope.suggest = function () {
            if (!$scope.model.query.q || !$scope.allowSuggest) {
                clearSuggestions();
                return;
            }

            var suggestResult = suggest('homes', {
                search: $scope.model.query.q,
                $select: 'city,state,zip',
                //$orderby: 'count desc',
                suggesterName: 'homes-sg',
                highlightPreTag: '<strong>',
                highlightPostTag: '</strong>'
            });

            suggestResult.$promise.then(function () {
                if (!$scope.allowSuggest) return;
                $scope.suggestResult = suggestResult;
                if (!$scope.cancelSuggest) {
                    $scope.cancelSuggest = cancelInput(clearSuggestions, stopSuggestions);
                }
            });
        };

        // search suggestion clicked
        $scope.clickSuggest = function (e, text) {
            $scope.model.query.q = text.replace(/<\/?strong>/g, '');
            e.stopPropagation();
            clearSuggestions();
            $scope.search();
        };

        // search box clicked
        $scope.searchInputClicked = function (e) {
            e.stopPropagation();
            $scope.suggest();
        };

        $scope.allowSuggest = true;

        // hide search suggestions
        function clearSuggestions() {
            delete $scope.suggestResult;
            if ($scope.cancelSuggest) {
                $scope.cancelSuggest();
                delete $scope.cancelSuggest;
            }
        }

        // cancel suggestions
        function stopSuggestions(keyCode) {
            if (keyCode == 27) { // ESC
                $scope.allowSuggest = false;
                clearSuggestions();
            } else if (keyCode == 9) { // TAB
                clearSuggestions();
            }
        }
    }]);
})();
(function () {


    angular.module('dlSearch').filter('dollars', ['$filter', function ($filter) {
        return function (value, precision) {
            return $filter('currency')(value, '$', precision || 0);
        };
    }]);
})();
(function () {


    angular.module('dlSearch').controller('dlSearchFacets', ['$scope', '$location', '$filter', 'facetUrl', 'formatFilter', function ($scope, $location, $filter, facetUrl, formatFilter) {

        // format facet field name
        $scope.fieldLabel = function (text) {
            return _.startCase(text);
        };

        // format facet value
        $scope.facetLabel = function (field, value) {
            if (field.includes("price")) {
                return $filter('dollars')(value);
            } else {
                return value;
            }
        };

        $scope.applyFilter = function () {
            // var filters = {}//parseFilter($scope.model.query.filter);
            _.each($scope.filter, function (v, k) {
                if (v.min) {
                    $scope.model.filters[k + 'ge'] = {
                        name: k,
                        type: 'Edm.Double',
                        comparison: 'ge',
                        value: v.min
                    };
                } else if (v.min === null) {
                    delete $scope.model.filters[k + 'ge'];
                }

                if (v.max) {
                    $scope.model.filters[k + 'le'] = {
                        name: k,
                        type: 'Edm.Double',
                        comparison: 'le',
                        value: v.max
                    };
                } else if (v.max === null) {
                    delete $scope.model.filters[k + 'le'];
                }
            });
            $scope.model.query.filter = _.values($scope.model.filters).map(formatFilter).join(' and ');
            $location.search($scope.model.query);
        };

        // URL helper functions
        $scope.facetUrl = facetUrl;

        $scope.filter = {};
        $scope.facetType = { neighborhood: 'Edm.String', propertyType: 'Edm.String', pricePerSqft: 'Edm.Int32' };
        $scope.buckets = {};
        $scope.buckets.price = _.range(50e3, 500e3 + 1, 50e3)
          .concat(_.range(500e3, 1e6 + 1, 50e3))
          .concat(_.range(1e6, 5e6 + 1, 250e3))
          .concat(_.range(5e6, 10e6 + 1, 1e6));
        $scope.buckets.beds = _.range(1, 6 + 1);
        $scope.buckets.baths = [1, 1.25].concat(_.range(2, 6 + 1));
        $scope.buckets.sqft = _.range(500, 3001, 250)
          .concat(_.range(3000, 4001, 500))
          .concat(5000, 7500);
        $scope.buckets.hoa = _.range(25, 101, 25)
          .concat(_.range(100, 301, 50))
          .concat(_.range(300, 601, 100));
        $scope.buckets.domLt = [3, 7, 14, 30];
        $scope.buckets.domGt = [7, 14, 30, 60, 90, 180];



        _.each($scope.model.filters, function (d) {
            if ($scope.buckets[d.name]) {
                if (d.comparison == 'ge') {
                    $scope.filter[d.name] = $scope.filter[d.name] || {};
                    $scope.filter[d.name].min = d.value;
                } else if (d.comparison == 'le') {
                    $scope.filter[d.name] = $scope.filter[d.name] || {};
                    $scope.filter[d.name].max = d.value;
                }
            }
        });
    }]);
})();
(function () {


    angular.module('dlSearch').directive('dlSearch', ['$timeout', function ($timeout) {
        return {
            /* restrict: 'AE', */
            scope: {
                title: '@',
                type: '@',
                layout: '@',
                icon: '@',
                color: '@',
                features: '=',
                theme: '@',
                classes: '@',
                bodyclasses: '@'
            },
            transclude: true,
            templateUrl: 'ext-modules/dlSearch/dlSearchTemplate.html',
            controller: 'dlSearchRoute',
            reloadOnSearch: false,
            link: function (scope, el, attr) {
            }
        };
    }]);

})();
(function () {


    angular.module('dlSearch').controller('dlSearchDetail', ['$scope', function ($scope) {

        // advance detail document image preview
        $scope.nextImage = function () {
            if ($scope.model.detail['@image'] == $scope.model.detail.imageUrls.length - 1) {
                $scope.model.detail['@image'] = 0;
            } else {
                $scope.model.detail['@image']++;
            }
        };
    }]);
})();
(function () {


    angular.module("dlPriceTable", ["xeditable"]);
})();

angular.module("dlPriceTable").run(["$templateCache", function($templateCache) {$templateCache.put("ext-modules/dlPriceTable/dlPriceItemTemplate.html","<div ng-switch-on=\"theme\">\r\n\r\n    <div ng-switch-default>\r\n        <div class=\"col-md-3 col-lg-3\">\r\n            <div class=\"panel price panel-{{color}}\">\r\n                <div class=\"panel-heading text-center\">\r\n                    <h3>{{title}}</h3>\r\n                </div>\r\n                <div class=\"panel-body text-center\">\r\n                    <p class=\"lead\" style=\"font-size:40px\"><strong>{{price}}</strong></p>\r\n                </div>\r\n                <ul class=\"list-group list-group-flush text-center\">\r\n                    <li class=\"list-group-item\" ng-repeat=\"feature in features\">\r\n                        <i class=\"fa fa-check text-danger\"></i> {{feature}}\r\n                    </li>\r\n                </ul>\r\n                <div class=\"panel-footer\">\r\n                    <a class=\"btn btn-lg btn-block btn-{{buttoncolor}}\" href=\"{{route}}\">{{buttontext}}</a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div ng-switch-when=\"custom\">\r\n        <div  class=\"{{classes}}\">\r\n            <div class=\"panel price panel-{{color}}\">\r\n                <div class=\"panel-heading text-center\">\r\n                    <h3>{{title}}</h3>\r\n                </div>\r\n                <div class=\"panel-body text-center\">\r\n                    <p class=\"lead\" style=\"font-size:40px\"><strong>{{price}}</strong></p>\r\n                </div>\r\n                <ul class=\"list-group list-group-flush text-center\">\r\n                    <li class=\"list-group-item\" ng-repeat=\"feature in features\">\r\n                        <i class=\"fa fa-check text-danger\"></i> {{feature}}\r\n                    </li>\r\n                </ul>\r\n                <div class=\"panel-footer\">\r\n                    <a class=\"btn btn-lg btn-block btn-{{buttoncolor}}\" href=\"{{route}}\">{{buttontext}}</a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div ng-switch-when=\"option1\">\r\n        <div class=\"{{classes}}\">\r\n            <div class=\"panel price panel-{{color}}\">\r\n                <div class=\"panel-heading text-center\">\r\n                    <h3>{{title}}</h3>\r\n                </div>\r\n                <div class=\"panel-body text-center\">\r\n                    <p class=\"lead\" style=\"font-size:40px\"><strong>{{price}}</strong></p>\r\n                </div>\r\n                <ul class=\"list-group list-group-flush text-center\">\r\n                    <li class=\"list-group-item\" ng-repeat=\"feature in features\">\r\n                        <i class=\"fa fa-check text-danger\"></i> {{feature}}\r\n                    </li>\r\n                </ul>\r\n                <div class=\"panel-footer\">\r\n                    <a class=\"btn btn-lg btn-block btn-{{buttoncolor}}\" href=\"{{route}}\">{{buttontext}}</a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</div>");
$templateCache.put("ext-modules/dlPriceTable/dlPriceTableTemplate.html","<div ng-if=\"group\">\r\n    <div ng-switch=\"theme\">\r\n        <div ng-switch-default>\r\n            <ul class=\"dl-price-table\" ng-transclude></ul>\r\n        </div>\r\n        <div ng-switch-when=\"custom\">\r\n            <ul class=\"dl-price-table {{classes}}\" ng-transclude></ul>\r\n        </div>\r\n        <div ng-switch-when=\"option1\">\r\n            <ul class=\"dl-price-table {{classes}}\" ng-transclude></ul>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div ng-if=\"!group\">\r\n    <div ng-switch=\"theme\">\r\n\r\n        <div ng-switch-default>\r\n            <div class=\"col-md-3 col-lg-3\">\r\n                <div class=\"panel price panel-{{color}}\">\r\n                    <div class=\"panel-heading text-center\">\r\n                        <h3>{{title}}</h3>\r\n                    </div>\r\n                    <div class=\"panel-body text-center\">\r\n                        <p class=\"lead\" style=\"font-size:40px\"><strong>{{price}}</strong></p>\r\n                    </div>\r\n                    <ul class=\"list-group list-group-flush text-center\">\r\n                        <li class=\"list-group-item\" ng-repeat=\"feature in features\">\r\n                            <i class=\"fa fa-check text-danger\"></i> <span>{{feature}}</span>\r\n                        </li>\r\n                    </ul>\r\n                    <div class=\"panel-footer\">\r\n                        <a class=\"btn btn-lg btn-block btn-{{buttoncolor}}\" href=\"{{route}}\">{{buttontext}}</a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div ng-switch-when=\"custom\">\r\n            <div class=\"{{classes}}\">\r\n                <div class=\"panel price panel-{{color}}\">\r\n                    <div class=\"panel-heading text-center\">\r\n                        <h3>{{title}}</h3>\r\n                    </div>\r\n                    <div class=\"panel-body text-center\">\r\n                        <p class=\"lead\" style=\"font-size:40px\"><strong>{{price}}</strong></p>\r\n                    </div>\r\n                    <ul class=\"list-group list-group-flush text-center\">\r\n                        <li class=\"list-group-item\" ng-repeat=\"feature in features\">\r\n                            <i class=\"fa fa-check text-danger\"></i> {{feature}}\r\n                        </li>\r\n                    </ul>\r\n                    <div class=\"panel-footer\">\r\n                        <a class=\"btn btn-lg btn-block btn-{{buttoncolor}}\" href=\"{{route}}\">{{buttontext}}</a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div ng-switch-when=\"option1\">\r\n            <div class=\"{{classes}}\">\r\n                <div class=\"panel price panel-{{color}}\">\r\n                    <div class=\"panel-heading text-center\">\r\n                        <h3>{{title}}</h3>\r\n                    </div>\r\n                    <div class=\"panel-body text-center\">\r\n                        <p class=\"lead\" style=\"font-size:40px\"><strong>{{price}}</strong></p>\r\n                    </div>\r\n                    <ul class=\"list-group list-group-flush text-center\">\r\n                        <li class=\"list-group-item\" ng-repeat=\"feature in features\">\r\n                            <i class=\"fa fa-check text-danger\"></i> {{feature}}\r\n                        </li>\r\n                    </ul>\r\n                    <div class=\"panel-footer\">\r\n                        <a class=\"btn btn-lg btn-block btn-{{buttoncolor}}\" href=\"{{route}}\">{{buttontext}}</a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n</div>");}]);
(function () {


    angular.module("dlPriceTable").directive("dlPriceTable", function () {
        return {
            transclude: true,
            scope: {
                title: '@',
                price: '@',
                route: '@',
                buttoncolor: '@',
                buttontext: '@',
                color: '@',
                features: '=',
                theme: '@',
                classes: '@'
            },
            controller: "dlPriceTableController",
            templateUrl: "ext-modules/dlPriceTable/dlPriceTableTemplate.html"
        };
    });
})();
(function () {


    angular.module("dlPriceTable").controller("dlPriceTableController",
        ['$scope', '$window', '$timeout', '$rootScope', '$location',
            function ($scope, $window, $timeout, $rootScope, $location) {

            }
        ]);
})();
(function () {


    angular.module('dlPriceTable').directive('dlPriceItem', function () {
        return {
            /*restrict: 'AE',*/
            require: '^dlPriceTable',
            scope: {
                title: '@',
                price: '@',
                route: '@',
                buttoncolor: '@',
                buttontext: '@',
                color: '@',
                features: '=',
                featured: '@',
                theme: '@',
                classes: '@',
                group: '@'
            },
            templateUrl: 'ext-modules/dlPriceTable/dlPriceItemTemplate.html',
            link: function (scope, el, attr, ctrl) {
            }
        };
    });

})();
(function () {


    angular.module("dlPanel", []);
})();

angular.module("dlPanel").run(["$templateCache", function($templateCache) {$templateCache.put("ext-modules/dlPanel/dlPanelTemplate.html","<div ng-switch=\"type\">\r\n    <div ng-switch-default>\r\n        <div class=\"{{layout}}\">\r\n            <div class=\"panel panel-{{color}}\">\r\n                <div class=\"panel-heading text-center\">\r\n                    <h3><i class=\"fa {{icon}}\"></i> {{title}}</h3>\r\n                </div>\r\n                <div class=\"panel-body {{bodyclasses}}\">\r\n                    <div ng-transclude></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");}]);
(function () {


    angular.module("dlPanel").directive("dlPanel", function () {
        return {
            transclude: true,
            scope: {
                title: '@',
                type: '@',
                layout: '@',
                icon: '@',
                color: '@',
                features: '=',
                theme: '@',
                classes: '@',
                bodyclasses: '@'
            },
            controller: "dlPanelController",
            templateUrl: "ext-modules/dlPanel/dlPanelTemplate.html"
        };
    });
})();
(function () {


    angular.module("dlPanel").controller("dlPanelController",
        ['$scope', '$window', '$timeout', '$rootScope', '$location',
            function ($scope, $window, $timeout, $rootScope, $location) {

            }
        ]);
})();
(function () {


    angular.module("dlParallax", []);
})();

(function () {


    angular.module('dlParallax').directive('parallax', function () {
      return {
        restrict: 'A',
        scope: {
          parallaxRatio: '@',
          parallaxVerticalOffset: '@',
          parallaxHorizontalOffset: '@',
        },
        link: function($scope, elem, attrs) {
          var setPosition = function () {
            if(!$scope.parallaxHorizontalOffset) $scope.parallaxHorizontalOffset = '0';
            var calcValY = $window.pageYOffset * ($scope.parallaxRatio ? $scope.parallaxRatio : 1.1 );
            if (calcValY <= $window.innerHeight) {
              var topVal = (calcValY < $scope.parallaxVerticalOffset ? $scope.parallaxVerticalOffset : calcValY);
              var hozVal = ($scope.parallaxHorizontalOffset.indexOf("%") === -1 ? $scope.parallaxHorizontalOffset + 'px' : $scope.parallaxHorizontalOffset);
              elem.css('transform', 'translate(' + hozVal + ', ' + topVal + 'px)');
            }
          };

          setPosition();

          angular.element($window).bind("scroll", setPosition);
          angular.element($window).bind("touchmove", setPosition);
        }  // link function
      };
    });

})();
(function () {


    angular.module('dlParallax').directive('parallaxBackground', function () {
        return {
            restrict: 'A',
            transclude: true,
            template: '<div ng-transclude></div>',
            scope: {
                parallaxRatio: '@',
                parallaxVerticalOffset: '@',
            },
            link: function ($scope, elem, attrs) {
                var setPosition = function () {
                    var calcValY = (elem.prop('offsetTop') - $window.pageYOffset) * ($scope.parallaxRatio ? $scope.parallaxRatio : 1.1) - ($scope.parallaxVerticalOffset || 0);
                    // horizontal positioning
                    elem.css('background-position', "50% " + calcValY + "px");
                };

                // set our initial position - fixes webkit background render bug
                angular.element($window).bind('load', function (e) {
                    setPosition();
                    $scope.$apply();
                });

                angular.element($window).bind("scroll", setPosition);
                angular.element($window).bind("touchmove", setPosition);
            }  // link function
        };
    });

})();
(function () {


    angular.module("dlMenu", ["ngAnimate"]);
})();

angular.module("dlMenu").run(["$templateCache", function($templateCache) {$templateCache.put("ext-modules/dlMenu/dlMenuGroupTemplate.html","<li class=\"dl-selectable-item\" ng-click=\"clicked()\" ng-mouseenter=\"clicked()\" ng-class=\"{\'dl-item-horizontal\': !isVertical()}\">\r\n    <div class=\"dl-noselect\">\r\n        <i class=\"fa {{ icon }} dl-menu-icon\"></i>\r\n        <span>\r\n            {{ label }}\r\n        </span>\r\n        <i ng-if=\"isVertical()\"\r\n           class=\"fa fa-chevron-left dl-group-indicator-left\"\r\n           ng-class=\"{\'fa-rotate-270\': isOpen}\"></i>\r\n    </div>\r\n</li>\r\n\r\n<!--  Optional Menu to Right Styling ::\r\n\r\n    Background must have rgb backup for non-rgba compliant browsers.\r\n    Left # is set to width of the menu by default. Padding-left fixes\r\n    the placement of hover effects on background.\r\n\r\n    style=\"position: absolute;\r\n    float: right !important;\r\n    left: 200px !important;\r\n    background: rgba(0,0,0,0.5);\r\n    width: 180px;\r\n    padding-left: 0px;\r\n    margin-top:-43px;\"\r\n\r\n-->\r\n\r\n<li ng-show=\"isOpen\" ng-mouseleave=\"clicked()\">\r\n    <div class=\"dl-subitem-section dl-fade-in-animation\" ng-class=\"{\'dl-popup-menu\': !isVertical() }\">\r\n        <ul ng-transclude></ul>\r\n    </div>\r\n</li>");
$templateCache.put("ext-modules/dlMenu/dlMenuItemTemplate.html","<li class=\"dl-selectable-item\" ng-class=\"{\'dl-item-horizontal\': !isVertical(), \'dl-menu-active-item-indicator\': isActive() && isVertical()}\">\r\n    <div class=\"dl-noselect\">\r\n        <i class=\"fa {{ icon }} dl-menu-icon\"></i>\r\n        <span>\r\n            {{ label }}\r\n        </span>\r\n    </div>\r\n    <i ng-if=\"isActive() && isVertical()\" class=\"fa fa-2x fa-caret-left dl-menu-active-indicator\"></i>\r\n</li>");
$templateCache.put("ext-modules/dlMenu/dlMenuTemplate.html","<div>\r\n    <ul class=\"dl-menu\" ng-transclude></ul>\r\n\r\n    <!-- Horizontal Toggle Button Disabled -->\r\n    <!--<a class=\"btn dl-menu-layout-button\"\r\n       ng-show=\"allowHorizontalToggle\"\r\n       ng-class=\"{\'dl-layout-button-horizontal\': !isVertical}\"\r\n       ng-click=\"toggleMenuOrientation()\">\r\n        <i class=\"fa\"\r\n           ng-class=\"{\'fa-chevron-up\': isVertical, \'fa-chevron-left\': !isVertical}\"></i>\r\n    </a>-->\r\n\r\n    <!-- Disabled on Horizontal Layout -->\r\n    <div ng-show=\"footer && isVertical\">\r\n        <div class=\"dl-menu-footer\">\r\n                    <button class=\"btn btn-warning dl-menu-footer-btn\">\r\n                        <i class=\"fa fa-gears\"></i>\r\n                    </button>\r\n\r\n                    <button class=\"btn btn-warning dl-menu-footer-btn\">\r\n                        <i class=\"fa fa-eye-slash\"></i>\r\n                    </button>\r\n\r\n                    <button class=\"btn btn-warning dl-menu-footer-btn\">\r\n                        <i class=\"fa fa-power-off\"></i>\r\n                    </button>\r\n        </div>\r\n    </div>\r\n</div>");}]);
(function () {


    angular.module('dlMenu').directive('dlMenuItem', function () {
        return {
            restrict: 'AE',
            require: '^dlMenu',
            scope: {
                label: '@',
                icon: '@',
                route: '@'
            },
            templateUrl: 'ext-modules/dlMenu/dlMenuItemTemplate.html',
            link: function (scope, el, attr, ctrl) {
                scope.isActive = function () {
                    return el === ctrl.getActiveElement();
                };

                scope.isVertical = function () {
                    return ctrl.isVertical() || el.parents('.dl-subitem-section').length > 0;
                };

                el.on('click', function (evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    scope.$apply(function () {
                        ctrl.setActiveElement(el);
                        ctrl.setRoute(scope.route);
                    });
                    console.log("menu item clicked");
                });
            }
        };
    });

})();
(function () {


    angular.module('dlMenu').directive('dlMenuGroup', function () {
        return {
            restrict: 'E',
            require: '^dlMenu',
            transclude: true,
            scope: {
                label: '@',
                icon: '@'
            },
            templateUrl: 'ext-modules/dlMenu/dlMenuGroupTemplate.html',
            link: function (scope, el, attrs, ctrl) {
                scope.isOpen = false;
                scope.closeMenu = function () {
                    scope.isOpen = false;
                    console.log("closeMenu() called");
                };
                scope.clicked = function () {
                    scope.isOpen = !scope.isOpen;
                    console.log("clicked called");
                    console.log("isOpen: " + scope.isOpen);

                    if (el.parents('.dl-subitem-section').length == 0)
                        scope.setSubmenuPosition();
                    ctrl.setOpenMenuScope(scope);


                    console.log("ctrl.setOpenMenuScope: " + scope)
                };
                scope.isVertical = function () {
                    return ctrl.isVertical() || el.parents('.dl-subitem-section').length > 0;
                };

                scope.setSubmenuPosition = function () {
                    var pos = el.offset();
                    console.log(pos);
                    /* adjust pos.left + # (ie: 20) if using other fonts */
                    $('.dl-subitem-section').css({ 'left': pos.left, 'top': 36 })
                };
            }
        };
    });

})();
(function () {


    angular.module('dlMenu').directive('dlMenu', ['$timeout', function ($timeout) {
        return {
            /* restrict: 'AE', */
            scope: {
                footer: '@',
                widget: '@'
            },
            transclude: true,
            templateUrl: 'ext-modules/dlMenu/dlMenuTemplate.html',
            controller: 'dlMenuController',
            link: function (scope, el, attr) {
                var item = el.find('.dl-selectable-item:first');
                $timeout(function () {
                    item.trigger('click');
                });
            }
        };
    }]);

})();
(function() {


    angular.module('dlMenu').controller('dlMenuController',
        ['$scope', '$rootScope',
            function ($scope, $rootScope) {

                $scope.isVertical = true;
                $scope.openMenuScope = null;
                $scope.showMenu = true;
                $scope.allowHorizontalToggle = true;

                this.getActiveElement = function () {
                    return $scope.activeElement;
                };

                this.setActiveElement = function (el) {
                    $scope.activeElement = el;
                };
                
                this.setRoute = function (route) {
                    /* Could use $rootScope.$emit but would only work up same tree */
                    $rootScope.$broadcast('dl-menu-item-selected-event',
                        { route: route });
                };

                this.isVertical = function () {
                    return $scope.isVertical;
                };

                this.setOpenMenuScope = function (scope) {
                    $scope.openMenuScope = scope;
                    //console.log("setOpenMenuScope called on: " + scope)
                };

                $scope.$on('dl-menu-show', function (evt, data) {
                    //console.log("dl-menu show called")
                    $scope.showMenu = data.show;
                    $scope.isVerticle = data.isVerticle;
                    $scope.allowHorizontalToggle = data.allowHorizontalToggle;
                });

                $scope.toggleMenuOrientation = function () {
                    /* close any open menus */
                    if ($scope.openMenuScope) {
                        //console.log("$scope.openMenuScope: " + $scope.openMenuScope)
                        $scope.openMenuScope.closeMenu();
                    }

                    $scope.isVertical = !$scope.isVertical;

                    $rootScope.$broadcast('dl-menu-orientation-changed-event',
                        { isMenuVertical: $scope.isVertical });
                };

                angular.element(document).bind('click', function (e) {
                    if ($scope.openMenuScope && !$scope.isVertical) {
                        if ($(e.target).parent().hasClass('dl-selectable-item')) {
                            //console.log("has selectable-item and returned");
                            return;
                        }
                        $scope.$apply(function () {
                            //console.log("$scope.openMenuScope.closeMenu called")
                            $scope.openMenuScope.closeMenu();
                        });
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });

            }
        ]);

})();
angular.module("dlFramework").run(["$templateCache", function($templateCache) {$templateCache.put("ext-modules/dlFramework/dlFrameworkTemplate.html","<div class=\"dl-title-bar navbar-fixed-top\">\r\n    <div class=\"row\">\r\n        <div class=\"dl-logo-area col-xs-12 col-sm-12 col-md-6\">\r\n\r\n            <div ng-if=\"isMenuButtonVisible\" ng-click=\"menuButtonClicked()\"\r\n                 class=\"dl-collapsed-menu pull-left\">\r\n                <!-- Regular Bars Icon -->\r\n                <button type=\"button\" class=\"btn dl-nav-button\">\r\n                    <i class=\"fa fa-bars\"></i>\r\n                </button>\r\n                <!--<button type=\"button\" class=\"tcon tcon-menu--xcross\" aria-label=\"toggle menu\">\r\n                    <span class=\"tcon-menu__lines\" aria-hidden=\"true\"></span>\r\n                    <span class=\"tcon-visuallyhidden\">toggle menu</span>\r\n                </button>-->\r\n            </div>\r\n            <a href=\"#/index\"><img class=\"dl-icon\" ng-src=\"{{ iconFile }}\" /></a>\r\n            <div class=\"dl-title-area\">\r\n                <p class=\"dl-logo-title\">{{ title }}</p>\r\n                <p class=\"dl-logo-subtitle\">{{ subtitle }}</p>\r\n                <!--If using iconXs uncomment-->\r\n                <!--<img class=\"dl-icon-xs\" ng-src=\"{-{ iconXs }-}\" />-->\r\n            </div>\r\n            <!--<div class=\"dl-search-area\">\r\n                <form>\r\n                    <input type=\"text\" name=\"search\" />\r\n                </form>\r\n            </div>-->\r\n\r\n\r\n        </div>\r\n\r\n        <div class=\"dl-right-side-controls hidden-xs hidden-sm col-md-6 pull-right\">\r\n            <dl-user-profile-small></dl-user-profile-small>\r\n        </div>\r\n\r\n\r\n        <!--<div class=\"dl-right-side-controls col-xs-7 col-sm-3 pull-right\">\r\n            <div>\r\n                <a class=\"btn btn-danger\" href=\"//twitter.com/dryverless\"><i class=\"fa fa-twitter-square\"></i></a>\r\n                <a class=\"btn btn-warning\" href=\"//linkedin.com/company/dryverless\"><i class=\"fa fa-linkedin-square\"></i></a>\r\n                <a class=\"btn btn-success\" href=\"//facebook.com/dryverless\"><i class=\"fa fa-facebook-square\"></i></a>\r\n                <a class=\"btn btn-info\" href=\"//angel.co/dryverless\"><i class=\"fa fa-angellist\"></i></a>\r\n                <a class=\"btn btn-default\" href=\"//instagram.com/dryverless\"><i class=\"fa fa-instagram\"></i></a>\r\n            </div>\r\n        </div>-->\r\n    </div>\r\n</div>\r\n\r\n<div style=\"top: 68px; width: 100%; position: relative;\">\r\n    <div class=\"dl-menu-area class animated fadeInLeft\"\r\n         ng-show=\"isMenuVisible\"\r\n         ng-class=\"{\'dl-menu-area-vertical\': isMenuVertical, \'dl-menu-area-horizontal\': !isMenuVertical, \'dl-mobile-menu\': isMenuButtonVisible, \'dl-menu-fade\': !isMenuVisible}\">\r\n\r\n        <button ng-show=\"isMenuButtonVisible\" ng-click=\"menuButtonClicked()\" type=\"button\" class=\"dl-mobile-close-button\">\r\n            <i class=\"fa fa-times-circle-o\"></i>\r\n        </button>\r\n        <!-- User Profile -->\r\n        <dl-user-profile></dl-user-profile>\r\n        <!-- Menu -->\r\n        <div ng-transclude></div>\r\n    </div>\r\n\r\n    <!-- Main ng-view -->\r\n    <div ng-view class=\"dl-view animated\" ng-class=\"{\'dl-view-full-width\': !isMenuVertical || !isMenuVisible, \'dl-view-mobile\': isMenuButtonVisible, \'dl-view-in-left\': isMenuVertical && isMenuVisible}\">\r\n    </div>\r\n</div>\r\n");
$templateCache.put("ext-modules/dlFramework/dlUserProfile/dlUserProfileSmallTemplate.html","<div class=\"dl-user-profile-small pull-right\">\r\n\r\n    <!--<button class=\"btn btn-info btn-sm\">\r\n        <i class=\"fa fa-chevron-down\"></i>\r\n    </button>-->\r\n\r\n    <div class=\"btn-group\">\r\n        <div ng-switch=\"isAuthenticated\">\r\n            <div class=\"btn-group\" ng-switch-when=\"true\">\r\n				<!-- <button class=\"btn dl-user-profile-btn\">\r\n                    <span class=\"dl-profile-image dl-profile-online\">\r\n                    <img src=\"images/employee.jpg\" alt=\"user image\" style=\"border-radius: 100%\" />\r\n                    <i></i>\r\n                    </span>\r\n\r\n                    <span class=\"dl-user-profile-small-name\">{{userName}}</span>\r\n                </button> -->\r\n                <button class=\"btn btn-default dl-user-profile-btn dropdown-toggle\" data-toggle=\"dropdown\">\r\n                    <span class=\"dl-profile-image dl-profile-online\">\r\n	                    <img src=\"images/employee.jpg\" alt=\"user image\" style=\"border-radius: 100%;\" />\r\n                    </span>\r\n                    <!--fa-ellipsis-v-->\r\n                    <span class=\"dl-user-profile-small-name\"><i class=\"fa fa-caret-down\"></i></span>\r\n				</button>\r\n                <ul class=\"dropdown-menu pull-right\">\r\n                	<li class=\"dropdown-header\">Signed in as</li>\r\n                	<li>{{userName}}</li>\r\n                	<li class=\"divider\"></li>\r\n                    <li>\r\n                        <a tabindex=\"-1\" href=\"#/profile\"><span class=\"badge pull-right\"><i class=\"fa fa-user\"></i></span> Your profile</a>\r\n                    </li>\r\n                    <li>\r\n                        <a tabindex=\"-1\" href=\"#/favorites\"><span class=\"badge pull-right\"><i class=\"fa fa-star\"></i></span> Your favorites</a>\r\n                    </li>\r\n                    <li>\r\n                        <a tabindex=\"-1\" href=\"#/savedsearches\"><span class=\"badge pull-right\"><i class=\"fa fa-search\"></i></span> Saved searches</a>\r\n                    </li>\r\n                    <li>\r\n                        <a tabindex=\"-1\" href=\"#/help\"><span class=\"badge pull-right\"><i class=\"fa fa-question\"></i></span> Help</a>\r\n                    </li>\r\n                    <li class=\"divider\"></li>\r\n                    <li>\r\n                    	<a tabindex=\"-1\" href=\"#/settings\"><span class=\"badge pull-right\"><i class=\"fa fa-cog\"></i></span> Settings</a>\r\n                    <li>\r\n                        <a tabindex=\"-1\" ng-click=\"logOut()\"><span class=\"badge pull-right\"><i class=\"fa fa-lock\"></i></span> Sign out</a>\r\n                    </li>\r\n                    <li>\r\n                        <a tabindex=\"-1\" ng-click=\"goFullscreen()\"><span class=\"badge pull-right\"><i class=\"fa fa-arrows-alt\"></i></span> Fullscreen</a>\r\n                    </li>\r\n                    <!--<li>\r\n                        <a tabindex=\"-1\" href=\"javascript:void(0)\"><span class=\"badge pull-right\">3</span>News</a>\r\n                    </li>\r\n                    <li>\r\n                        <a tabindex=\"-1\" href=\"javascript:void(0)\"><span class=\"badge pull-right\">1</span>Messages</a>\r\n                    </li>\r\n                    <li class=\"divider\"></li>\r\n                    <li class=\"dropdown-header\">More</li>\r\n                    <li>\r\n                        <a tabindex=\"-1\" href=\"javascript:void(0)\">Edit Profile..</a>\r\n                    </li>-->\r\n                </ul>\r\n            </div>\r\n            <div ng-switch-default>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");
$templateCache.put("ext-modules/dlFramework/dlUserProfile/dlUserProfileTemplate.html","<div class=\"dl-user-profile\" ng-if=\"isMenuVertical && isAuthenticated\">\r\n    <span class=\"dl-profile-image-side dl-profile-online\">\r\n        <img src=\"images/employee.jpg\" alt=\"user image\" style=\"border-radius: 100%\" />\r\n        <i></i>\r\n    </span>\r\n    <div style=\"position: absolute; left: 100px; width:200px;\">\r\n        <div class=\"text-center\">\r\n            <div class=\"dl-user-profile-btn-group btn-group\" style=\"display:inline;\">\r\n                <button class=\"btn dl-user-profile-btn dropdown-toggle\" data-toggle=\"dropdown\">\r\n                    <i class=\"fa fa-caret-down\" style=\"padding:5px;\"></i>\r\n                </button>\r\n                <ul class=\"dropdown-menu pull-right\">\r\n                    <li class=\"dropdown-header\">Signed in as</li>\r\n                    <li>{{userName}}</li>\r\n                    <li class=\"divider\"></li>\r\n                    <li>\r\n                        <a tabindex=\"-1\" href=\"#/profile\"><span class=\"badge pull-right\"><i class=\"fa fa-user\"></i></span> Your profile</a>\r\n                    </li>\r\n                    <li>\r\n                        <a tabindex=\"-1\" href=\"#/favorites\"><span class=\"badge pull-right\"><i class=\"fa fa-star\"></i></span> Your favorites</a>\r\n                    </li>\r\n                    <li>\r\n                        <a tabindex=\"-1\" href=\"#/savedsearches\"><span class=\"badge pull-right\"><i class=\"fa fa-search\"></i></span> Saved searches</a>\r\n                    </li>\r\n                    <li>\r\n                        <a tabindex=\"-1\" href=\"#/help\"><span class=\"badge pull-right\"><i class=\"fa fa-question\"></i></span> Help</a>\r\n                    </li>\r\n                    <li class=\"divider\"></li>\r\n                    <li>\r\n                        <a tabindex=\"-1\" href=\"#/settings\"><span class=\"badge pull-right\"><i class=\"fa fa-cog\"></i></span> Settings</a>\r\n                    <li>\r\n                        <a tabindex=\"-1\" ng-click=\"logOut()\"><span class=\"badge pull-right\"><i class=\"fa fa-lock\"></i></span> Sign out</a>\r\n                    </li>\r\n                    <li>\r\n                        <a tabindex=\"-1\" ng-click=\"goFullscreen()\"><span class=\"badge pull-right\"><i class=\"fa fa-arrows-alt\"></i></span> Fullscreen</a>\r\n                    </li>\r\n                    <!--<li>\r\n                <a tabindex=\"-1\" href=\"javascript:void(0)\"><span class=\"badge pull-right\">3</span>News</a>\r\n            </li>\r\n            <li>\r\n                <a tabindex=\"-1\" href=\"javascript:void(0)\"><span class=\"badge pull-right\">1</span>Messages</a>\r\n            </li>-->\r\n                    <!--<li class=\"divider\"></li>\r\n            <li class=\"dropdown-header\">More</li>\r\n            <li>\r\n                <a tabindex=\"-1\" href=\"#/manage\">Edit Profile..</a>\r\n            </li>-->\r\n                </ul>\r\n            </div>\r\n            <!-- <span class=\"text-left\" style=\"margin-left: -20px; margin-top: -10px;\">\r\n                <p>Logged in as:</p>\r\n                <p>{{userName}}</p>\r\n            </span> -->\r\n        </div>\r\n\r\n        <!--<button class=\"btn btn-info btn-xs\">\r\n            <i class=\"fa fa-chevron-down\"></i>\r\n        </button>-->\r\n\r\n    </div>\r\n</div>\r\n");}]);
(function () {


    angular.module("dlFramework").directive("dlFramework", function () {
        return {
            transclude: true,
            scope: {
                title: '@',
                subtitle: '@',
                iconFile: '@'
                /* iconXs: '@' */
            },
            controller: "dlFrameworkController",
            templateUrl: "ext-modules/dlFramework/dlFrameworkTemplate.html"
        };
    });
})();
(function () {


    angular.module("dlFramework").controller("dlFrameworkController",
        ['$scope', '$window', '$timeout', '$rootScope', '$location', 'Fullscreen',
            function ($scope, $window, $timeout, $rootScope, $location, Fullscreen) {

                $scope.isMenuVisible = true;
                $scope.isMenuButtonVisible = true;
                $scope.isMenuVertical = true;
                $scope.isFullScreen = false;
                $scope.userName = $rootScope.userName;
                $scope.isAuthenticated = $rootScope.isAuthenticated;

                $scope.$on('user-authenticated', function (evt, data) {
                    console.log("user authenticated called")
                    $scope.isAuthenticated = data.isAuthenticated;
                    $scope.userName = data.userName;
                });

                $scope.logOut = $rootScope.logOut;

                $scope.$on('dl-menu-item-selected-event', function (evt, data) {
                    $scope.routeString = data.route;
                    $location.path(data.route);
                    checkWidth();
                    broadcastMenuState();
                });

                $scope.$on('dl-menu-orientation-changed-event', function (evt, data) {
                    $scope.isMenuVertical = data.isMenuVertical;
                    $timeout(function () {
                        $($window).trigger('resize');
                    }, 0);
                });

                $($window).on('resize.dlFramework', function () {
                    $scope.$apply(function () {
                        checkWidth();
                        broadcastMenuState();
                    });
                });

                $scope.$on('FBFullscreen.change', function () {
                    $scope.$apply(function () {
                        checkWidth();
                        broadcastMenuState();
                    });
                });

                $scope.$on("$destroy", function () {
                    /* remove the handler that has been added earlier */
                    $($window).off("resize.dlFramework");
                });

                var checkWidth = function () {
                    //console.log("checkWidth called");
                    var width = Math.max($($window).width(), $window.innerWidth);
                    /* If Tablet or Greater (768px) Menu Visible Bool Set True */
                    $scope.isMenuVisible = (width > 1200);
                    $scope.isMenuButtonVisible = !$scope.isMenuVisible;
                };

                $scope.menuButtonClicked = function () {
                    $scope.isMenuVisible = !$scope.isMenuVisible;
                    broadcastMenuState();
                    //$scope.$apply();
                };

                var broadcastMenuState = function () {
                    $rootScope.$broadcast('dl-menu-show',
                        {
                            show: $scope.isMenuVisible,
                            isVerticle: $scope.isMenuVerticle,
                            allowHorizontalToggle: !$scope.isMenuButtonVisible
                        });
                };

                $scope.goFullscreen = function () {

                    // Fullscreen
                    if (Fullscreen.isEnabled()) {
                        Fullscreen.cancel();
                    }
                    else {
                        Fullscreen.all();
                    }

                    // Set Fullscreen to a specific element (bad practice)
                    // Fullscreen.enable( document.getElementById('img') )

                };

                $scope.goFullScreenViaWatcher = function () {
                    $scope.isFullScreen = !$scope.isFullScreen;
                };

                $timeout(function () {
                    checkWidth();
                }, 0);
            }
        ]);
})();
(function () {


    angular.module("dlFramework").directive("dlClickAnywhere", "$document", function ($document) {
        return {
            restrict: 'A',
            link: function (scope, elem, attr, ctrl) {
                elem.bind('click', function (e) {
                    // this part keeps it from firing the click on the document.
                    e.stopPropagation();
                });
                $document.bind('click', function () {
                    // magic here.
                    scope.$apply(attr.dlClickAnywhere);
                })
            }
        };
    });
})();
(function () {


    angular.module("dlFooter", []);
})();

angular.module("dlFooter").run(["$templateCache", function($templateCache) {$templateCache.put("ext-modules/dlFooter/dlFooterTemplate.html","<footer class=\"dl-footer\">\r\n    <div class=\"container dl-footer-callout text-center\">\r\n        <div class=\"dl-footer-text-vertical-center\">\r\n            <h4>Follow {{socialname}} on Social Media</h4>\r\n            <p>\r\n                <a ng-if=\"twitter\" class=\"btn btn-default btn-lg footer-btn\" href=\"//twitter.com/{{twitter}}\"><i class=\"fa fa-twitter\"></i></a>\r\n                <a ng-if=\"facebook\" class=\"btn btn-default btn-lg footer-btn\" href=\"//facebook.com/{{facebook}}\"><i class=\"fa fa-facebook\"></i></a>\r\n                <a ng-if=\"linkedin\" class=\"btn btn-default btn-lg footer-btn\" href=\"//linkedin.com/company/{{linkedin}}\"><i class=\"fa fa-linkedin\"></i></a>\r\n                <a ng-if=\"angellist\" class=\"btn btn-default btn-lg footer-btn\" href=\"//angel.co/{{angellist}}\"><i class=\"fa fa-angellist\"></i></a>\r\n                <a ng-if=\"instagram\" class=\"btn btn-default btn-lg footer-btn\" href=\"//instagram.com/{{instagram}}\"><i class=\"fa fa-instagram\"></i></a>\r\n                <a ng-if=\"bizspark\" class=\"btn btn-default btn-lg footer-btn\" href=\"//www.microsoft.com/bizspark/startup/profile.aspx?startup={{bizspark}}\">BizSpark</a>\r\n            </p>\r\n        </div>\r\n    </div>\r\n    <div class=\"container\">\r\n        <div class=\"dl-footer-callout dl-copyright\">\r\n            <div class=\"dl-footer-text-vertical-center\">\r\n                <h6 class=\"text-center\">\r\n                    Copyright &copy; {{protectedYears}} {{copyright}}. All Rights Reserved.\r\n                </h6>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</footer>");}]);
(function () {


    angular.module("dlFooter").directive("dlFooter", function () {
        return {
            transclude: true,
            scope: {
                socialname: '@',
                copyright: '@',
                protectedYears: '@',
                twitter: '@',
                facebook: '@',
                linkedin: '@',
                instagram: '@',
                angellist: '@',
                bizspark: '@'
            },
            controller: "dlFooterController",
            templateUrl: "ext-modules/dlFooter/dlFooterTemplate.html"
        };
    });
})();
(function () {


    angular.module("dlFooter").controller("dlFooterController",
        ['$scope',
            function ($scope) {

            }
        ]);
})();
(function () {


    angular.module("dlGallery", ["ngAnimate", "ui.bootstrap", "angular-loading-bar", "ngTouch", "bootstrapLightbox"]);
})();

angular.module("dlGallery").run(["$templateCache", function($templateCache) {$templateCache.put("ext-modules/dlGallery/dlGalleryItemTemplate.html","");
$templateCache.put("ext-modules/dlGallery/dlGalleryTemplate.html","<div>\r\n\r\n    <div class=\"btn-group\">\r\n        <span class=\"btn btn-default\">\r\n            <label>\r\n                Any:\r\n                <input ng-model=\"search.$\">\r\n            </label>\r\n        </span>\r\n        <span class=\"btn btn-default\">\r\n            <label>\r\n                Name only\r\n                <input ng-model=\"search.name\">\r\n            </label>\r\n        </span>\r\n        <span class=\"btn btn-default\">\r\n            <label>\r\n                Category only\r\n                <input ng-model=\"search.category\">\r\n            </label>\r\n        </span>\r\n        <span class=\"btn btn-default clearfilter-btn\" ng-click=\"clearFilters()\">clear filter</span>\r\n\r\n    </div>\r\n    <hr />\r\n    <div class=\"gallery-wrapper text-center\" ng-repeat=\"item in items | filter:search:strict\">\r\n        <div class=\"tilt picture\">\r\n            <a class=\"gallery-item\" ng-click=\"openLightboxModal($index)\">\r\n                <img alt=\"item.name\" class=\"grow img-thumbnail\" src=\"{{item.url}}\">\r\n            </a>\r\n        </div>\r\n        <hr />\r\n        <div class=\"btn-group\" role=\"group\" aria-label=\"...\">\r\n            <button type=\"button\" class=\"btn btn-default\" ng-click=\"$parent.search.$ = item.name\">\r\n                <strong>{{item.name}}</strong>\r\n\r\n            </button>\r\n            <button type=\"button\" class=\"btn btn-default\" ng-click=\"$parent.search.$ = item.category\">{{item.category}}</button>\r\n        </div>\r\n    </div>\r\n\r\n</div>");}]);
//(function () {


//    angular.module('dlGallery').directive('dlGalleryItem', function () {
//        return {
//            /*restrict: 'AE',*/
//            require: '^dlGallery',
//            scope: {
//                label: '@',
//                src: '@',
//                alt: '@',
//                crossorigin: '@',
//                height: '@',
//                width: '@',
//                ismap: '@',
//                longdesc: '@',
//                usemap: '@',
//                array: '@'
//            },
//            templateUrl: 'ext-modules/dlGallery/dlGalleryItemTemplate.html',
//            link: function (scope, el, attr, ctrl) {
//                scope.array.toArray() = ctrl.items;
//            }
//        };
//    });

//})();
(function () {


    angular.module('dlGallery').directive('dlGallery', ['$timeout', function ($timeout) {
        return {
            /* restrict: 'AE', */
            scope: {
                theme: '@',
                type: '@',
                sort: '@',
                filter: '@',
                controls: '@',
                masonry: '@',
                columns: '@',
                random: '@',
                title: '@',
                subtitle: '@',
                longdesc: '@',
                items: '='
            },
            transclude: true,
            templateUrl: 'ext-modules/dlGallery/dlGalleryTemplate.html',
            controller: 'dlGalleryController',
            link: function (scope, el, attr) {
            }
        };
    }]);

})();
(function () {


    angular.module('dlGallery').controller('dlGalleryController',
        ['$scope', '$rootScope', 'Lightbox',
            function ($scope, $rootScope, Lightbox) {
                $scope.filters = {};

                $scope.clearFilters = function () {
                    $scope.search.$ = '';
                    $scope.search.name = '';
                    $scope.search.category = '';
                };
                
                //$scope.items = [];

                //$scope.items = [{
                //    name: 'Apple',
                //    category: 'Fruit',
                //    url: '//ununsplash.imgix.net/photo-1434394673726-e8232a5903b4?fit=crop&fm=jpg&h=700&q=75&w=1050'
                //}, {
                //    name: 'Pear',
                //    category: 'Fruit',
                //    url: '//ununsplash.imgix.net/photo-1433833103303-111110aae192?fit=crop&fm=jpg&h=700&q=75&w=1050'
                //}, {
                //    name: 'Almond',
                //    category: 'Nut',
                //    url: '//ununsplash.imgix.net/photo-1433785124354-92116416b870?fit=crop&fm=jpg&h=700&q=75&w=1050'
                //}, {
                //    name: 'Cashew',
                //    category: 'Nut',
                //    url: '//ununsplash.imgix.net/photo-1433424007598-bd5d102e8597?fit=crop&fm=jpg&h=700&q=75&w=1050'
                //}, {
                //    name: 'Mango',
                //    category: 'Fruit',
                //    url: '//ununsplash.imgix.net/photo-1433733071959-30cd185d14a8?fit=crop&fm=jpg&h=700&q=75&w=1050'
                //}, {
                //    name: 'Apple',
                //    category: 'Fruit',
                //    url: '//ununsplash.imgix.net/photo-1434394673726-e8232a5903b4?fit=crop&fm=jpg&h=700&q=75&w=1050'
                //}, {
                //    name: 'Marine',
                //    category: 'Crustacean',
                //    url: '//ununsplash.imgix.net/photo-1433833103303-111110aae192?fit=crop&fm=jpg&h=700&q=75&w=1050'
                //}, {
                //    name: 'Almond',
                //    category: 'Nut',
                //    url: '//ununsplash.imgix.net/photo-1433785124354-92116416b870?fit=crop&fm=jpg&h=700&q=75&w=1050'
                //}, {
                //    name: 'Cashew',
                //    category: 'Maple',
                //    url: '//ununsplash.imgix.net/photo-1433424007598-bd5d102e8597?fit=crop&fm=jpg&h=700&q=75&w=1050'
                //}, {
                //    name: 'Fried',
                //    category: 'Fish',
                //    url: '//ununsplash.imgix.net/photo-1433733071959-30cd185d14a8?fit=crop&fm=jpg&h=700&q=75&w=1050'
                //}];

                $scope.openLightboxModal = function (index) {
                    Lightbox.openModal($scope.items, index);
                };
            }]);



})();
(function () {


    angular.module("dlDashboard", ["gridster", "ui.bootstrap"]);
})();

angular.module("dlDashboard").run(["$templateCache", function($templateCache) {$templateCache.put("ext-modules/dlDashboard/dlDashboardTemplate.html","<div class=\"dl-dashboard-header\">\r\n    <div class=\"dl-dashboard-header-content-wrapper\">\r\n        {{ title }}\r\n        <div class=\"dl-dashboard-controls\">\r\n            <div class=\"dropdown\">\r\n                <button class=\"btn btn-warning textshadow-light-black dropdown-toggle\" type=\"button\" id=\"dl-dashboard-controls-dropdown\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\">\r\n                    <i class=\"fa fa-plus\"></i>\r\n                    Add Widget\r\n                    <span class=\"caret\"></span>\r\n                </button>\r\n                <ul class=\"dropdown-menu pull-right\" role=\"menu\" aria-labelledby=\"dl-dashboard-controls-dropdown\">\r\n                    <li ng-repeat=\"widget in widgetDefinitions\">\r\n                        <a role=\"menuitem\" ng-click=\"addNewWidget(widget)\">{{widget.title}}</a>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div gridster=\"gridsterOpts\">\r\n    <ul>\r\n        <li gridster-item=\"item\" ng-repeat=\"item in widgets\">\r\n            <dl-widget-body></dl-widget-body>\r\n        </li>\r\n    </ul>\r\n</div>");
$templateCache.put("ext-modules/dlDashboard/dlWidgetBodyTemplate.html","<div class=\"dl-widget-body\">\r\n    <div class=\"dl-widget-menu-area btn-group\">\r\n        <a class=\"btn btn-sm btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\" style=\"padding:5px 10px; background: transparent; border: none;\">\r\n            <i class=\"fa fa-bars\" ng-click=\"iconClicked()\" />\r\n        </a>\r\n        <ul class=\"dropdown-menu pull-right\" role=\"menu\">\r\n            <li ng-click=\"close()\"><i class=\"fa fa-2x fa-close\" ng-click=\"iconClicked()\" /></li>\r\n            <li ng-click=\"settings()\"><i class=\"fa fa-2x fa-gear\" ng-click=\"iconClicked()\" /></li>\r\n        </ul>\r\n    </div>\r\n</div>");}]);
(function () {


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
(function () {


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