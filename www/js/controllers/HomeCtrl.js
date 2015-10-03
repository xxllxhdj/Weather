
define(['ionic', 'js/controllers/controllers'], function () {
    angular.module('weather.controllers')
        .controller('HomeCtrl', ['$scope', '$state', 'cityWeatherService', 'initService',
            function ($scope, $state, cityWeatherService, initService) {
                $scope.data = {
                    cityList: []
                };

                $scope.$on('$ionicView.beforeEnter', function () {
                    initService.initPromise.then(function () {
                        init();
                    });
                });

                $scope.slideHasChanged = function (index) {
                    updateWeather(index);
                };
                $scope.goManager = function () {
                    $state.go('manager');
                };

                function init () {
                    $scope.data.cityList = cityWeatherService.getCityList();
                    if ($scope.data.cityList.length === 0) {
                        return;
                    }
                    updateWeather(0);
                }
                function updateWeather (index) {
                    var weather = $scope.data.cityList[index].weather;
                    if (weather) {
                        return;
                    }
                    cityWeatherService.getCityWeather($scope.data.cityList[index].cityid).then(function (weather) {
                        $scope.data.cityList[index].weather = {
                            aqi: weather.aqi,
                            aqiLevnm: weather.aqiLevnm,
                            tHigh: weather.tHigh,
                            tLow: weather.tLow,
                            temp: weather.temp,
                            weatid: weather.weatid,
                            weather: weather.weather,
                            week: weather.week
                        };
                    });
                }
            }
        ]);
});