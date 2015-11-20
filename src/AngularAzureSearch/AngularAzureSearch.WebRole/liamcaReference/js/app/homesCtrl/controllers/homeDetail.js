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