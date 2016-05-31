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
    APIService.getUser({
        success: function (user) {
            $scope.username = user.name;
        },
        error: function (error) {
            console.log(error);
        }
    });
    SectionService.setCurrentSection(SectionService.HOME);
}]);
