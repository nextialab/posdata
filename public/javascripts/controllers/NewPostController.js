'use strict';
angular.module('controllers').controller('NewPostController', ['$scope', '$uibModalInstance', 'APIService', function ($scope, $uibModalInstance, APIService) {
    $scope.title = '';
    $scope.summary = '';
    $scope.type = 'post';
    $scope.loading = false;
    $scope.disabled = function () {
        return $scope.loading || $scope.title.length == 0;
    };
    $scope.create = function () {
        APIService.createPost($scope.title, $scope.summary, $scope.type).then(function (data) {
            console.log(data);
            $uibModalInstance.close(data.data);
        }, function (err) {
            console.log(err);
        });
    };
}])
