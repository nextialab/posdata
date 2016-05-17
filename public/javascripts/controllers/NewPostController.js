'use strict';
angular.module('controllers').controller('NewPostController', ['$scope', '$uibModalInstance', 'APIService', function ($scope, $uibModalInstance, APIService) {
    $scope.title = '';
    $scope.summary = '';
    $scope.loading = false;
    $scope.disabled = function () {
        return $scope.loading || $scope.title.length == 0;
    };
    $scope.create = function () {
        APIService.createPost($scope.title, $scope.summary, {
            success: function (post) {
                $uibModalInstance.close(data);
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
}])
