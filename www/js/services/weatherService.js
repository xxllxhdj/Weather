
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
                            defer.resolve(data.result);
                        } else {
                            defer.reject();
                        }
                    }).error(function () {
                        defer.reject();
                    });

                    return defer.promise;
                };
                o.getPeriodWeather = function (weaid) {
                    var defer = $q.defer();

                    var url = APPCONSTANTS.getPeriodWeatherURL.format({
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
                            defer.resolve(data.result);
                        } else {
                            defer.reject();
                        }
                    }).error(function () {
                        defer.reject();
                    });

                    return defer.promise;
                };
                o.getPMQuality = function (weaid) {
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
                            defer.resolve(data.result);
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