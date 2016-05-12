'use strict';
angular.module('controllers').controller('MediaModalController', ['$scope', '$uibModalInstance', 'APIService', function ($scope, $uibModalInstance, APIService) {
    $scope.medias = [];
    $scope.select = function (index) {
        $uibModalInstance.close($scope.medias[index].path);
    };
    APIService.getMedia({
        success: function (media) {
            $scope.medias = media;
        },
        error: function (error) {
            console.log(error);
        }
    })
}]);
