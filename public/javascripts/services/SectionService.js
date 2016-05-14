'use strict';
angular.module('services').factory('SectionService', [function () {
    var _HOME_ = 0;
    var _POSTS_ = 1;
    var _MEDIA_ = 2;
    var section = _HOME_;
    return {
        getCurrentSection: function () {
            return section;
        },
        setSection: function (_section) {
            section = _section;
        }
    };
}]);
