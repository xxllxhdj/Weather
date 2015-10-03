
define(['ionic', 'js/services/services'], function () {
    angular.module('weather.services')
        .factory('cityWeatherService', ['$q', '$http', 'weatherService', 'configService', 'APPCONSTANTS',
            function ($q, $http, weatherService, configService, APPCONSTANTS) {
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
                o.getCityWeather = function (cityId) {
                    var defer = $q.defer(),
                        len = weatherCache.length,
                        cityWeather;

                    for (var i = 0; i < len; i++) {
                        if (weatherCache[i].cityid === cityId) {
                            cityWeather = weatherCache[i];
                            break;
                        }
                    }
                    if (cityWeather.weather.length > 0) {
                        defer.resolve(cityWeather.weather);
                    } else {
                        queryCityWeather(cityId).then(function (result) {
                            cityWeather.weather = result.weather;
                            cityWeather.weather.aqi = result.airQuality.aqi;
                            cityWeather.weather.aqiLevnm = result.airQuality.aqiLevnm;
                            cityWeather.airQuality = result.airQuality;
                            configService.set('weather', weatherCache).then(function () {
                                defer.resolve(cityWeather.weather);
                            }, function () {
                                defer.reject();
                            });
                        }, function () {
                            defer.reject();
                        });
                    }

                    return defer.promise;
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

                function queryCityWeather (cityId) {
                    var defer = $q.defer();

                    var task = [],
                        result = {};
                    task.push(weatherService.getRealTimeWeather(cityId).then(function (weather) {
                        result.weather = weather;
                    }));
                    task.push(weatherService.getAirQuality(cityId).then(function (airQuality) {
                        result.airQuality = airQuality;
                    }));
                    $q.all(task).then(function () {
                        defer.resolve(result);
                    }, function () {
                        defer.reject();
                    });

                    return defer.promise;

                }
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