
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
                    console.log(index);
                };
                $scope.goManager = function () {
                    $state.go('manager');
                };

                function init () {
                    $scope.data.cityList = cityWeatherService.getCityList();
                    if ($scope.data.cityList.length === 0) {
                        return;
                    }
                    cityWeatherService.getCityWeather($scope.data.cityList[0].cityid).then(function (weather) {
                        $scope.data.cityList[0].weather = weather;
                        console.log(weather);
                    });
                }
            }
        ]);
});