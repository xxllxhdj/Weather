
define(['ionic', 'js/utility/utility'], function () {
    angular.module('weather.utility', [])
        .constant('APPCONSTANTS', {
            appName: 'cn.personal.weather',
            configFileName: 'config.txt',

            splashScreenExtraDelay: 1000,
            platformBackButtonPriority: 110,
            exitAppConfirmTime: 2000,

            exitAppTipsString: '再按一次退出知天气'
        });
});