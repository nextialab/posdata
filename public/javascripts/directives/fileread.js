// from: http://stackoverflow.com/a/17063046
angular.module('fileread', []).directive("fileread", [function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeFunc = scope.$eval(attrs.fileread);
            element.bind('change', onChangeFunc);
        }
    };
    /*return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            scope.loaded = false;
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                        scope.loaded = true;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }*/
}]);
