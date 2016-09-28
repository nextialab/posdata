'use strict';
angular.module('controllers').controller('HomeController', ['$scope', 'APIService', 'SectionService', function ($scope, APIService, SectionService) {
    $scope.username = '';
    var date = new Date();
    var hours = date.getHours();
    if (hours < 12) {
        $scope.greeting = 'Buenos días';
    } else if (hours < 19) {
        $scope.greeting = 'Buenas tardes';
    } else {
        $scope.greeting = 'Buenas noches';
    }
    APIService.getUser().then(function (data) {
        var user = data.data;
        $scope.username = user.name;
    }, function (err) {
        console.log(err);
    });
    SectionService.setCurrentSection(SectionService.HOME);
}]);
