(function() {
    "use strict";

    angular.module('dlFramework').directive('dlUserProfileSmall', function () {
        return {
            scope: false,
            templateUrl: 'ext-modules/dlFramework/dlUserProfile/dlUserProfileSmallTemplate.html'
        };
    });
})();