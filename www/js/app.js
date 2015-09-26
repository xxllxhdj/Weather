
define(['ionic', 'js/controllers', 'js/services'], function () {
    angular.module('weather', ['ionic', 'weather.controllers', 'weather.services'])

        .run(['$ionicPlatform', function($ionicPlatform) {
            $ionicPlatform.ready(function() {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);

                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleLightContent();
                }
            });
        }])

        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

            $stateProvider

                // setup an abstract state for the tabs directive
                .state('home', {
                    url: '/home',
                    templateUrl: 'tpls/home.html'
                });

            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/home');

        }]);
});