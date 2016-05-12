'use strict';
angular.module('controllers').controller('PreviewModalController', ['$scope', 'content', function ($scope, content) {
    $scope.content = marked(content);
}]);
