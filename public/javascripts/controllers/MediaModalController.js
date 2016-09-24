'use strict';
angular.module('controllers').controller('MediaModalController', ['$scope', '$uibModalInstance', 'APIService', function ($scope, $uibModalInstance, APIService) {
    $scope.medias = [];
    $scope.select = function (index) {
        $uibModalInstance.close($scope.medias[index].path);
    };
    APIService.getMedia().then(function (data) {
        $scope.medias = data.data;
    }, function (err) {
        console.log(error);
    });
}]);
