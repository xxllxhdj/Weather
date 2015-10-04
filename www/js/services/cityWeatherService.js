
define(['ionic', 'js/services/services'], function () {
    angular.module('weather.services')
        .factory('cityWeatherService', ['$q', '$http', 'weatherService', 'configService', 'APPCONSTANTS',
            function ($q, $http, weatherService, configService, APPCONSTANTS) {
                var o = {},
                    weatherCache = [];

                o.init = function () {
                    weatherCache = configService.get('weather');
                };
                o.getCityList = function (includeWeather) {
                    var cityList = [],
                        city;
                    angular.forEach(weatherCache, function (cityWeather) {
                        city = {
                            cityid: cityWeather.cityid,
                            citynm: cityWeather.citynm
                        };
                        if (includeWeather) {
                            city.weather = cityWeather.weather;
                        }
                        cityList.push(city);
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
                    if (cityWeather.weather) {
                        defer.resolve(cityWeather.weather);
                    } else {
                        queryCityWeather(cityId).then(function (weather) {
                            cityWeather.weather = weather;
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
                            weather: null
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

                    weatherService.getRealTimeWeather(cityId).then(function (weather) {
                        weatherService.getAirQuality(cityId).then(function (airQuality) {
                            angular.extend(weather, airQuality);
                            defer.resolve(weather);
                        }, function () {
                            defer.reject();
                        });
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