angular.module("dlSearch").run(["$templateCache", function($templateCache) {$templateCache.put("ext-modules/dlSearch/dlSearchFullMapTemplate.html","<div>\r\n    <div class=\"container\">\r\n\r\n        <form ng-submit=\"search()\" ng-controller=\"dlSearchForm\">\r\n\r\n            <div class=\"input-group\">\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"model.query.q\" placeholder=\"e.g. boston or seattle or back bay\" ng-model-options=\"{debounce:{\'default\':100, \'blur\':0}}\" ng-change=\"suggest()\" ng-click=\"searchInputClicked($event)\" ng-disabled=\"loading\">\r\n\r\n                <div class=\"input-group-btn\">\r\n                    <button type=\"submit\" class=\"btn btn-default\" title=\"search\" ng-disabled=\"loading\">\r\n\r\n                        <span class=\"glyphicon glyphicon-search\">\r\n                        </span>\r\n                    </button>      <button ng-if=\"model.query.filter || model.query.order\" type=\"button\" class=\"btn btn-link\" ng-click=\"resetFilter()\" title=\"reset filters\" ng-disabled=\"loading\">reset</button>\r\n                </div>\r\n            </div>\r\n\r\n            <div style=\"position:fixed;z-index:9999;left:0;right:0;\" ng-if=\"suggestResult.$resolved\">\r\n\r\n                <div class=\"container\">\r\n                    <ul class=\"list-group\" style=\"background:white;margin-top:-1px;\">\r\n                        <li class=\"list-group-item\" ng-repeat=\"doc in suggestResult.value\" ng-click=\"clickSuggest($event, doc[\'@search.text\'])\">          <a href=\"\" ng-bind-html=\"html(doc[\'@search.text\'])\"></a>        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </form>\r\n    </div>\r\n    <hr>\r\n\r\n    <div ng-switch=\"searchResultMode\">\r\n\r\n        <div ng-switch-when=\"grids\">\r\n            <div class=\"row\" style=\"height:100%\">\r\n                <!-- map column -->\r\n\r\n                <div class=\"col-xs-12 col-sm-5\" style=\"height:100%\" ng-controller=\"dlSearchMap\">\r\n\r\n                    <div style=\"position:relative;z-index:100;padding:20px;\">\r\n\r\n                        <div class=\"btn-group\">\r\n                            <button type=\"button\" class=\"btn btn-default btn-small\" ng-click=\"currentLocation()\"><span class=\"glyphicon glyphicon-screenshot\" aria-hidden=\"true\"></span></button>          <button type=\"button\" class=\"btn btn-default btn-small\" ng-click=\"drawPolygon()\"><span class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\"></span></button>          <button type=\"button\" class=\"btn btn-default btn-small\" ng-click=\"searchMapArea()\"><span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span></button>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <p ng-if=\"drawing\" style=\"top:0;background:white;position:relative;z-index:100;margin-right:-15px;padding:5px 20px;\">        <kbd>double-click</kbd> or <kbd>enter</kbd> to end. <kbd>ESC</kbd> to cancel.      </p>\r\n\r\n                    <div id=\"map\" map ready=\"mapReady(map)\">\r\n                    </div>\r\n                </div>\r\n                \r\n                <div class=\"dl-search-grids-main\">\r\n\r\n                    <!-- loading -->\r\n\r\n                    <div class=\"col-xs-12 col-sm-7\" ng-if=\"!result.$resolved\" style=\"height:100%;\">\r\n\r\n                        <div class=\"text-center\" style=\"font-size:32px;padding-top:100px;color:#ccc;border:1px solid #eee;height:100%;\">\r\n                            Loading\r\n                        </div>\r\n                    </div>\r\n                    <!-- result column -->\r\n\r\n                    <div class=\"col-xs-12 col-sm-4\" style=\"height:100%;\" ng-if=\"result.$resolved\">\r\n                        <!-- result detail -->\r\n\r\n                        <div id=\"result-detail\" ng-if=\"model.detail\" ng-controller=\"dlSearchDetail\">\r\n                            <img ng-src=\"{{model.detail.imageUrls[model.detail[\'@image\']]}}\" style=\"border:1px solid #ccc;height:100%;width:auto;float:left;margin-right:4px;max-width:120px;\" ng-click=\"nextImage()\">\r\n\r\n                            <p>\r\n                                <b>{{model.detail.street}}</b> <small>&bull; {{model.detail.city}}, {{model.detail.state}} {{model.detail.zip}}</small>          <div>\r\n                                    <br>{{model.detail.dom}} <ng-pluralize count=\"model.detail.dom\" when=\"{1:\'day\', other:\'days\'}\"></ng-pluralize> on market\r\n\r\n                                    <span class=\"text-muted\">\r\n\r\n                                        <span ng-if=\"model.detail.propertyType\">\r\n                                            &bull; {{model.detail.propertyType}}\r\n                                        </span>\r\n\r\n                                        <span ng-if=\"model.detail.propertyType && model.detail.yearBuilt\">\r\n                                            &bull;\r\n                                        </span>\r\n\r\n                                        <span ng-if=\"model.detail.yearBuilt\">\r\n                                            built {{model.detail.yearBuilt}}\r\n                                        </span>\r\n                                    </span>\r\n                                    <br>\r\n\r\n                                    <span ng-if=\"model.detail.pricePerSqft\">\r\n                                        {{model.detail.pricePerSqft|dollars}} / sqft.\r\n                                    </span>\r\n\r\n                                    <span ng-if=\"model.detail.lotsize\" class=\"text-muted\">\r\n                                        &bull; lot size {{model.detail.lotsize|number}} sqft.\r\n                                    </span>\r\n\r\n                                    <span ng-if=\"model.detail.hoa\">\r\n                                        <br><abbr title=\"Home Owners\' Association\">HOA</abbr> {{model.detail.hoa|dollars}}\r\n                                    </span>\r\n                                </div>\r\n                            </p>\r\n\r\n                            <div>\r\n                            </div>\r\n                        </div>\r\n                        <!-- result sorting -->\r\n\r\n                        <div class=\"small\" style=\"margin-bottom:6px;\" ng-controller=\"dlSearchSort\">\r\n\r\n                            <div class=\"pull-right\">\r\n\r\n                                <span class=\"text-muted\">\r\n                                    sort by\r\n                                </span>\r\n\r\n                                <div class=\"dropdown\" style=\"display: inline-block;\">\r\n                                    <a href=\"\" data-toggle=\"dropdown\" style=\"padding-right:2px;\">{{orderBy.label}}</a>\r\n                                    <ul class=\"dropdown-menu\" style=\"right:0;left:auto;\">\r\n                                        <li ng-repeat=\"(field, label) in orderFields\">                <a ng-href=\"{{orderUrl(field)}}\">{{label}}</a>              </li>\r\n                                    </ul>\r\n                                </div>          <a href=\"{{toggleDirUrl()}}\" style=\"font-size:8px;\">\r\n\r\n                                    <span ng-if=\"orderDir ==\'asc\'\" class=\"glyphicon glyphicon-triangle-top\" title=\"ascending (low to high)\">\r\n                                    </span>\r\n\r\n                                    <span ng-if=\"orderDir == \'desc\'\" class=\"glyphicon glyphicon-triangle-bottom\" title=\"descending (high to low)\">\r\n                                    </span>\r\n                                </a>\r\n                            </div>\r\n\r\n                            <div class=\"text-muted\">\r\n                                1 - {{result.value.length}} of {{result[\'@odata.count\']}} results\r\n                            </div>\r\n                        </div>\r\n                        <!-- result list -->\r\n                        <ul id=\"result-list\" class=\"list-group\">\r\n                            <li class=\"list-group-item\" ng-repeat=\"doc in result.value\" ng-click=\"focusResult($event)\" ng-mouseover=\"resultMouseIn($event)\" ng-mouseleave=\"resultMouseOut($event)\" ng-controller=\"dlSearchRepeater\" ng-class=\"{\'is-detail\':doc[\'@active\']}\">\r\n                                <h5>\r\n                                    <a href=\"\">{{doc.street}}</a>            <small style=\"padding-left:1em;\">\r\n                                        {{doc.city}}\r\n\r\n                                        <span ng-if=\"doc.city != doc.neighborhood\">\r\n                                            ({{doc.neighborhood}})\r\n                                        </span>\r\n                                    </small>\r\n                                </h5>\r\n\r\n                                <p class=\"small\">\r\n                                    <b style=\"padding-right:4px;\">{{doc.price|dollars}}</b>\r\n\r\n                                    <span class=\"text-muted\">\r\n                                        {{doc.sqft|number}} sqft. &bull;              {{doc.beds|number}} beds\r\n\r\n                                        <span ng-if=\"doc.baths\">\r\n                                            &bull; {{doc.baths|number}} bath\r\n                                        </span>\r\n                                    </span>\r\n                                </p>\r\n                            </li>\r\n                        </ul>\r\n                    </div>\r\n                    <!-- facet column -->\r\n                    <div class=\"hidden-xs col-sm-3 col-md-2\" style=\"height:100%;overflow:auto;\" ng-controller=\"dlSearchFacets\">\r\n                        <ul class=\"list-unstyled facets\" ng-if=\"result && result.$resolved\">\r\n                            <li ng-repeat=\"field in [\'neighborhood\', \'propertyType\', \'pricePerSqft\']\">\r\n                                <h4>{{fieldLabel(field)}}</h4>\r\n                                <ul class=\"list-unstyled\">\r\n                                    <li ng-repeat=\"facet in result[\'@search.facets\'][field]\">\r\n                                        <a href=\"{{facetUrl(field, facet, facetType[field])}}\">\r\n\r\n                                            <span ng-if=\"facet.to && !facet.from\">\r\n                                                &lt; {{facetLabel(field, facet.to)}}\r\n                                            </span>\r\n\r\n                                            <span ng-if=\"facet.to && facet.from\">\r\n                                                {{facetLabel(field, facet.from)}} - {{facetLabel(field, facet.to)}}\r\n                                            </span>\r\n\r\n                                            <span ng-if=\"!facet.to && facet.from\">\r\n                                                &gt; {{facetLabel(field, facet.from)}}\r\n                                            </span>\r\n\r\n                                            <span ng-if=\"facet.value\">\r\n                                                {{facetLabel(field, facet.value)}}\r\n                                            </span>\r\n                                        </a>\r\n\r\n                                        <span class=\"text-muted small\">\r\n                                            : {{facet.count|number}}\r\n                                        </span>\r\n                                    </li>\r\n                                </ul>\r\n                            </li>\r\n                        </ul>\r\n                    </div>\r\n\r\n                </div>\r\n                \r\n\r\n            </div>\r\n        </div>\r\n\r\n        <div ng-switch-when=\"fullMaps\">\r\n            <div class=\"row\" style=\"height:100%\">\r\n                <!-- map column -->\r\n\r\n                <div class=\"col-xs-12 col-sm-12\" style=\"height:100%\" ng-controller=\"dlSearchMap\">\r\n\r\n                    <div style=\"position:relative;z-index:100;padding:20px;\">\r\n\r\n                        <div class=\"btn-group\">\r\n                            <button type=\"button\" class=\"btn btn-default btn-small\" ng-click=\"currentLocation()\"><span class=\"glyphicon glyphicon-screenshot\" aria-hidden=\"true\"></span></button>          <button type=\"button\" class=\"btn btn-default btn-small\" ng-click=\"drawPolygon()\"><span class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\"></span></button>          <button type=\"button\" class=\"btn btn-default btn-small\" ng-click=\"searchMapArea()\"><span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span></button>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <p ng-if=\"drawing\" style=\"top:0;background:white;position:relative;z-index:100;margin-right:-15px;padding:5px 20px;\">        <kbd>double-click</kbd> or <kbd>enter</kbd> to end. <kbd>ESC</kbd> to cancel.      </p>\r\n\r\n                    <div id=\"map\" map ready=\"mapReady(map)\">\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"dl-search-grids-main col-xs-3 pull-left\" style=\"position:absolute; top: 150px; z-index:1030; \">\r\n\r\n                    <!-- loading -->\r\n\r\n                    <div class=\"col-xs-12 col-sm-7\" ng-if=\"!result.$resolved\" style=\"height:100%;\">\r\n\r\n                        <div class=\"text-center\" style=\"font-size:32px;padding-top:100px;color:#ccc;border:1px solid #eee;height:100%;\">\r\n                            Loading\r\n                        </div>\r\n                    </div>\r\n                    <!-- result column -->\r\n\r\n                    <div class=\"col-xs-12 col-sm-4\" style=\"height:100%;\" ng-if=\"result.$resolved\">\r\n                        <!-- result detail -->\r\n\r\n                        <div id=\"result-detail\" ng-if=\"model.detail\" ng-controller=\"dlSearchDetail\">\r\n                            <img ng-src=\"{{model.detail.imageUrls[model.detail[\'@image\']]}}\" style=\"border:1px solid #ccc;height:100%;width:auto;float:left;margin-right:4px;max-width:120px;\" ng-click=\"nextImage()\">\r\n\r\n                            <p>\r\n                                <b>{{model.detail.street}}</b> <small>&bull; {{model.detail.city}}, {{model.detail.state}} {{model.detail.zip}}</small>          <div>\r\n                                    <br>{{model.detail.dom}} <ng-pluralize count=\"model.detail.dom\" when=\"{1:\'day\', other:\'days\'}\"></ng-pluralize> on market\r\n\r\n                                    <span class=\"text-muted\">\r\n\r\n                                        <span ng-if=\"model.detail.propertyType\">\r\n                                            &bull; {{model.detail.propertyType}}\r\n                                        </span>\r\n\r\n                                        <span ng-if=\"model.detail.propertyType && model.detail.yearBuilt\">\r\n                                            &bull;\r\n                                        </span>\r\n\r\n                                        <span ng-if=\"model.detail.yearBuilt\">\r\n                                            built {{model.detail.yearBuilt}}\r\n                                        </span>\r\n                                    </span>\r\n                                    <br>\r\n\r\n                                    <span ng-if=\"model.detail.pricePerSqft\">\r\n                                        {{model.detail.pricePerSqft|dollars}} / sqft.\r\n                                    </span>\r\n\r\n                                    <span ng-if=\"model.detail.lotsize\" class=\"text-muted\">\r\n                                        &bull; lot size {{model.detail.lotsize|number}} sqft.\r\n                                    </span>\r\n\r\n                                    <span ng-if=\"model.detail.hoa\">\r\n                                        <br><abbr title=\"Home Owners\' Association\">HOA</abbr> {{model.detail.hoa|dollars}}\r\n                                    </span>\r\n                                </div>\r\n                            </p>\r\n\r\n                            <div>\r\n                            </div>\r\n                        </div>\r\n                        <!-- result sorting -->\r\n\r\n                        <div class=\"small\" style=\"margin-bottom:6px;\" ng-controller=\"dlSearchSort\">\r\n\r\n                            <div class=\"pull-right\">\r\n\r\n                                <span class=\"text-muted\">\r\n                                    sort by\r\n                                </span>\r\n\r\n                                <div class=\"dropdown\" style=\"display: inline-block;\">\r\n                                    <a href=\"\" data-toggle=\"dropdown\" style=\"padding-right:2px;\">{{orderBy.label}}</a>\r\n                                    <ul class=\"dropdown-menu\" style=\"right:0;left:auto;\">\r\n                                        <li ng-repeat=\"(field, label) in orderFields\">                <a ng-href=\"{{orderUrl(field)}}\">{{label}}</a>              </li>\r\n                                    </ul>\r\n                                </div>          <a href=\"{{toggleDirUrl()}}\" style=\"font-size:8px;\">\r\n\r\n                                    <span ng-if=\"orderDir ==\'asc\'\" class=\"glyphicon glyphicon-triangle-top\" title=\"ascending (low to high)\">\r\n                                    </span>\r\n\r\n                                    <span ng-if=\"orderDir == \'desc\'\" class=\"glyphicon glyphicon-triangle-bottom\" title=\"descending (high to low)\">\r\n                                    </span>\r\n                                </a>\r\n                            </div>\r\n\r\n                            <div class=\"text-muted\">\r\n                                1 - {{result.value.length}} of {{result[\'@odata.count\']}} results\r\n                            </div>\r\n                        </div>\r\n                        <!-- result list -->\r\n                        <ul id=\"result-list\" class=\"list-group\">\r\n                            <li class=\"list-group-item\" ng-repeat=\"doc in result.value\" ng-click=\"focusResult($event)\" ng-mouseover=\"resultMouseIn($event)\" ng-mouseleave=\"resultMouseOut($event)\" ng-controller=\"dlSearchRepeater\" ng-class=\"{\'is-detail\':doc[\'@active\']}\">\r\n                                <h5>\r\n                                    <a href=\"\">{{doc.street}}</a>            <small style=\"padding-left:1em;\">\r\n                                        {{doc.city}}\r\n\r\n                                        <span ng-if=\"doc.city != doc.neighborhood\">\r\n                                            ({{doc.neighborhood}})\r\n                                        </span>\r\n                                    </small>\r\n                                </h5>\r\n\r\n                                <p class=\"small\">\r\n                                    <b style=\"padding-right:4px;\">{{doc.price|dollars}}</b>\r\n\r\n                                    <span class=\"text-muted\">\r\n                                        {{doc.sqft|number}} sqft. &bull;              {{doc.beds|number}} beds\r\n\r\n                                        <span ng-if=\"doc.baths\">\r\n                                            &bull; {{doc.baths|number}} bath\r\n                                        </span>\r\n                                    </span>\r\n                                </p>\r\n                            </li>\r\n                        </ul>\r\n                    </div>\r\n                    <!-- facet column -->\r\n                    <div class=\"hidden-xs col-sm-3 col-md-2\" style=\"height:100%;overflow:auto;\" ng-controller=\"dlSearchFacets\">\r\n                        <ul class=\"list-unstyled facets\" ng-if=\"result && result.$resolved\">\r\n                            <li ng-repeat=\"field in [\'neighborhood\', \'propertyType\', \'pricePerSqft\']\">\r\n                                <h4>{{fieldLabel(field)}}</h4>\r\n                                <ul class=\"list-unstyled\">\r\n                                    <li ng-repeat=\"facet in result[\'@search.facets\'][field]\">\r\n                                        <a href=\"{{facetUrl(field, facet, facetType[field])}}\">\r\n\r\n                                            <span ng-if=\"facet.to && !facet.from\">\r\n                                                &lt; {{facetLabel(field, facet.to)}}\r\n                                            </span>\r\n\r\n                                            <span ng-if=\"facet.to && facet.from\">\r\n                                                {{facetLabel(field, facet.from)}} - {{facetLabel(field, facet.to)}}\r\n                                            </span>\r\n\r\n                                            <span ng-if=\"!facet.to && facet.from\">\r\n                                                &gt; {{facetLabel(field, facet.from)}}\r\n                                            </span>\r\n\r\n                                            <span ng-if=\"facet.value\">\r\n                                                {{facetLabel(field, facet.value)}}\r\n                                            </span>\r\n                                        </a>\r\n\r\n                                        <span class=\"text-muted small\">\r\n                                            : {{facet.count|number}}\r\n                                        </span>\r\n                                    </li>\r\n                                </ul>\r\n                            </li>\r\n                        </ul>\r\n                    </div>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("ext-modules/dlSearch/dlSearchTemplate.html","<div>\r\n    <div class=\"container\">\r\n\r\n        <form ng-submit=\"search()\" ng-controller=\"dlSearchForm\">\r\n\r\n            <div class=\"input-group\">\r\n                <input type=\"text\" class=\"form-control\" ng-model=\"model.query.q\" placeholder=\"e.g. boston or seattle or back bay\" ng-model-options=\"{debounce:{\'default\':100, \'blur\':0}}\" ng-change=\"suggest()\" ng-click=\"searchInputClicked($event)\" ng-disabled=\"loading\">\r\n\r\n                <div class=\"input-group-btn\">\r\n                    <button type=\"submit\" class=\"btn btn-default\" title=\"search\" ng-disabled=\"loading\">\r\n\r\n                        <span class=\"glyphicon glyphicon-search\">\r\n                        </span>\r\n                    </button>      <button ng-if=\"model.query.filter || model.query.order\" type=\"button\" class=\"btn btn-link\" ng-click=\"resetFilter()\" title=\"reset filters\" ng-disabled=\"loading\">reset</button>\r\n                </div>\r\n            </div>\r\n\r\n            <div style=\"position:fixed;z-index:9999;left:0;right:0;\" ng-if=\"suggestResult.$resolved\">\r\n\r\n                <div class=\"container\">\r\n                    <ul class=\"list-group\" style=\"background:white;margin-top:-1px;\">\r\n                        <li class=\"list-group-item\" ng-repeat=\"doc in suggestResult.value\" ng-click=\"clickSuggest($event, doc[\'@search.text\'])\">          <a href=\"\" ng-bind-html=\"html(doc[\'@search.text\'])\"></a>        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </form>\r\n    </div>\r\n    <hr>\r\n\r\n    <div>\r\n\r\n        <div>\r\n\r\n            <div class=\"row\" style=\"height:100%\">\r\n                <!-- map column -->\r\n\r\n                <div class=\"col-xs-12 col-sm-5\" style=\"height:100%\" ng-controller=\"dlSearchMap\">\r\n\r\n                    <div style=\"position:relative;z-index:100;padding:20px;\">\r\n\r\n                        <div class=\"btn-group\">\r\n                            <button type=\"button\" class=\"btn btn-default btn-small\" ng-click=\"currentLocation()\"><span class=\"glyphicon glyphicon-screenshot\" aria-hidden=\"true\"></span></button>          <button type=\"button\" class=\"btn btn-default btn-small\" ng-click=\"drawPolygon()\"><span class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\"></span></button>          <button type=\"button\" class=\"btn btn-default btn-small\" ng-click=\"searchMapArea()\"><span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span></button>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <p ng-if=\"drawing\" style=\"top:0;background:white;position:relative;z-index:100;margin-right:-15px;padding:5px 20px;\">        <kbd>double-click</kbd> or <kbd>enter</kbd> to end. <kbd>ESC</kbd> to cancel.      </p>\r\n\r\n                    <div id=\"map\" map ready=\"mapReady(map)\">\r\n                    </div>\r\n                </div>\r\n                <!-- loading -->\r\n\r\n                <div class=\"col-xs-12 col-sm-7\" ng-if=\"!result.$resolved\" style=\"height:100%;\">\r\n\r\n                    <div class=\"text-center\" style=\"font-size:32px;padding-top:100px;color:#ccc;border:1px solid #eee;height:100%;\">\r\n                        Loading\r\n                    </div>\r\n                </div>\r\n                <!-- result column -->\r\n\r\n                <div class=\"col-xs-12 col-sm-4\" style=\"height:100%;\" ng-if=\"result.$resolved\">\r\n                    <!-- result detail -->\r\n\r\n                    <div id=\"result-detail\" ng-if=\"model.detail\" ng-controller=\"dlSearchDetail\">\r\n                        <img ng-src=\"{{model.detail.imageUrls[model.detail[\'@image\']]}}\" style=\"border:1px solid #ccc;height:100%;width:auto;float:left;margin-right:4px;max-width:120px;\" ng-click=\"nextImage()\">\r\n\r\n                        <p>\r\n                            <b>{{model.detail.street}}</b> <small>&bull; {{model.detail.city}}, {{model.detail.state}} {{model.detail.zip}}</small>          <div>\r\n                                <br>{{model.detail.dom}} <ng-pluralize count=\"model.detail.dom\" when=\"{1:\'day\', other:\'days\'}\"></ng-pluralize> on market\r\n\r\n                                <span class=\"text-muted\">\r\n\r\n                                    <span ng-if=\"model.detail.propertyType\">\r\n                                        &bull; {{model.detail.propertyType}}\r\n                                    </span>\r\n\r\n                                    <span ng-if=\"model.detail.propertyType && model.detail.yearBuilt\">\r\n                                        &bull;\r\n                                    </span>\r\n\r\n                                    <span ng-if=\"model.detail.yearBuilt\">\r\n                                        built {{model.detail.yearBuilt}}\r\n                                    </span>\r\n                                </span>\r\n                                <br>\r\n\r\n                                <span ng-if=\"model.detail.pricePerSqft\">\r\n                                    {{model.detail.pricePerSqft|dollars}} / sqft.\r\n                                </span>\r\n\r\n                                <span ng-if=\"model.detail.lotsize\" class=\"text-muted\">\r\n                                    &bull; lot size {{model.detail.lotsize|number}} sqft.\r\n                                </span>\r\n\r\n                                <span ng-if=\"model.detail.hoa\">\r\n                                    <br><abbr title=\"Home Owners\' Association\">HOA</abbr> {{model.detail.hoa|dollars}}\r\n                                </span>\r\n                            </div>\r\n                        </p>\r\n\r\n                        <div>\r\n                        </div>\r\n                    </div>\r\n                    <!-- result sorting -->\r\n\r\n                    <div class=\"small\" style=\"margin-bottom:6px;\" ng-controller=\"dlSearchSort\">\r\n\r\n                        <div class=\"pull-right\">\r\n\r\n                            <span class=\"text-muted\">\r\n                                sort by\r\n                            </span>\r\n\r\n                            <div class=\"dropdown\" style=\"display: inline-block;\">\r\n                                <a href=\"\" data-toggle=\"dropdown\" style=\"padding-right:2px;\">{{orderBy.label}}</a>\r\n                                <ul class=\"dropdown-menu\" style=\"right:0;left:auto;\">\r\n                                    <li ng-repeat=\"(field, label) in orderFields\">                <a ng-href=\"{{orderUrl(field)}}\">{{label}}</a>              </li>\r\n                                </ul>\r\n                            </div>          <a href=\"{{toggleDirUrl()}}\" style=\"font-size:8px;\">\r\n\r\n                                <span ng-if=\"orderDir ==\'asc\'\" class=\"glyphicon glyphicon-triangle-top\" title=\"ascending (low to high)\">\r\n                                </span>\r\n\r\n                                <span ng-if=\"orderDir == \'desc\'\" class=\"glyphicon glyphicon-triangle-bottom\" title=\"descending (high to low)\">\r\n                                </span>\r\n                            </a>\r\n                        </div>\r\n\r\n                        <div class=\"text-muted\">\r\n                            1 - {{result.value.length}} of {{result[\'@odata.count\']}} results\r\n                        </div>\r\n                    </div>\r\n                    <!-- result list -->\r\n                    <ul id=\"result-list\" class=\"list-group\">\r\n                        <li class=\"list-group-item\" ng-repeat=\"doc in result.value\" ng-click=\"focusResult($event)\" ng-mouseover=\"resultMouseIn($event)\" ng-mouseleave=\"resultMouseOut($event)\" ng-controller=\"dlSearchRepeater\" ng-class=\"{\'is-detail\':doc[\'@active\']}\">\r\n                            <h5>\r\n                                <a href=\"\">{{doc.street}}</a>            <small style=\"padding-left:1em;\">\r\n                                    {{doc.city}}\r\n\r\n                                    <span ng-if=\"doc.city != doc.neighborhood\">\r\n                                        ({{doc.neighborhood}})\r\n                                    </span>\r\n                                </small>\r\n                            </h5>\r\n\r\n                            <p class=\"small\">\r\n                                <b style=\"padding-right:4px;\">{{doc.price|dollars}}</b>\r\n\r\n                                <span class=\"text-muted\">\r\n                                    {{doc.sqft|number}} sqft. &bull;              {{doc.beds|number}} beds\r\n\r\n                                    <span ng-if=\"doc.baths\">\r\n                                        &bull; {{doc.baths|number}} bath\r\n                                    </span>\r\n                                </span>\r\n                            </p>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n                <!-- facet column -->\r\n                <div class=\"hidden-xs col-sm-3 col-md-2\" style=\"height:100%;overflow:auto;\" ng-controller=\"dlSearchFacets\">\r\n                    <ul class=\"list-unstyled facets\" ng-if=\"result && result.$resolved\">\r\n                        <li>\r\n                            <h4>Price</h4>\r\n\r\n                            <form class=\"form-inline inline2\">\r\n                                <select class=\"form-control input-sm\" ng-model=\"filter.price.min\" ng-options=\"x|dollars for x in buckets.price\" ng-change=\"applyFilter()\">\r\n\r\n                                    <option value=\"\">no min</option>\r\n                                </select> -\r\n                                <select class=\"form-control input-sm\" ng-model=\"filter.price.max\" ng-options=\"x|dollars for x in buckets.price\" ng-change=\"applyFilter()\">\r\n\r\n                                    <option value=\"\">no max</option>\r\n                                </select>\r\n                            </form>\r\n                        </li>\r\n                        <li>\r\n                            <h4>Beds</h4>\r\n\r\n                            <form class=\"form-inline inline2\">\r\n                                <select class=\"form-control input-sm\" ng-model=\"filter.beds.min\" ng-options=\"x|number for x in buckets.beds\" ng-change=\"applyFilter()\">\r\n\r\n                                    <option value=\"\">no min</option>\r\n                                </select> -\r\n                                <select class=\"form-control input-sm\" ng-model=\"filter.beds.max\" ng-options=\"x|number for x in buckets.beds\" ng-change=\"applyFilter()\">\r\n\r\n                                    <option value=\"\">no max</option>\r\n                                </select>\r\n                            </form>\r\n                        </li>\r\n                        <li>\r\n                            <h4>Min Baths</h4>\r\n\r\n                            <form class=\"form-inline inline2\">\r\n                                <select class=\"form-control input-sm\" ng-model=\"filter.baths.min\" ng-options=\"x+\'+\' for x in buckets.baths\" ng-change=\"applyFilter()\">\r\n\r\n                                    <option value=\"\">no min</option>\r\n                                </select>\r\n                            </form>\r\n                        </li>\r\n                        <li ng-repeat=\"field in [\'neighborhood\', \'propertyType\', \'pricePerSqft\']\">\r\n                            <h4>{{fieldLabel(field)}}</h4>\r\n                            <ul class=\"list-unstyled\">\r\n                                <li ng-repeat=\"facet in result[\'@search.facets\'][field]\">\r\n                                    <a href=\"{{facetUrl(field, facet, facetType[field])}}\">\r\n\r\n                                        <span ng-if=\"facet.to && !facet.from\">\r\n                                            &lt; {{facetLabel(field, facet.to)}}\r\n                                        </span>\r\n\r\n                                        <span ng-if=\"facet.to && facet.from\">\r\n                                            {{facetLabel(field, facet.from)}} - {{facetLabel(field, facet.to)}}\r\n                                        </span>\r\n\r\n                                        <span ng-if=\"!facet.to && facet.from\">\r\n                                            &gt; {{facetLabel(field, facet.from)}}\r\n                                        </span>\r\n\r\n                                        <span ng-if=\"facet.value\">\r\n                                            {{facetLabel(field, facet.value)}}\r\n                                        </span>\r\n                                    </a>\r\n\r\n                                    <span class=\"text-muted small\">\r\n                                        : {{facet.count|number}}\r\n                                    </span>\r\n                                </li>\r\n                            </ul>\r\n                        </li>\r\n                        <li>\r\n                            <h4>Square Feet</h4>\r\n\r\n                            <form class=\"form-inline inline2\">\r\n                                <select class=\"form-control input-sm\" ng-model=\"filter.sqft.min\" ng-options=\"x|number for x in buckets.sqft\" ng-change=\"applyFilter()\">\r\n\r\n                                    <option value=\"\">no min</option>\r\n                                </select> -\r\n                                <select class=\"form-control input-sm\" ng-model=\"filter.sqft.max\" ng-options=\"x|number for x in buckets.sqft\" ng-change=\"applyFilter()\">\r\n\r\n                                    <option value=\"\">no max</option>\r\n                                </select>\r\n                            </form>\r\n                        </li>\r\n                        <li>\r\n                            <h4>Max HOA</h4>\r\n\r\n                            <form class=\"form-inline inline2\">\r\n                                <select class=\"form-control input-sm\" ng-model=\"filter.hoa.max\" ng-options=\"x|dollars for x in buckets.hoa\" ng-change=\"applyFilter()\">\r\n\r\n                                    <option value=\"\">no max</option>\r\n                                </select>\r\n                            </form>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");}]);