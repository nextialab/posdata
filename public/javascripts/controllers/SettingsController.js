'use strict';
angular.module('controllers').controller('SettingsController', ['$scope', 'APIService', function ($scope, APIService) {
    $scope.theme = '';
    $scope.themes = [];
    $scope.saveTheme = function () {
        APIService.saveSetting('theme', $scope.theme, {
            success: function () {
                console.log('saved');
            },
            error: function () {
                console.log(error);
            }
        });
    };
    APIService.getThemes({
        success: function (themes) {
            $scope.theme = themes.selected;
            $scope.themes = themes.themes;
        },
        error: function (error) {
            console.log(error);
        }
    });
}]);
