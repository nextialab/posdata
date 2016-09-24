'use strict';
angular.module('controllers').controller('PostsController', ['$scope', '$uibModal', 'APIService', 'SectionService', function ($scope, $uibModal, APIService, SectionService) {
    $scope.posts = [];
    APIService.getPosts().then(function (data) {
        $scope.posts = data.data;
    }, function (err) {
        console.log(error);
    });
    $scope.newPost = function () {
        $uibModal.open({
            templateUrl: '/templates/post-new-modal',
            controller: 'NewPostController'
        }).result.then(function (post) {
            $scope.posts.splice(0, 0, post);
        }, function () {
            console.log('modal dismissed');
        });
    };
    SectionService.setCurrentSection(SectionService.POSTS);
}]);
