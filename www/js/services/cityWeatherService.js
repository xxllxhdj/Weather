
define(['ionic', 'js/services/services'], function () {
    angular.module('weather.services')
        .factory('cityWeatherService', ['$q', '$http', 'configService', 'APPCONSTANTS',
            function ($q, $http, configService, APPCONSTANTS) {
                var o = {},
                    weatherCache = [];

                o.init = function () {
                    weatherCache = configService.get('weather');
                };
                o.getCityList = function () {
                    var cityList = [];
                    angular.forEach(weatherCache, function (cityWeather) {
                        cityList.push({
                            cityid: cityWeather.cityid,
                            citynm: cityWeather.citynm
                        });
                    });
                    return cityList;
                };
                o.addCity = function (city) {
                    var defer = $q.defer();

                    if (checkExist(city)) {
                        defer.reject('该城市已添加');
                    } else {
                        weatherCache.push({
                            cityid: city.cityid,
                            citynm: city.citynm,
                            weather: []
                        });
                        configService.set('weather', weatherCache).then(function () {
                            defer.resolve();
                        }, function () {
                            defer.reject('添加城市失败');
                        });
                    }

                    return defer.promise;
                };
                o.deleteCity = function (cityId) {
                    var defer = $q.defer(),
                        len = weatherCache.length,
                        del = false;

                    for (var i = 0; i < len; i++) {
                        if (weatherCache[i].cityid === cityId) {
                            weatherCache.splice(i, 1);
                            del = true;
                            break;
                        }
                    }

                    if (del) {
                        configService.set('weather', weatherCache).then(function () {
                            defer.resolve();
                        }, function () {
                            defer.reject();
                        });
                    } else {
                        defer.reject();
                    }

                    return defer.promise;
                };

                return o;

                function checkExist (city) {
                    var len = weatherCache.length,
                        exist = false;
                    for (var i = 0; i < len; i++) {
                        if (weatherCache[i].cityid === city.cityid) {
                            exist = true;
                            break;
                        }
                    }
                    return exist;
                }
            }
        ]);
});