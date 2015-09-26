/**
 * Created by xuxle on 2015/9/24.
 */

requirejs.config({
    baseUrl: '../www',
    paths: {
        app: 'js/app',
        ionic: 'lib/ionic/js/ionic.bundle',
        ngCordova: 'lib/ngCordova/dist/ng-cordova'
    },
    shim: {
        ngCordova: {
            deps: ['ionic']
        }
    }
});

// Start the main app logic.
requirejs(['app'], function () {
    var onReady = function () {
        angular.bootstrap(document, ['weather']);
    };
    document.addEventListener("deviceready", onReady, false);
    if (typeof cordova === 'undefined') {
        angular.element(document).ready(function() {
            onReady();
        });
    }
});