
define(['ionic', 'js/services/services'], function () {
    angular.module('weather.services')
        .factory('locationService', ['$q', '$http', 'APPCONSTANTS',
            function ($q, $http, APPCONSTANTS) {
                var configDefer = $q.defer(),
                    cityCache = [],
                    suggestCityCache = [],
                    o = {
                        loadingPromise: configDefer.promise
                    };

                init();

                o.getSuggestCity = function () {
                    return suggestCityCache;
                };

                return o;

                function init () {
                    $http({
                        method: 'GET',
                        url: 'data/city.json',
                        timeout: APPCONSTANTS.httpTimeOut
                    }).success(function (data) {
                        angular.forEach(data.result, function (value) {
                            cityCache.push(value);
                        });
                        createSuggestCity(data.result);
                        configDefer.resolve();
                    }).error(function () {
                        configDefer.resolve();
                    });
                }
                function createSuggestCity (data) {
                    var suggestCityId = ['1', '36', '165', '169', '23', '248', '434', '105', '94', '399', '412', '425',
                        '225', '48', '286', '337', '353', '291', '316', '151', '326', '209', '186', '265', '384', '299',
                        '237', '77', '59', '141', '200', '363', '52', '189', '364', '2631'],
                        len = suggestCityId.length,
                        temp = [];
                    for (var i = 1; i <= len; i++) {
                        temp.push(data[suggestCityId[i - 1]]);
                        if (i % 3 === 0) {
                            suggestCityCache.push(temp);
                            temp = [];
                        }
                    }
                    if (temp.length > 0) {
                        suggestCityCache.push(temp);
                    }
                }
            }
        ]);
});