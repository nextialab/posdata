'use strict';
angular.module('services').factory('SectionService', [function () {
    var section = 0;
    return {
        getCurrentSection: function () {
            return section;
        },
        setSection: function (_section) {
            section = _section;
        }
    };
}]);
