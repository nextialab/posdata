'use strict';
angular.module('controllers').controller('EditPostController', ['$scope', '$uibModal', '$stateParams', 'APIService', function ($scope, $uibModal, $stateParams, APIService) {
    $scope.loading = false;
    $scope.title = '';
    $scope.content = '';
    $scope.uri = '';
    $scope.status = 'draft';
    $scope.summary = '';
    $scope.tags = '';
    $scope.alerts = [];
    APIService.getPost($stateParams.postid, {
        success: function (post) {
            $scope.title = post.title;
            $scope.content = post.content;
            $scope.uri = post.uri;
            $scope.status = post.status;
            $scope.summary = post.summary;
            $scope.tags = post.tags.join(', ');
        },
        error: function (error) {
            $scope.alerts.push({type: 'danger', msg: 'Post no existe'});
        }
    });
    $scope.seePreview = function () {
        $uibModal.open({
            templateUrl: '/admin/templates/post-preview-modal',
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
            templateUrl: '/admin/templates/media-select-modal',
            controller: 'MediaModalController'
        }).result.then(function (path) {
            var index = $scope.caret.get || 0;
            var content = $scope.content;
            $scope.content = content.slice(0, index) + '![Alt Text](' + path + ')' + content.slice(index);
        }, function () {
            console.log('modal dismissed');
        });
    };
    $scope.insertLink = function () {
        $uibModal.open({
            templateUrl: '/admin/templates/link-new-modal',
            controller: 'LinkModalController'
        }).result.then(function (link) {
            var index = $scope.caret.get || 0;
            var content = $scope.content;
            $scope.content = content.slice(0, index) + '[' + link.text + '](' + link.link + ')' + content.slice(index);
        }, function () {
            console.log('modal dismissed');
        });
    };
    $scope.disabled = function () {
        return $scope.loading || $scope.title.length == 0;
    };
    $scope.save = function () {
        $scope.loading = true;
        var data = {
            title: $scope.title,
            summary: $scope.summary,
            content: $scope.content,
            status: $scope.status,
            tags: $scope.tags,
        };
        APIService.updatePost($stateParams.postid, data, {
            success: function (post) {
                $scope.loading = false;
                $scope.alerts.push({type: 'success', msg: 'Guardado'});
            },
            error: function (error) {
                $scope.alerts.push({type: 'danger', msg: 'No se pudo guardar'});
            }
        });
    };
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    }
}]);
