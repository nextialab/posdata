'use strict';
angular.module('controllers').controller('MediaController', ['$scope', 'APIService', 'SectionService', '$uibModal', function ($scope, APIService, SectionService, $uibModal) {
    $scope.medias = [];
    APIService.getMedia({
        success: function (_data) {
            $scope.medias = _data;
        },
        error: function (error) {
            console.log(error);
        }
    });
    $scope.newMedia = function () {
        $uibModal.open({
            templateUrl: '/admin/templates/media-new-modal',
            controller: 'UploadMediaController'
        }).result.then(function (media) {
            $scope.medias.splice(0, 0, media);
        }, function () {
            console.log('modal dismissed');
        });
    };
    SectionService.setCurrentSection(SectionService.MEDIA);
}]);
