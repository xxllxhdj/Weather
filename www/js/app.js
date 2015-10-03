
define([
    'ionic',
    'ngCordova',
    'ngDebounce',
    'js/help',

    'js/directives/directives',
    'js/directives/weatherRange',

    'js/controllers/controllers',
    'js/controllers/HomeCtrl',
    'js/controllers/ManagerCtrl',
    'js/controllers/AddCtrl',

    'js/services/services',
    'js/services/initService',
    'js/services/configService',
    'js/services/locationService',
    'js/services/weatherService',
    'js/services/cityWeatherService',

    'js/utility/utility',
    'js/utility/APPCONSTANTS',
    'js/utility/tip',
    'js/utility/utilService'
], function () {
    angular.module('weather', ['ionic', 'ngCordova', 'debounce', 'weather.controllers', 'weather.services', 'weather.directives', 'weather.utility'])

        .run(['$ionicPlatform', '$timeout', 'initService', 'APPCONSTANTS',
            function($ionicPlatform, $timeout, initService, APPCONSTANTS) {
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
                    if (navigator.splashscreen) {
                        initService.initPromise.then(function () {
                            $timeout(function () {
                                navigator.splashscreen.hide();
                                if (window.StatusBar) {
                                    StatusBar.show();
                                }
                            }, APPCONSTANTS.splashScreenExtraDelay);
                        });
                    }
                });
            }
        ])

        .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider',
            function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

                $stateProvider
                    .state('home', {
                        url: '/home',
                        cache: false,
                        templateUrl: 'tpls/home.html',
                        controller: 'HomeCtrl'
                    })
                    .state('manager', {
                        url: '/manager',
                        templateUrl: 'tpls/manager.html',
                        controller: 'ManagerCtrl'
                    })
                    .state('add', {
                        url: '/add',
                        templateUrl: 'tpls/add.html',
                        controller: 'AddCtrl'
                    });

                $urlRouterProvider.otherwise('/home');

                $ionicConfigProvider.platform.android.navBar.alignTitle('center');
                $ionicConfigProvider.platform.android.backButton.previousTitleText(false);
                $ionicConfigProvider.platform.android.navBar.transition('view');
                $ionicConfigProvider.platform.android.views.transition('ios');
                $ionicConfigProvider.platform.android.views.swipeBackEnabled(true);
                $ionicConfigProvider.platform.android.views.swipeBackHitWidth(45);
                $ionicConfigProvider.platform.android.tabs.style('standard');
                $ionicConfigProvider.platform.android.tabs.position('bottom');
                $ionicConfigProvider.platform.android.form.toggle('large');

                $ionicConfigProvider.platform.default.backButton.previousTitleText(false);
                $ionicConfigProvider.platform.default.backButton.text(false);
            }
        ]);
});