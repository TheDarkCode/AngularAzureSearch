(function () {
    "use strict";

    angular.module('dlGallery').controller('dlGalleryController',
        ['$scope', '$rootScope', 'Lightbox',
            function ($scope, $rootScope, Lightbox) {
                $scope.filters = {};

                $scope.clearFilters = function () {
                    $scope.search.$ = '';
                    $scope.search.name = '';
                    $scope.search.category = '';
                };


                $scope.items = [{
                    name: 'Apple',
                    category: 'Fruit',
                    url: '//ununsplash.imgix.net/photo-1434394673726-e8232a5903b4?fit=crop&fm=jpg&h=700&q=75&w=1050'
                }, {
                    name: 'Pear',
                    category: 'Fruit',
                    url: '//ununsplash.imgix.net/photo-1433833103303-111110aae192?fit=crop&fm=jpg&h=700&q=75&w=1050'
                }, {
                    name: 'Almond',
                    category: 'Nut',
                    url: '//ununsplash.imgix.net/photo-1433785124354-92116416b870?fit=crop&fm=jpg&h=700&q=75&w=1050'
                }, {
                    name: 'Cashew',
                    category: 'Nut',
                    url: '//ununsplash.imgix.net/photo-1433424007598-bd5d102e8597?fit=crop&fm=jpg&h=700&q=75&w=1050'
                }, {
                    name: 'Mango',
                    category: 'Fruit',
                    url: '//ununsplash.imgix.net/photo-1433733071959-30cd185d14a8?fit=crop&fm=jpg&h=700&q=75&w=1050'
                }, {
                    name: 'Apple',
                    category: 'Fruit',
                    url: '//ununsplash.imgix.net/photo-1434394673726-e8232a5903b4?fit=crop&fm=jpg&h=700&q=75&w=1050'
                }, {
                    name: 'Marine',
                    category: 'Crustacean',
                    url: '//ununsplash.imgix.net/photo-1433833103303-111110aae192?fit=crop&fm=jpg&h=700&q=75&w=1050'
                }, {
                    name: 'Almond',
                    category: 'Nut',
                    url: '//ununsplash.imgix.net/photo-1433785124354-92116416b870?fit=crop&fm=jpg&h=700&q=75&w=1050'
                }, {
                    name: 'Cashew',
                    category: 'Maple',
                    url: '//ununsplash.imgix.net/photo-1433424007598-bd5d102e8597?fit=crop&fm=jpg&h=700&q=75&w=1050'
                }, {
                    name: 'Fried',
                    category: 'Fish',
                    url: '//ununsplash.imgix.net/photo-1433733071959-30cd185d14a8?fit=crop&fm=jpg&h=700&q=75&w=1050'
                }];

                $scope.openLightboxModal = function (index) {
                    Lightbox.openModal($scope.items, index);
                };
            }]);



})();