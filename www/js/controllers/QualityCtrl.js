
define(['ionic', 'js/controllers/controllers'], function () {
    angular.module('weather.controllers')
        .controller('QualityCtrl', ['$scope', '$stateParams', 'cityWeatherService', 'initService',
            function ($scope, $stateParams, cityWeatherService, initService) {
                $scope.data = {
                    weather: {}
                };

                $scope.$on('$ionicView.beforeEnter', function () {
                    initService.initPromise.then(function () {
                        init();
                    });
                });


                function init () {
                    cityWeatherService.getCityWeather($stateParams.cityid).then(function (weather) {
                        $scope.data.weather = weather;
                    });
                }
            }
        ]);
});