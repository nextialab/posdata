'use strict';
angular.module('services').factory('StorageService', [function () {
    var storage = false;
    if (typeof(Storage) !== undefined) {
        storage = true;
    }
    return {
        getItem: function (name) {
            if (storage) {
                var value = localStorage.getItem(name);
                if (value !== null) {
                    return value;
                } else {
                    return '';
                }
            } else {
                return '';
            }
        },
        setItem: function (name, value) {
            if (storage) {
                localStorage.setItem(name, value);
            }
        }
    };
}]);
