'use strict';
angular.module('controllers').controller('UserEditController', ['$scope', 'APIService', function ($scope, APIService) {
    $scope.name = '';
    $scope.about = '';
    $scope.alerts = [];
    APIService.getUser().then(function (data) {
        var user = data.data;
        $scope.name = user.name;
        $scope.about = user.about;
    }, function (err) {
        console.log(error);
    });
    $scope.save = function () {
        var data = {
            name: $scope.name,
            about: $scope.about
        };
        APIService.saveUser(data).then(function (data) {
            $scope.alerts.push({type: 'success', msg: 'Guardado'});
        }, function (err) {
            console.log(error);
            $scope.alerts.push({type: 'danger', msg: 'No se pudo guardar'});
        });
    };
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
}]);
