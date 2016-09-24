'use strict';
angular.module('controllers').controller('SettingsController', ['$scope', 'APIService', function ($scope, APIService) {
    $scope.theme = '';
    $scope.themes = [];
    $scope.saveTheme = function () {
        APIService.saveSetting('theme', $scope.theme).then(function (data) {
            console.log('saved');
        }, function (err) {
            console.log(error);
        });
    };
    APIService.getThemes().then(function (data) {
        var themes = data.data;
        $scope.theme = themes.selected;
        $scope.themes = themes.themes;
    }, function (err) {
        console.log(error);
    });
}]);
