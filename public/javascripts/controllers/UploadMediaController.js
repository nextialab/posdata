'use strict';
angular.module('controllers').controller('UploadMediaController', ['$scope', '$uibModalInstance', 'APIService', function ($scope, $uibModalInstance, APIService) {
    $scope.src = '//:0';
    $scope.loading = false;
    $scope.loaded = false;
    $scope.label = '';
    $scope.caption = '';
    $scope.disabled = function () {
        return !$scope.loaded || $scope.label.length == 0;
    };
    $scope.file = function (event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            $scope.$apply(function() {
                $scope.src = e.target.result;
                $scope.loaded = true;
            });
        }
        reader.readAsDataURL(file);
    };
    $scope.upload = function () {
        $scope.loading = true;
        var formData = new FormData();
        formData.append('image', document.getElementById('file').files[0]);
        formData.append('label', $scope.label);
        formData.append('caption', $scope.caption);
        APIService.uploadMedia(formData).then(function (data) {
            $scope.loading = false;
            $uibModalInstance.close(data.data);
        }, function (err) {
            $scope.loading = false;
            console.log(error);
        });
    };
}]);
