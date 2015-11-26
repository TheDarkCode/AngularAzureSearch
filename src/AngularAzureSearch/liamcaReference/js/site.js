(function e(t, n, r) { function s(o, u) { if (!n[o]) { if (!t[o]) { var a = typeof require == "function" && require; if (!u && a) return a(o, !0); if (i) return i(o, !0); var f = new Error("Cannot find module '" + o + "'"); throw f.code = "MODULE_NOT_FOUND", f } var l = n[o] = { exports: {} }; t[o][0].call(l.exports, function (e) { var n = t[o][1][e]; return s(n ? n : e) }, l, l.exports, e, t, n, r) } return n[o].exports } var i = typeof require == "function" && require; for (var o = 0; o < r.length; o++) s(r[o]); return s })({
    1: [function (require, module, exports) {
        angular.module('azureSearch', ['ngResource'])
          .constant('searchKey', '')
          .constant('searchService', '')
          .constant('searchVersion', '2015-02-28')
          .constant('dateFormat', 'YYYY-MM-DDTHH:mm:ssZ')

          .factory('groupFilters', function (tokenizeFilters) {
              return function (expression) {
                  return _(tokenizeFilters(expression))
                    .filter(_.isObject)
                    .indexBy(function (d) {
                        return d.name + d.comparison;
                    })
                    .value();
              };
          })

          .factory('tokenizeFilters', function () {
              var SPACE = ' ', EMPTY = '', QUOTE = '\'', BACKSLASH = '\\', OPEN_PAREN = '(', CLOSE_PAREN = ')', AND = 'and', OR = 'or', NOT = 'not'
                , BREAKERS = [SPACE, CLOSE_PAREN]
                , LOGICAL = [AND, OR, NOT]
                , PARENS = [OPEN_PAREN, CLOSE_PAREN]
                , ANY = 'any', FIELD = 'field', COMPARE = 'compare', VALUE = 'value', STRING_VALUE = 'value.string'
                , GEO_INTERSECTS = 'geo.intersects', GEO_INTERSECTS_FIELD = 'geo.intersects.field', GEO_INTERSECTS_POLYGON = 'geo.intersects.polygon', GEO_INTERSECTS_VALUE = 'geo.intersects.polygon.value'
                , GEO_DISTANCE = 'geo.distance', GEO_DISTANCE_FIELD = 'geo.distance.field', GEO_DISTANCE_POINT = 'geo.distance.point', GEO_DISTANCE_VALUE = 'geo.distance.point.value'
              ;

              function tokenizeGeoIntersects(state) {
                  if (state.expect != GEO_INTERSECTS) throw new Error('Invalid state. Expecting ' + state.expect);
                  if (state.buffer != GEO_INTERSECTS) throw new Error('Invalid state. Exepected buffer');

                  var filter = {};
                  filter.operator = GEO_INTERSECTS;
                  filter.type = 'Edm.GeographyPoint';
                  state.expect = GEO_INTERSECTS_FIELD;
                  state.emptyBuffer();
                  state.i++;

                  for (state.i; state.i < state.expression.length; state.i++) {
                      if (state.expect == GEO_INTERSECTS_FIELD && state.char() == ',') {
                          filter.name = state.buffer;
                          state.expect = GEO_INTERSECTS_POLYGON;
                          state.emptyBuffer();
                          state.i++;
                      } else if (state.expect == GEO_INTERSECTS_POLYGON && state.buffer == ' geography\'POLYGON((') {
                          state.expect = GEO_INTERSECTS_VALUE;
                          state.emptyBuffer();
                      } else if (state.expect == GEO_INTERSECTS_VALUE && state.char() == ')') {
                          filter.value = state.buffer;
                          state.emptyBuffer();
                          state.expect = ANY;
                          state.i += 4;
                          if (state.char() == SPACE) {
                              state.i++;
                          } else {
                              state.i--;
                          }
                          return filter;
                      }

                      state.appendBuffer();
                  }
              }

              function tokenizeGeoDistance(state) {
                  if (state.expect != GEO_DISTANCE) throw new Error('Invalid state. Expecting ' + state.expect);
                  if (state.buffer != GEO_DISTANCE) throw new Error('Invalid state. Exepected buffer');

                  var filter = {};
                  filter.operator = GEO_DISTANCE;
                  filter.type = 'Edm.GeographyPoint';
                  state.expect = GEO_DISTANCE_FIELD;
                  state.emptyBuffer();
                  state.i++;

                  for (state.i; state.i < state.expression.length; state.i++) {

                      if (state.expect == GEO_DISTANCE_FIELD && state.char() == ',') {
                          filter.name = state.buffer;
                          state.expect = GEO_DISTANCE_POINT;
                          state.emptyBuffer();
                          state.i++;
                      } else if (state.expect == GEO_DISTANCE_POINT && state.buffer == ' geography\'POINT(') {
                          state.expect = GEO_DISTANCE_VALUE;
                          state.emptyBuffer();
                      } else if (state.expect == GEO_DISTANCE_VALUE && state.char() == ')') {
                          filter.point = state.buffer;
                          state.emptyBuffer();
                          state.expect = GEO_DISTANCE_POINT;
                      } else if (state.expect == GEO_DISTANCE_POINT && state.buffer == ')\') ') {
                          state.emptyBuffer();
                          state.expect = COMPARE;
                          filter.comparison = tokenizeComparison(state);
                          var value = tokenizeValue(state);
                          filter.value = value.value;
                          return filter;
                      }

                      state.appendBuffer();
                  }
              }

              function tokenizeFilter(state) {
                  if (state.expect != FIELD) throw new Error('Invalid state. Expecting ' + state.expect);
                  if (state.char() != SPACE) throw new Error('Invalid state. Expected [space] character');
                  if (!state.buffer.length) throw new Error('Invalid state. Exepected non-empty buffer');

                  var filter = {};
                  filter.name = state.buffer;
                  state.emptyBuffer();

                  state.expect = COMPARE;
                  state.i++; // consume space character
                  filter.comparison = tokenizeComparison(state);

                  var value = tokenizeValue(state);
                  filter.value = value.value;
                  filter.type = value.type;

                  return filter;
              }

              function tokenizeComparison(state) {
                  if (state.expect != COMPARE) throw new Error('Invalid state. Expecting ' + state.expect);
                  if (state.buffer.length) throw new Error('Invalid state. Exepected empty buffer');

                  for (state.i; state.i < state.expression.length; state.i++) {
                      if (state.expect == COMPARE && state.char() == SPACE && state.buffer.length) {
                          var comparison = state.buffer;
                          state.emptyBuffer();
                          state.expect = VALUE;
                          state.i++; // consume space character
                          return comparison;
                      }
                      state.appendBuffer();
                  }
              }

              function tokenizeValue(state) {
                  if (state.expect != VALUE) throw new Error('Invalid state. Expecting ' + state.expect);
                  var token = {};
                  for (state.i; state.i < state.expression.length; state.i++) {


                      if (state.expect == VALUE && state.char() == QUOTE) {
                          state.expect = STRING_VALUE;
                      } else if (state.expect == STRING_VALUE && state.char() == QUOTE && state.prevChar() != BACKSLASH) {
                          if (state.nextChar() == SPACE) {
                              state.i++;
                          }
                          break;
                      } else if (state.expect == VALUE && BREAKERS.indexOf(state.char()) != -1) {
                          if (state.char() != SPACE) {
                              state.i--;
                          }
                          break;
                      } else {
                          state.appendBuffer();
                      }
                  }

                  token.value = state.buffer;
                  tokenType(token);
                  state.emptyBuffer();
                  state.expect = ANY;
                  return token;

                  function tokenType(token) {
                      if (state.expect == STRING_VALUE) {
                          token.type = 'Edm.String';
                      } else {
                          var int = parseInt(token.value);
                          if (_.isNumber(int)) {
                              var float = parseFloat(token.value);
                              if (int == float) {
                                  token.value = int;
                                  token.type = 'Edm.Int32';
                              } else {
                                  token.value = float;
                                  token.type = 'Edm.Double';
                              }
                          }
                      }
                  }
              }

              return function (expression) {
                  var state = { i: 0, expression: expression, expect: ANY, buffer: EMPTY }
                    , tokens = [];

                  if (!expression) {
                      return tokens;
                  }

                  state.char = function () {
                      return state.expression[state.i];
                  };
                  state.prevChar = function () {
                      return state.expression[state.i - 1];
                  };
                  state.nextChar = function () {
                      return state.expression[state.i + 1];
                  };
                  state.appendBuffer = function () {
                      state.buffer += state.char();
                  };
                  state.emptyBuffer = function () {
                      state.buffer = EMPTY;
                  };



                  for (state.i; state.i < state.expression.length; state.i++) {

                      // token: geo.intersects filter
                      if (state.expect == ANY && state.buffer == GEO_INTERSECTS) {
                          state.expect = GEO_INTERSECTS;
                          tokens.push(tokenizeGeoIntersects(state));

                          // token: geo.distance filter
                      } else if (state.expect == ANY && state.buffer == GEO_DISTANCE) {
                          state.expect = GEO_DISTANCE;
                          tokens.push(tokenizeGeoDistance(state));

                          // token: logical operator
                      } else if (state.expect == ANY && state.char() == SPACE && LOGICAL.indexOf(state.buffer) != -1) {
                          tokens.push(state.buffer);
                          state.emptyBuffer();
                          continue;

                          // token: parens
                      } else if (state.expect == ANY && PARENS.indexOf(state.char()) != -1) {
                          tokens.push(state.char());
                          state.emptyBuffer();
                          if (state.nextChar() == SPACE) {
                              state.i++;
                          }
                          continue;

                          // token filter
                      } else if (state.expect == ANY && state.char() == SPACE && state.buffer.length) {
                          state.expect = FIELD;
                          tokens.push(tokenizeFilter(state));
                          continue;
                      }

                      state.appendBuffer();
                  }

                  return tokens;
              };
          })

          .factory('parseFilter', function () {
              return function (expression) {
                  if (!expression) return {};
                  return _(expression.split(' and '))
                    .indexBy(function (d) {
                        return d.split(' ').slice(0, 2).join('');
                    })
                    .mapValues(parseFilter)
                    .value();
              };

              function parseFilter(text) {
                  var parts = text.split(' ')
                    , value = parts.slice(2).join(' ')
                    , isString = _.startsWith(value, "'")
                    , type = isString ? 'Edm.String' : 'Edm.Double';

                  if (isString) {
                      value = value.substr(1, value.length - 2);
                  } else {
                      value = parseFloat(value);
                  }

                  return { name: parts[0], comparison: parts[1], value: value, type: type };
              }
          })

          .factory('search', function ($resource, searchService, searchKey, searchVersion) {
              var url = 'https://' + searchService + '.search.windows.net/indexes/:index/docs'
                , defaults = { 'api-version': searchVersion, 'api-key': searchKey }
                , search = $resource(url, defaults);
              return function (index, params) {
                  if (!index) throw new Error('Index not set');
                  params = params || {};
                  params.index = index;
                  return search.get(params);
              };
          })

          .factory('suggest', function ($resource, searchService, searchKey, searchVersion) {
              var url = 'https://' + searchService + '.search.windows.net/indexes/:index/docs/suggest'
                , defaults = { 'api-version': searchVersion, 'api-key': searchKey }
                , suggest = $resource(url, defaults);
              return function (index, params) {
                  if (!index) throw new Error('Index not set');
                  params = params || {};
                  params.index = index;
                  return suggest.get(params);
              };
          })

          // return a filtered URL for the specified facet    
          .factory('facetUrl', function ($location, filterFacet) {
              return function (field, facet, type, queryParam) { // TODO factory
                  var urlParams = angular.copy($location.search())
                      , path = $location.path();

                  queryParam = queryParam || 'filter';
                  urlParams[queryParam] = urlParams[queryParam] ? urlParams[queryParam] + ' and ' : '';
                  urlParams[queryParam] += filterFacet({
                      field: field,
                      from: facet.from,
                      to: facet.to,
                      value: facet.value,
                      type: type
                  });
                  return '#' + path + '?' + $.param(urlParams, true);
              };
          })

          // return a filtered URL for the specified field
          .factory('filterUrl', function ($location, formatFilter) {
              return function (field, fieldType, comparison, value) { // TODO factory
                  var urlParams = angular.copy($location.search())
                            , path = $location.path();

                  urlParams.filter = urlParams.filter ? urlParams.filter + ' and ' : '';
                  urlParams.filter += formatFilter({
                      name: field,
                      type: fieldType,
                      comparison: comparison,
                      value: value
                  });

                  return '#' + path + '?' + $.param(urlParams, true);
              };
          })

          .factory('filterFacet', function (formatFilter, dateFormat) {

              function calcInterval(value, interval) {
                  throw 'Date not implemented';
                  var float = parseFloat(interval);
                  if (float) {
                      return parseFloat(value) + float;
                  }

                  var date = moment(value, dateFormat);

                  return date.add(1, interval).format(dateFormat);
              }

              return function (params) {

                  // values to
                  if (params.to && !params.from) {
                      return formatFilter({
                          name: params.field,
                          type: params.type,
                          value: params.to,
                          comparison: 'lt'
                      });

                      // values to+from
                  } else if (params.to && params.from) {
                      return formatFilter({
                          name: params.field,
                          type: params.type,
                          value: params.from,
                          comparison: 'ge'
                      }) + ' and ' + formatFilter({
                          name: params.field,
                          type: params.type,
                          value: params.to,
                          comparison: 'lt'
                      });

                      // values from
                  } else if (!params.to && params.from) {
                      return formatFilter({
                          name: params.field,
                          type: params.type,
                          value: params.from,
                          comparison: 'ge'
                      });

                      // interval
                  } else if (params.interval) {
                      var intervalValue = calcInterval(params.value, params.interval);
                      return formatFilter({
                          name: params.field,
                          type: params.type,
                          value: params.value,
                          comparison: 'ge'
                      }) + ' and ' + formatFilter({
                          name: params.field,
                          type: params.type,
                          value: intervalValue,
                          comparison: 'lt'
                      });

                      // basic equality
                  } else {
                      return formatFilter({
                          name: params.field,
                          type: params.type,
                          value: params.value
                      });
                  }
              };
          })

          .factory('formatFilter', function () {
              function value(fieldType, val) {
                  if (fieldType == 'Edm.String') {
                      if (val.toString().indexOf("'") !== 0) val = "'" + val;
                      if (val.toString().lastIndexOf("'") != val.length - 1) val += "'";
                      return val;
                  } else if (fieldType.indexOf('Edm.Int') === 0) {
                      return parseInt(val) || 0;
                  } else if (fieldType == 'Edm.Double') {
                      return parseFloat(val);
                  } else if (fieldType == 'Edm.Boolean') {
                      if (angular.isString(val)) {
                          return val.toLowerCase() == 'true';
                      } else if (val === true || val === false) {
                          return val;
                      } else {
                          return !!val;
                      }
                  } else {
                      return val;
                  }
              }
              function lambda(field, exp, val) {
                  exp = exp || '/any eq'; // TODO
                  var parts = exp.split(' ')
                      , fieldType = 'Edm.String';
                  return field + parts[0] + '(x:x ' + parts[1] + ' ' + value(fieldType, val) + ')';
              }
              function geoDistance(field, point, comparison, val) {
                  return 'geo.distance(' + field + ', geography\'POINT(' + point + ')\')' + ' ' + comparison + ' ' + value('Edm.Double', val);
              }
              function geoIntersects(field, points) {
                  return 'geo.intersects(' + field + ', geography\'POLYGON((' + points + '))\')';
              }

              return function (params) { // type, name, comparison, value [,point, operator]
                  if (params.type.indexOf('Collection(') === 0) {
                      return lambda(params.name, params.comparison, params.value);
                  } else if (params.type == 'Edm.GeographyPoint') {
                      if (params.operator == 'geo.distance') {
                          return geoDistance(params.name, params.point, params.comparison, params.value);
                      } else if (params.operator == 'geo.intersects') {
                          return geoIntersects(params.name, params.value);
                      }
                  } else {
                      params.comparison = params.comparison || 'eq';
                      return params.name + ' ' + params.comparison + ' ' + value(params.type, params.value);
                  }
              };
          });
    }, {}], 2: [function (require, module, exports) {
        angular.module('html', [])
          .directive('anchorBottom', function () {
              return {
                  restrict: 'A',
                  priority: 999,
                  scope: {},
                  link: function (scope, element, attr) {
                      function resize() {
                          element.height($(window).height() - element.parent().position().top);
                          element.show();
                      }

                      element.css({
                          width: '100%',
                          position: 'fixed',
                          bottom: 0,
                          display: 'none'
                      });

                      $(window).on('resize', resize);
                      setTimeout(resize, 200);
                  }
              };
          });
    }, {}], 3: [function (require, module, exports) {
        angular.module('mapping', [])
          .directive('map', function () {
              return {
                  restrict: 'A',
                  scope: {
                      'ready': '&'
                  },
                  link: function (scope, element, attr) {
                      element.height(500);
                      var map = new Microsoft.Maps.Map(element.get(0), {
                          // Credentials for Bing Map
                          credentials: 'ApY6ryzQcES0Kh7L3NaWvIgDsR1yXr5ACW5MvO5aYV1hTYYqD0vVMu1gs07wwfFd',
                          showDashboard: false,
                          showCopyright: false,
                          showScalebar: false,
                          enableSearchLogo: false,
                          enableClickableLogo: false,
                          mapTypeId: Microsoft.Maps.MapTypeId.birdseye,
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

          .factory('currentLocation', function ($q) {
              return function () {
                  var deferred = $q.defer();
                  window.navigator.geolocation.getCurrentPosition(deferred.resolve, deferred.reject);
                  return deferred.promise;
              };
          })

          .factory('bestView', function () {
              return function (locations) {
                  var length = _.uniq(locations, false, function (d) {
                      return d.latitude + ',' + d.longitude;
                  }).length;

                  if (length == 1) {
                      return { center: locations[0], zoom: 11 };
                  } else if (length > 1) {
                      return { bounds: Microsoft.Maps.LocationRect.fromLocations(locations) };
                  } else {
                      return {};
                  }
              };
          })

          .factory('searchBounds', function () {
              return function (bounds) {
                  var e = bounds.getEast()
                    , w = bounds.getWest()
                    , n = bounds.getNorth()
                    , s = bounds.getSouth();

                  return [[s, e], [n, e], [n, w], [s, w], [s, e]];
              };
          })

          .factory('drawPolygon', function ($rootScope) {
              var Maps = Microsoft.Maps
                , handlers = [];

              function removeListeners() {
                  handlers.forEach(function (d) {
                      Maps.Events.removeHandler(d);
                  });
                  handlers.length = 0;
              }

              return function (map, callback) {
                  var polygon = new Maps.Polygon([], { fillColor: new Maps.Color(100, 204, 204, 204), strokeColor: new Maps.Color(200, 142, 40, 0), strokeThickness: 1 })
                    , line = new Maps.Polyline([], { strokeColor: new Maps.Color(200, 142, 40, 0), strokeThickness: 1, strokeDashArray: '5 2' })
                    , cursor = $('.MicrosoftMap').css('cursor');

                  removeListeners();
                  line.setLocations([]);
                  line.setOptions({ visible: true });
                  polygon.setLocations([]);
                  map.entities.clear();
                  map.entities.push(polygon);
                  map.entities.push(line);

                  handlers.push(Maps.Events.addHandler(map, 'mousedown', mapMouseDown));
                  handlers.push(Maps.Events.addHandler(map, 'mousemove', mapMouseMove));
                  handlers.push(Maps.Events.addHandler(map, 'mouseup', mapMouseUp));
                  handlers.push(Maps.Events.addHandler(map, 'dblclick', mapDblClick));
                  handlers.push(Maps.Events.addHandler(map, 'keyup', mapKeyUp));

                  function mapMouseDown(e) {
                      if (!e.handled && e.targetType == 'map') {
                          $('.MicrosoftMap').css('cursor', 'crosshair');
                          var point = new Maps.Point(e.getX() - 2, e.getY() - 2)
                            , loc = e.target.tryPixelToLocation(point)
                            , locs = polygon.getLocations() || [];
                          locs.push(loc);
                          polygon.setLocations(locs);
                          e.handled = true;
                      }
                  }

                  function mapMouseMove(e) {
                      if (!e.handled && e.targetType == 'map') {
                          $('.MicrosoftMap').css('cursor', 'crosshair');
                          var point = new Maps.Point(e.getX() - 2, e.getY() - 2)
                            , loc = e.target.tryPixelToLocation(point)
                            , locs = polygon.getLocations() || [];
                          if (locs.length) {
                              line.setLocations([locs[locs.length - 1], loc]);
                          }
                          e.handled = true;
                      }
                  }
                  function mapMouseUp(e) {
                      if (!e.handled && e.targetType == 'map') {
                          e.handled = true;
                      }
                  }
                  function mapDblClick(e) {
                      completePolygon();
                      e.handled = true;
                  }
                  function mapKeyUp(e) {
                      if (e.keyCode == 27) { // ESC
                          polygon.setLocations([]);
                          line.setLocations([]);
                          removeListeners();
                          $('.MicrosoftMap').css('cursor', cursor);
                          $rootScope.$apply(function () {
                              callback(null);
                          });
                      } else if (e.keyCode == 13) { // ENTER
                          completePolygon();
                      }
                  }
                  function completePolygon() {
                      $('.MicrosoftMap').css('cursor', cursor);
                      var locs = polygon.getLocations();
                      locs.push(locs[0]);
                      polygon.setLocations(locs);
                      line.setOptions({ visible: false });
                      removeListeners();
                      $rootScope.$apply(function () {
                          callback(polygon.getLocations().map(function (d) {
                              return [d.latitude, d.longitude];
                          }));
                      });
                  }
              };
          });
    }, {}], 4: [function (require, module, exports) {
        angular.module('media', [])
          .factory('timespan', function () {
              return function (span) {
                  var parts = span.split(':')
                    , hours = parseInt(parts[0])
                    , minutes = parseInt(parts[1])
                    , seconds = parseFloat(parts[2]);
                  return hours * 3600 + minutes * 60 + seconds;
              };
          })

          .directive('ngPoster', function () {
              return {
                  priority: 99,
                  link: function (scope, element, attr) {
                      attr.$observe('ngPoster', function (value) {
                          attr.$set('poster', value);
                      });
                  }
              };
          });
    }, {}], 5: [function (require, module, exports) {
        angular.module('userInput', [])
          .factory('cancelInput', function ($rootScope) {
              var count = 0;
              return function (clickCancel, keyCancel) {
                  var id = count++;
                  keyCancel = keyCancel || clickCancel;
                  $(window).on('click.' + id, function () {
                      $rootScope.$apply(clickCancel);
                  }).on('keyup.' + id, function (e) {
                      $rootScope.$apply(function () {
                          keyCancel(e.keyCode);
                      });
                  });

                  function off() {
                      $(window).off('click.' + id).off('keyup.' + id);
                  }

                  return off;
              };
          });
    }, {}], 6: [function (require, module, exports) {
        require('../../temp/templates');
        require('./lib/azure-search');
        require('./route/index-ctrl');
        require('./route/homes-ctrl');
        require('./route/video-ctrl');
        require('./route/adventure-works-ctrl');

        angular.module('myApp', ['ngRoute', 'azureSearch', 'templates', 'homesCtrl', 'videoCtrl', 'indexCtrl', 'adventureWorksCtrl'])

          /**
           * Configuration
           */
            .config(function ($routeProvider) {
                $routeProvider.otherwise({
                    redirectTo: '/'
                });
            });
    }, { "../../temp/templates": 11, "./lib/azure-search": 1, "./route/adventure-works-ctrl": 7, "./route/homes-ctrl": 8, "./route/index-ctrl": 9, "./route/video-ctrl": 10 }], 7: [function (require, module, exports) {
        angular.module('adventureWorksCtrl', [])
          .controller('adventureWorksRoute', function ($scope, $location, $filter, $route, search, suggest, taxonomy, searchTaxonomy, facetUrl) {
              $scope.query = $location.search();
              $scope.taxonomy = searchTaxonomy('adventureworks', 'taxonomy');
              $scope.search = function () {
                  delete $scope.query.f;
                  $location.search($scope.query);
              };
              $scope.facetVis = {};
              $scope.facets = {
                  colors: { label: 'Color', type: 'Collection(Edm.String)' },
                  sizes: { label: 'Size', type: 'Collection(Edm.String)' },
                  minListPrice: { label: 'Price', type: 'Edm.Double' },
                  minWeight: { label: 'Weight', type: 'Edm.Double' },
              };
              $scope.facetUrl = facetUrl;
              $scope.maxFacets = 5;

              $scope.facetLabel = function (field, value) {
                  if (field == 'minListPrice') {
                      return $filter('dollars')(value);
                  } else {
                      return value;
                  }
              };

              $scope.facetsWithCount = function (value, index, array) {
                  return value.count;
              };

              $scope.$on('$routeUpdate', function (event, current) {
                  if (current.params.t) {
                      current.params.f = current.params.t;
                      delete current.params.q;
                      delete current.params.t;
                      $location.search(current.params).replace();
                      return;
                  }
                  $scope.query = current.params;
                  executeQuery();
              });

              $scope.reset = function () {
                  delete $scope.result;
                  $location.search({});
              };

              executeQuery();

              function executeQuery() {
                  if (angular.isDefined($scope.query.q) || angular.isDefined($scope.query.f)) {
                      $scope.loading = true;
                      var result = search('adventureworks', {
                          search: $scope.query.q,
                          searchMode: 'all',
                          $filter: $scope.query.f,
                          $count: true,
                          facet: [
                            'taxonomy,count:100,sort:value',
                            'colors',
                            'sizes,sort:-value,count:100',
                            'minListPrice,values:25|50|100|250|500|1000|2000',
                            'minWeight,values:5|10|100|500|1000|5000'
                          ]
                      });
                      result.$promise.then(function () {
                          $scope.result = result;
                          $scope.result.categories = taxonomy($scope.result);
                      }).finally(function () {
                          $scope.loading = false;
                      });
                  } else {
                      delete $scope.result;
                  }
              }
          })

          .factory('taxonomy', function () {
              return function (results, field, separator) {
                  var sum = 0, categories = { children: {}, length: 0 };
                  separator = separator || '|';
                  field = field || 'taxonomy';
                  results['@search.facets'][field].forEach(function (d) {
                      var node = categories;
                      var parts = d.value.split(separator);
                      sum += d.count;
                      parts.forEach(function (c, i) {
                          if (!_(node.children).has(c)) {
                              node.children[c] = { count: d.count, children: {}, length: 0, filter: parts.slice(0, i + 1).join(separator) };
                              node.length++;
                          }
                          node = node.children[c];
                      });
                  });
                  categories.count = sum;
                  return categories;
              };
          })

          .factory('searchTaxonomy', function (search, taxonomy) {
              return function (index, field) {
                  var result = search(index, {
                      $top: 0,
                      facet: field + ',count:100,sort:value'
                  });
                  result.$promise = result.$promise.then(function (resp) {
                      resp.taxonomy = taxonomy(resp, field);
                      return resp;
                  });
                  return result;
              };
          })

          /**
           * Configuration
           */
            .config(function ($routeProvider) {
                $routeProvider.when('/adventure-works', {
                    controller: 'adventureWorksRoute',
                    templateUrl: 'views/advenure-works.html',
                    reloadOnSearch: false
                });
            });
    }, {}], 8: [function (require, module, exports) {
        require('../lib/mapping');
        require('../lib/html');
        require('../lib/user-input');

        angular.module('homesCtrl', ['mapping', 'html', 'userInput'])

          .filter('dollars', function ($filter) {
              return function (value, precision) {
                  return $filter('currency')(value, '$', precision || 0);
              };
          })

          /**
           * Controller for each home in list
           */
          .controller('homeRepeater', function ($scope) {
              $scope.focusResult = function () {
                  $scope.setFocusResult($scope.doc, true);
              };
              $scope.resultMouseIn = function () {
                  $scope.doc['@map.pin'].html.addClass('hover-pin');
              };
              $scope.resultMouseOut = function () {
                  $scope.doc['@map.pin'].html.removeClass('hover-pin');
              };

          })

          /**
           * Controller for home search form
           */
          .controller('homeSearchForm', function ($scope, $location, $window, suggest, cancelInput) {
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

                  var suggestResult = suggest('places', {
                      search: $scope.model.query.q,
                      $select: 'city,state,zip,count',
                      $orderby: 'count desc',
                      suggesterName: 'places',
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
          })

          /**
           * Controller for homes map
           */
          .controller('homesMap', function ($scope, $location, searchBounds, formatFilter, drawPolygon, currentLocation) {

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
          })

          /**
           * Controller for home details
           */
          .controller('homeDetail', function ($scope) {

              // advance detail document image preview
              $scope.nextImage = function () {
                  if ($scope.model.detail['@image'] == $scope.model.detail.imageUrls.length - 1) {
                      $scope.model.detail['@image'] = 0;
                  } else {
                      $scope.model.detail['@image']++;
                  }
              };
          })

          /**
           * Controller for sorting results
           */
          .controller('homeSort', function ($scope, $location) {

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
          })

          /**
           * Controller for home facets
           */
          .controller('homeFacets', function ($scope, $location, $filter, facetUrl, formatFilter) {

              // format facet field name
              $scope.fieldLabel = function (text) {
                  return _.startCase(text);
              };

              // format facet value
              $scope.facetLabel = function (field, value) {
                  if (field == 'pricePerSqft') {
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
          })

          /**
           * Controller for main homes route
           */
          .controller('homesRoute', function ($scope, $location, $sce, currentLocation, search, bestView, groupFilters) {

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
          })

          /**
           * Homes Configuration
           */
            .config(function ($routeProvider) {
                $routeProvider.when('/homes', {
                    controller: 'homesRoute',
                    templateUrl: 'views/homes.html',
                    reloadOnSearch: false
                });
            });
    }, { "../lib/html": 2, "../lib/mapping": 3, "../lib/user-input": 5 }], 9: [function (require, module, exports) {
        angular.module('indexCtrl', [])
          .controller('indexRoute', function () {

          })

          /**
           * Homes Configuration
           */
            .config(function ($routeProvider) {
                $routeProvider.when('/', {
                    controller: 'indexRoute',
                    templateUrl: 'views/index.html'
                });
            });

    }, {}], 10: [function (require, module, exports) {
        require('../lib/azure-search');
        require('../lib/media');

        angular.module('videoCtrl', ['media'])


          /**
           * Route controller: /video
           */
            .controller('videoRoute', function ($scope, $location, $sce, search, timespan, formatFilter) {
                $scope.query = $location.search();
                $scope.search = function () {
                    $location.search($scope.query);
                };
                $scope.html = function (text) {
                    return $sce.trustAsHtml(text);
                };
                $scope.url = function (text) {
                    return $sce.trustAsResourceUrl(text);
                };
                $scope.parseCaption = function (text) {
                    var parts = text.split('|');
                    return { start: parts[0], end: parts[1], text: parts[2] };
                };
                $scope.play = function (id, start) {
                    var video = $(id).get(0);
                    video.currentTime = timespan(start);
                    video.play();
                };
                $scope.filterUrl = function (field, fieldType, comparison, value) { // TODO factory
                    var urlParams = angular.copy($location.search())
                              , path = $location.path();

                    urlParams.filter = urlParams.filter ? urlParams.filter + ' and ' : '';
                    urlParams.filter += formatFilter({
                        name: field,
                        type: fieldType,
                        comparison: comparison,
                        value: value
                    });

                    return '#' + path + '?' + $.param(urlParams, true);
                };

                if (angular.isDefined($scope.query.q)) {
                    $scope.result = search('channel9', {
                        search: $scope.query.q,
                        highlight: 'title,description,content',
                        $filter: $scope.query.filter
                    });
                }
            })

          /**
           * Configuration
           */
            .config(function ($routeProvider) {
                $routeProvider.when('/video', {
                    controller: 'videoRoute',
                    templateUrl: 'views/video.html'
                }).otherwise({
                    redirectTo: '/video'
                });
            });
    }, { "../lib/azure-search": 1, "../lib/media": 4 }], 11: [function (require, module, exports) {
        angular.module("templates", []).run(["$templateCache", function ($templateCache) {
            $templateCache.put("views/homes.html", "<div class=\"container\">\r\n  <h1>Azure Search - Geospatial Demo</h1>\r\n  <p>A search index demonstrating <a href=\"https://azure.microsoft.com/en-us/services/search/\">Azure Search</a> and <a href=\"https://msdn.microsoft.com/en-us/library/dd877180.aspx\">Bing Maps</a> integration.</p>\r\n  \r\n  <form ng-submit=\"search()\" ng-controller=\"homeSearchForm\">\r\n    <div class=\"input-group\">\r\n  		<input type=\"text\" class=\"form-control\" ng-model=\"model.query.q\" placeholder=\"e.g. boston or seattle or back bay\" ng-model-options=\"{debounce:{\'default\':100, \'blur\':0}}\" ng-change=\"suggest()\" ng-click=\"searchInputClicked($event)\" ng-disabled=\"loading\">\r\n  		<div class=\"input-group-btn\">\r\n  			<button type=\"submit\" class=\"btn btn-default\" title=\"search\" ng-disabled=\"loading\"><span class=\"glyphicon glyphicon-search\"></span></button>\r\n        <button ng-if=\"model.query.filter || model.query.order\" type=\"button\" class=\"btn btn-link\" ng-click=\"resetFilter()\" title=\"reset filters\" ng-disabled=\"loading\">reset</button>\r\n  		</div>\r\n  	</div>\r\n    <div style=\"position:fixed;z-index:9999;left:0;right:0;\" ng-if=\"suggestResult.$resolved\">\r\n      <div class=\"container\">\r\n        <ul class=\"list-group\" style=\"background:white;margin-top:-1px;\">\r\n          <li class=\"list-group-item\" ng-repeat=\"doc in suggestResult.value\" ng-click=\"clickSuggest($event, doc[\'@search.text\'])\">\r\n            <a href=\"\" ng-bind-html=\"html(doc[\'@search.text\'])\"></a>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </form>\r\n</div>\r\n  \r\n<hr>\r\n\r\n<div>\r\n  <div anchor-bottom>\r\n    <div class=\"row\" style=\"height:100%\">\r\n      \r\n      <!-- map column -->\r\n      <div class=\"col-xs-6 col-sm-5\" style=\"height:100%\" ng-controller=\"homesMap\">\r\n        <div style=\"position:relative;z-index:100;padding:20px;\">\r\n          <div class=\"btn-group\">\r\n            <button type=\"button\" class=\"btn btn-default btn-small\" ng-click=\"currentLocation()\">current location</button>\r\n            <button type=\"button\" class=\"btn btn-default btn-small\" ng-click=\"drawPolygon()\">draw shape</button>\r\n            <button type=\"button\" class=\"btn btn-default btn-small\" ng-click=\"searchMapArea()\">search map</button>\r\n          </div>\r\n        </div>\r\n        <p ng-if=\"drawing\" style=\"top:0;background:white;position:relative;z-index:100;margin-right:-15px;padding:5px 20px;\">\r\n          <kbd>double-click</kbd> or <kbd>enter</kbd> to end. <kbd>ESC</kbd> to cancel.\r\n        </p>\r\n        <div id=\"map\" map ready=\"mapReady(map)\"></div>\r\n      </div>\r\n      \r\n      <!-- loading -->\r\n      <div class=\"col-xs-6 col-sm-7\" ng-if=\"!result.$resolved\" style=\"height:100%;\">\r\n        <div class=\"text-center\" style=\"font-size:32px;padding-top:100px;color:#ccc;border:1px solid #eee;height:100%;\">\r\n          Loading\r\n        </div>\r\n      </div>\r\n      \r\n      <!-- result column -->\r\n      <div class=\"col-sm-4\" style=\"height:100%;\" ng-if=\"result.$resolved\">\r\n        \r\n        <!-- result detail -->\r\n        <div id=\"result-detail\" ng-if=\"model.detail\" ng-controller=\"homeDetail\">\r\n          <img ng-src=\"{{model.detail.imageUrls[model.detail[\'@image\']]}}\" style=\"border:1px solid #ccc;height:100%;width:auto;float:left;margin-right:4px;max-width:120px;\" ng-click=\"nextImage()\">\r\n          <p>\r\n            <b>{{model.detail.street}}</b> <small>&bull; {{model.detail.city}}, {{model.detail.state}} {{model.detail.zip}}</small>\r\n            <small>\r\n              <br>{{model.detail.dom}} <ng-pluralize count=\"model.detail.dom\" when=\"{1:\'day\', other:\'days\'}\"></ng-pluralize> on market\r\n              <span class=\"text-muted\">\r\n                <span ng-if=\"model.detail.propertyType\">&bull; {{model.detail.propertyType}}</span>\r\n                <span ng-if=\"model.detail.propertyType && model.detail.yearBuilt\">&bull;</span>\r\n                <span ng-if=\"model.detail.yearBuilt\">built {{model.detail.yearBuilt}}</span>\r\n              </span>\r\n              \r\n              <br>\r\n              <span ng-if=\"model.detail.pricePerSqft\">{{model.detail.pricePerSqft|dollars}} / sqft.</span>\r\n              <span ng-if=\"model.detail.lotsize\" class=\"text-muted\">&bull; lot size {{model.detail.lotsize|number}} sqft.</span>\r\n              <span ng-if=\"model.detail.hoa\"><br><abbr title=\"Home Owners\' Association\">HOA</abbr> {{model.detail.hoa|dollars}}</span>\r\n            </small>\r\n          </p>\r\n          <div style=\"clear;left;\"></div>\r\n        </div>\r\n        \r\n        <!-- result sorting -->\r\n        <div class=\"small\" style=\"margin-bottom:6px;\" ng-controller=\"homeSort\">\r\n          \r\n          <div class=\"pull-right\">\r\n            <span class=\"text-muted\">sort by</span> \r\n            <span class=\"dropdown\">\r\n              <a href=\"\" data-toggle=\"dropdown\" style=\"padding-right:2px;\">{{orderBy.label}}</a>\r\n              <ul class=\"dropdown-menu\" style=\"right:0;left:auto;\">\r\n                <li ng-repeat=\"(field, label) in orderFields\">\r\n                  <a ng-href=\"{{orderUrl(field)}}\">{{label}}</a>\r\n                </li>\r\n              </ul>\r\n            </span>\r\n            <a href=\"{{toggleDirUrl()}}\" style=\"font-size:8px;\">\r\n              <span ng-if=\"orderDir==\'asc\'\" class=\"glyphicon glyphicon-triangle-top\" title=\"ascending (low to high)\"></span>\r\n              <span ng-if=\"orderDir==\'desc\'\" class=\"glyphicon glyphicon-triangle-bottom\" title=\"descending (high to low)\"></span>\r\n            </a>\r\n          </div>\r\n          <div class=\"text-muted\">\r\n            1 - {{result.value.length}} of {{result[\'@odata.count\']}} results\r\n          </div>\r\n        </div>\r\n       \r\n        \r\n        <!-- result list -->\r\n        <ul id=\"result-list\" class=\"list-group\">\r\n          <li class=\"list-group-item\" ng-repeat=\"doc in result.value\" ng-click=\"focusResult($event)\" ng-mouseover=\"resultMouseIn($event)\" ng-mouseleave=\"resultMouseOut($event)\" ng-controller=\"homeRepeater\" ng-class=\"{\'is-detail\':doc[\'@active\']}\">\r\n            <h5>\r\n              <a href=\"\">{{doc.street}}</a>\r\n              <small style=\"padding-left:1em;\">{{doc.city}}<span ng-if=\"doc.city!=doc.neighborhood\"> ({{doc.neighborhood}})</span></small>\r\n            </h5>\r\n            <p class=\"small\">\r\n              <b style=\"padding-right:4px;\">{{doc.price|dollars}}</b>\r\n              <span class=\"text-muted\">\r\n                {{doc.sqft|number}} sqft. &bull;\r\n                {{doc.beds|number}} beds\r\n                <span ng-if=\"doc.baths\"> &bull; {{doc.baths|number}} bath</span>\r\n              </span>\r\n            </p>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      \r\n      <!-- facet column -->\r\n      <div class=\"col-sm-3\" style=\"height:100%;overflow:auto;\" ng-controller=\"homeFacets\">\r\n        <ul class=\"list-unstyled facets\" ng-if=\"result && result.$resolved\">\r\n          <li>\r\n            <h4>Price</h4>\r\n            <form class=\"form-inline inline2\">\r\n              <select class=\"form-control input-sm\" ng-model=\"filter.price.min\" ng-options=\"x|dollars for x in buckets.price\" ng-change=\"applyFilter()\">\r\n                <option value=\"\">no min</option>\r\n              </select> -\r\n              <select class=\"form-control input-sm\" ng-model=\"filter.price.max\" ng-options=\"x|dollars for x in buckets.price\" ng-change=\"applyFilter()\">\r\n                <option value=\"\">no max</option>\r\n              </select>\r\n            </form>\r\n          </li>\r\n          <li>\r\n            <h4>Beds</h4>\r\n            <form class=\"form-inline inline2\">\r\n              <select class=\"form-control input-sm\" ng-model=\"filter.beds.min\" ng-options=\"x|number for x in buckets.beds\" ng-change=\"applyFilter()\">\r\n                <option value=\"\">no min</option>\r\n              </select> -\r\n              <select class=\"form-control input-sm\" ng-model=\"filter.beds.max\" ng-options=\"x|number for x in buckets.beds\" ng-change=\"applyFilter()\">\r\n                <option value=\"\">no max</option>\r\n              </select>\r\n            </form>\r\n          </li>\r\n          <li>\r\n            <h4>Min Baths</h4>\r\n            <form class=\"form-inline inline2\">\r\n              <select class=\"form-control input-sm\" ng-model=\"filter.baths.min\" ng-options=\"x+\'+\' for x in buckets.baths\" ng-change=\"applyFilter()\">\r\n                <option value=\"\">no min</option>\r\n              </select>\r\n            </form>\r\n          </li>\r\n          <li ng-repeat=\"field in [\'neighborhood\', \'propertyType\', \'pricePerSqft\']\">\r\n            <h4>{{fieldLabel(field)}}</h4>\r\n            <ul class=\"list-unstyled\">\r\n              <li ng-repeat=\"facet in result[\'@search.facets\'][field]\">\r\n                <a href=\"{{facetUrl(field, facet, facetType[field])}}\">\r\n                  <span ng-if=\"facet.to && !facet.from\">&lt; {{facetLabel(field, facet.to)}}</span>\r\n                  <span ng-if=\"facet.to && facet.from\">{{facetLabel(field, facet.from)}} - {{facetLabel(field, facet.to)}}</span>\r\n                  <span ng-if=\"!facet.to && facet.from\">&gt; {{facetLabel(field, facet.from)}}</span>\r\n                  <span ng-if=\"facet.value\">{{facetLabel(field, facet.value)}}</span>\r\n                </a>\r\n                <span class=\"text-muted small\">: {{facet.count|number}}</span>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <li>\r\n            <h4>Square Feet</h4>\r\n            <form class=\"form-inline inline2\">\r\n              <select class=\"form-control input-sm\" ng-model=\"filter.sqft.min\" ng-options=\"x|number for x in buckets.sqft\" ng-change=\"applyFilter()\">\r\n                <option value=\"\">no min</option>\r\n              </select> -\r\n              <select class=\"form-control input-sm\" ng-model=\"filter.sqft.max\" ng-options=\"x|number for x in buckets.sqft\" ng-change=\"applyFilter()\">\r\n                <option value=\"\">no max</option>\r\n              </select>\r\n            </form>\r\n          </li>\r\n          <li>\r\n            <h4>Max HOA</h4>\r\n            <form class=\"form-inline inline2\">\r\n              <select class=\"form-control input-sm\" ng-model=\"filter.hoa.max\" ng-options=\"x|dollars for x in buckets.hoa\" ng-change=\"applyFilter()\">\r\n                <option value=\"\">no max</option>\r\n              </select>\r\n            </form>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>");
            $templateCache.put("views/index.html", "<div class=\"container\">\r\n  <h1>Azure Search - Demo Site</h1>\r\n  <p>\r\n    This site demonstrates key functionality of <a href=\"https://azure.microsoft.com/en-us/services/search/\">Azure Search</a>.\r\n    For more information email the <a href=\"mailto://searchengineers@microsoft.com\">search services team</a> or follow our <a href=\"http://blogs.technet.com/b/onsearch/\">blog</a>.\r\n  </p>\r\n  <hr>\r\n  \r\n  <div class=\"row text-center landing\">\r\n    <div class=\"col-sm-12\">\r\n      <a href=\"#/homes\">\r\n        <h3>Geo Search</h3>\r\n        <div>\r\n          <span class=\"glyphicon glyphicon-map-marker\"></span>\r\n        </div>\r\n        <p class=\"help-block\">Search real estate listings and display results in Bing maps</p>\r\n      </a>\r\n    </div>\r\n   \r\n  <hr>\r\n</div>");

        }]);
    }, {}]
}, {}, [6]);
