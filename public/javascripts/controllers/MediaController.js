'use strict';
angular.module('controllers').controller('MediaController', ['$scope', 'APIService', 'SectionService', '$uibModal', function ($scope, APIService, SectionService, $uibModal) {
    $scope.medias = [];
    APIService.getMedia().then(function (data) {
        $scope.medias = data.data;
    }, function (err) {
        console.log(error);
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
