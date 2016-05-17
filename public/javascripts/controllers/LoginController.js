'use strict';
angular.module('controllers').controller('LoginController', ['$scope', '$state', 'StorageService', 'SessionService', function ($scope, $state, StorageService, SessionService) {
    $scope.username = '';
    $scope.password = '';
    $scope.login = function () {
        SessionService.login($scope.username, $scope.password, {
            success: function (token) {
                StorageService.setItem('token', token.token);
                StorageService.setItem('userid', token.userid);
                $state.go('admin.home');
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    $scope.loginDisabled = function () {
        if ($scope.username.length > 0 && $scope.password.length > 0) {
            return false;
        }
        return true;
    };
}]);
