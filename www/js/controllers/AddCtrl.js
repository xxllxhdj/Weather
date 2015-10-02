
define(['ionic', 'js/controllers/controllers'], function () {
    angular.module('weather.controllers')
        .controller('AddCtrl', ['$scope', '$ionicHistory', 'cityWeatherService', 'locationService', 'initService',
            function ($scope, $ionicHistory, cityWeatherService, locationService, initService) {
                $scope.data = {
                    search: '',
                    suggestCity: [],
                    searchCity: []
                };

                initService.initPromise.then(init);

                $scope.$watch('data.search', function (search) {
                    $scope.data.searchCity = locationService.filterCity(search);
                });

                $scope.clearSearch = function () {
                    $scope.data.search = '';
                };
                $scope.addCity = function (city) {
                    cityWeatherService.addCity(city);
                    $ionicHistory.goBack();
                };

                function init () {
                    $scope.data.suggestCity = locationService.getSuggestCity();
                }
            }
        ]);
});