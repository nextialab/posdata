'use strict';
angular.module('controllers').controller('MainController', ['$scope', '$state', 'StorageService', 'SessionService', 'SectionService', function ($scope, $state, StorageService, SessionService, SectionService) {
    $scope.getSectionClass = function (forSection) {
        if (SectionService.getCurrentSection() === forSection) {
            return 'active';
        }
        return '';
    };
    $scope.setSection = function (section) {
        SectionService.setSection(section);
    };
    $scope.logout = function () {
        SessionService.logout({
            success: function () {
                StorageService.setItem('token', '');
                StorageService.setItem('username', '');
                $state.go('login');
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
}]);
