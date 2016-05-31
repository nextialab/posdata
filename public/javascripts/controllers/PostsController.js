'use strict';
angular.module('controllers').controller('PostsController', ['$scope', '$uibModal', 'APIService', 'SectionService', function ($scope, $uibModal, APIService, SectionService) {
    $scope.posts = [];
    APIService.getPosts({
        success: function (posts) {
            $scope.posts = posts;
        },
        error: function (error) {
            console.log(error);
        }
    });
    $scope.newPost = function () {
        $uibModal.open({
            templateUrl: '/admin/templates/post-new-modal',
            controller: 'NewPostController'
        }).result.then(function (post) {
            $scope.posts.splice(0, 0, post);
        }, function () {
            console.log('modal dismissed');
        });
    };
    SectionService.setCurrentSection(SectionService.POSTS);
}]);
