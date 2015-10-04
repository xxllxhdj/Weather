
define(['ionic', 'js/utility/utility'], function () {
    angular.module('weather.utility')
        .constant('APPCONSTANTS', {
            appName: 'cn.personal.weather',
            configFileName: 'config.txt',

            splashScreenExtraDelay: 1000,
            platformBackButtonPriority: 110,
            exitAppConfirmTime: 2000,

            exitAppTipsString: '再按一次退出知天气',

            httpTimeOut: 5000,

            appKey: '15520',
            sign: 'a1fc5509d1c72cf7f81e0f111383de6c',
            getCityInfoURL: 'http://api.k780.com:88/?app=weather.city&format=json',
            getRealTimeWeatherURL: 'http://api.k780.com:88/?app=weather.today&weaid={weaid}&appkey={appKey}&sign={sign}&format=json',
            getFutureWeatherURL: 'http://api.k780.com:88/?app=weather.future&weaid={weaid}&appkey={appKey}&sign={sign}&format=json',
            getPMQualityURL: 'http://api.k780.com:88/?app=weather.pm25&weaid={weaid}&appkey={appKey}&sign={sign}&format=json'
        });
});