'use strict';
angular.module('controllers').controller('LoginController', ['$scope', '$state', 'StorageService', 'SessionService', function ($scope, $state, StorageService, SessionService) {
    $scope.username = '';
    $scope.password = '';
    $scope.login = function () {
        SessionService.login($scope.username, $scope.password).then(function (data) {
            console.log(data.data);
            var token = data.data;
            if (token.role === 'admin') {
                StorageService.setItem('token', token.token);
                StorageService.setItem('userid', token.userid);
                StorageService.setItem('role', token.role);
                $state.go('admin.home');
            } else {
                console.log({error: 'User does not have required role'});
            }
        }, function (err) {
            console.log(error);
        });
    };
    $scope.loginDisabled = function () {
        if ($scope.username.length > 0 && $scope.password.length > 0) {
            return false;
        }
        return true;
    };
}]);
