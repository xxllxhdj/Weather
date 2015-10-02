
define(['ionic', 'js/utility/utility'], function () {
    angular.module('weather.utility')
        .factory('utilService', ['APPCONSTANTS', function (APPCONSTANTS) {
            var o = {};

            o.getAppFileDir = function () {
                return cordova.file.externalRootDirectory || cordova.file.documentsDirectory;
            };
            o.getConfigDir = function () {
                return o.getAppFileDir() + '/' + APPCONSTANTS.appName + '/';
            };

            return o;
        }]);
});