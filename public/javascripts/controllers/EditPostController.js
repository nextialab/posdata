'use strict';
angular.module('controllers').controller('EditPostController', ['$scope', '$uibModal', '$stateParams', 'PostsService', function ($scope, $uibModal, $stateParams, PostsService) {
    $scope.loading = false;
    $scope.hasMessage = false;
    $scope.message = 'Saved!';
    $scope.hasError = false;
    $scope.error = 'Something happened';
    var post = PostsService.getPost($stateParams.postid); // get url from route
    $scope.title = post.title;
    $scope.content = post.content;
    $scope.uri = post.uri;
    $scope.status = post.status;
    $scope.summary = post.summary;
    $scope.seePreview = function () {
        $uibModal.open({
            templateUrl: '/admin/templates/preview-modal',
            controller: 'PreviewModalController',
            resolve: {
                content: function () {
                    return $scope.content;
                }
            }
        });
    };
    $scope.insertMedia = function () {
        $uibModal.open({
            templateUrl: '/admin/templates/media-modal',
            controller: 'MediaModalController'
        }).result.then(function (path) {
            var index = $scope.caret.get || 0;
            var content = $scope.content;
            $scope.content = content.slice(0, index) + '![Alt Text](' + path + ')' + content.slice(index);
        }, function () {
            console.log('modal dismissed');
        });
    };
    $scope.disabled = function () {
        return $scope.loading || $scope.title.length == 0;
    };
    $scope.save = function () {
        $scope.loading = true;
        PostsService.updatePost($stateParams.postid, $scope.title, $scope.summary, $scope.content, $scope.status, {
            success: function (post) {
                $scope.loading = false;
                console.log(post);
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
}]);
