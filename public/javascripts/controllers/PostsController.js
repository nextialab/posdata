'use strict';
angular.module('controllers').controller('PostsController', ['$scope', '$uibModal', 'PostsService', function ($scope, $uibModal, PostsService) {
    $scope.posts = [];
    PostsService.getPosts({
        success: function (posts) {
            $scope.posts = posts;
        },
        error: function (error) {
            console.log(error);
        }
    });
    $scope.newPost = function () {
        $uibModal.open({
            templateUrl: '/admin/templates/new-post-modal',
            controller: 'NewPostController'
        }).result.then(function (post) {
            $scope.posts.splice(0, 0, post);
        }, function () {
            console.log('modal dismissed');
        });
    };
}]);
