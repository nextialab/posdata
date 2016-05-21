'use strict';
angular.module('services').factory('StorageService', ['$cookies', function ($cookies) {
    return {
        getItem: function (name) {
            var value = $cookies.get(name);
            if (value !== undefined) {
                return value;
            } else {
                return '';
            }
        },
        setItem: function (name, value) {
            $cookies.put(name, value);
        }
    };
}]);
