'use strict';
angular.module('controllers').controller('MainController', ['$scope', '$state', 'StorageService', 'SessionService', 'SectionService', function ($scope, $state, StorageService, SessionService, SectionService) {
    $scope.getSectionClass = function (forSection) {
        if (SectionService.getCurrentSection() === forSection) {
            return 'active';
        }
        return '';
    };
    $scope.logout = function () {
        SessionService.logout({
            success: function () {
                StorageService.setItem('token', '');
                StorageService.setItem('userid', '');
                $state.go('login');
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
}]);
