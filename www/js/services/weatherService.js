
define(['ionic', 'js/services/services'], function () {
    angular.module('weather.services')
        .factory('weatherService', ['$q', '$http', 'APPCONSTANTS',
            function ($q, $http, APPCONSTANTS) {
                var o = {};

                o.getRealTimeWeather = function (weaid) {
                    var defer = $q.defer();

                    var url = APPCONSTANTS.getRealTimeWeatherURL.format({
                        weaid: weaid,
                        appKey: APPCONSTANTS.appKey,
                        sign: APPCONSTANTS.sign
                    });
                    $http({
                        method: 'GET',
                        url: url,
                        timeout: APPCONSTANTS.httpTimeOut
                    }).success(function (data) {
                        if (data.success === "1") {
                            var result = data.result;
                            defer.resolve({
                                weatid: result.weatid,
                                weather: result.weather,
                                days: result.days,
                                week: result.week,
                                temp: parseInt(result.temp_curr),
                                tHigh: parseInt(result.temp_high),
                                tLow: parseInt(result.temp_low),
                                humidity: result.humidity,
                                wind: result.wind,
                                winp: result.winp
                            });
                        } else {
                            defer.reject();
                        }
                    }).error(function () {
                        defer.reject();
                    });

                    return defer.promise;
                };
                o.getFutureWeather = function (weaid) {
                    var defer = $q.defer();

                    var url = APPCONSTANTS.getFutureWeatherURL.format({
                        weaid: weaid,
                        appKey: APPCONSTANTS.appKey,
                        sign: APPCONSTANTS.sign
                    });
                    $http({
                        method: 'GET',
                        url: url,
                        timeout: APPCONSTANTS.httpTimeOut
                    }).success(function (data) {
                        if (data.success === "1") {
                            var results = data.result,
                                len = results.length,
                                formatted = [];
                            for (var i = 1; i < len; i++) {
                                formatted.push({
                                    weatid: results[i].weatid,
                                    weather: results[i].weather,
                                    tHigh: results[i].temp_high,
                                    tLow: results[i].temp_low,
                                    week: results[i].week
                                });
                                if (i >= 4) {
                                    break;
                                }
                            }
                            defer.resolve(formatted);
                        } else {
                            defer.reject();
                        }
                    }).error(function () {
                        defer.reject();
                    });

                    return defer.promise;
                };
                o.getAirQuality = function (weaid) {
                    var defer = $q.defer();

                    var url = APPCONSTANTS.getPMQualityURL.format({
                        weaid: weaid,
                        appKey: APPCONSTANTS.appKey,
                        sign: APPCONSTANTS.sign
                    });
                    $http({
                        method: 'GET',
                        url: url,
                        timeout: APPCONSTANTS.httpTimeOut
                    }).success(function (data) {
                        if (data.success === "1") {
                            var result = data.result;
                            defer.resolve({
                                aqi: result.aqi,
                                aqiScope: result.aqi_scope,
                                aqiLevid: result.aqi_levid,
                                aqiLevnm: result.aqi_levnm,
                                aqiRemark: result.aqi_remark
                            });
                        } else {
                            defer.reject();
                        }
                    }).error(function () {
                        defer.reject();
                    });

                    return defer.promise;
                };

                return o;
            }
        ]);
});