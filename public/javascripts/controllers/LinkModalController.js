'use strict';
angular.module('controllers').controller('LinkModalController', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
    $scope.text = '';
    $scope.link = '';
    $scope.disabled = function () {
        return $scope.text.length == 0 || $scope.link.length == 0;
    };
    $scope.done = function () {
        $uibModalInstance.close({
            text: $scope.text,
            link: $scope.link
        });
    };
}]);
