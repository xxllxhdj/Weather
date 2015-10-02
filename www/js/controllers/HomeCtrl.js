
define(['ionic', 'js/controllers/controllers'], function () {
    angular.module('weather.controllers')
        .controller('HomeCtrl', ['$scope', '$state', 'weatherService',
            function ($scope, $state, weatherService) {
                $scope.goManager = function () {
                    $state.go('manager');
                };
            }
        ]);
});