'use strict';
angular.module('services').factory('SectionService', [function () {
    var _HOME_ = "home";
    var _POSTS_ = "posts";
    var _MEDIA_ = "media";
    var section = _HOME_;
    return {
        HOME: _HOME_,
        POSTS: _POSTS_,
        MEDIA: _MEDIA_,
        getCurrentSection: function () {
            return section;
        },
        setCurrentSection: function (_section) {
            section = _section;
        }
    };
}]);
