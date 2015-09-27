
define(['ionic', 'js/services/services'], function () {
    angular.module('weather.services', [])
        .factory('locationService', ['$q', 'APPCONSTANTS',
            function ($q, APPCONSTANTS) {
                var o = {};

                return o;
            }
        ]);
});