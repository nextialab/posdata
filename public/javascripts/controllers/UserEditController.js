'use strict';
angular.module('controllers').controller('UserEditController', ['$scope', 'APIService', function ($scope, APIService) {
    $scope.name = '';
    $scope.about = '';
    $scope.alerts = [];
    APIService.getUser({
        success: function (user) {
            $scope.name = user.name;
            $scope.about = user.about;
        },
        error: function (error) {
            console.log(error);
        }
    });
    $scope.save = function () {
        var data = {
            name: $scope.name,
            about: $scope.about
        };
        APIService.saveUser(data, {
            success: function () {
                $scope.alerts.push({type: 'success', msg: 'Guardado'});
            },
            error: function (error) {
                console.log(error);
                $scope.alerts.push({type: 'danger', msg: 'No se pudo guardar'});
            }
        });
    };
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
}]);
