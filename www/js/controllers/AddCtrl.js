
define(['ionic', 'js/controllers/controllers'], function () {
    angular.module('weather.controllers')
        .controller('AddCtrl', ['$scope', 'locationService', 'initService', function ($scope, locationService, initService) {
            $scope.data = {
                search: '',
                suggestCity: []
            };

            initService.initPromise.then(init);

            $scope.$watch('data.search', function (search) {
                //console.log(search);
            });

            $scope.clearSearch = function () {
                $scope.data.search = '';
            };

            function init () {
                $scope.data.suggestCity = locationService.getSuggestCity();
            }
        }]);
});