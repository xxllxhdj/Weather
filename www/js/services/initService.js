
define(['ionic', 'js/services/services'], function () {
    angular.module('weather.services')
        .factory('initService', ['$q', '$timeout', '$ionicPlatform', '$ionicHistory', '$cordovaToast', 'configService', 'APPCONSTANTS',
            function ($q, $timeout, $ionicPlatform, $ionicHistory, $cordovaToast, configService, APPCONSTANTS) {
                var _initDefer = $q.defer(),
                    _confirmExit = false,
                    o = {
                        initPromise: _initDefer.promise
                    };

                start();

                configService.loadingPromise.then(function () {
                    _initDefer.resolve();
                });

                return o;

                function start () {
                    $ionicPlatform.registerBackButtonAction(
                        onHardwareBackButton,
                        APPCONSTANTS.platformBackButtonPriority
                    );
                }

                function onHardwareBackButton(e) {
                    if ($ionicHistory.backView()) {
                        $ionicHistory.goBack();
                    } else {
                        if (_confirmExit) {
                            ionic.Platform.exitApp();
                        } else {
                            _confirmExit = true;
                            $cordovaToast.showShortBottom(APPCONSTANTS.exitAppTipsString);
                            $timeout(function () {
                                _confirmExit = false;
                            }, APPCONSTANTS.exitAppConfirmTime);
                        }
                    }

                    e.preventDefault();
                    return false;
                }
            }
        ]);
});