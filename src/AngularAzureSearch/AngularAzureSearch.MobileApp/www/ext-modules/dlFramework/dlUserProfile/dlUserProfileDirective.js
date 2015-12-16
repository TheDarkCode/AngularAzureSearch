(function() {
    "use strict";

    angular.module('dlFramework').directive('dlUserProfile', function () {
        return {
            scope: false,
            templateUrl: 'ext-modules/dlFramework/dlUserProfile/dlUserProfileTemplate.html'
        };
    });
})();