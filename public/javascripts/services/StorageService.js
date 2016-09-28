'use strict';
angular.module('services').factory('StorageService', ['$cookies', function ($cookies) {
    var storageProvider;
    if (typeof(Storage) !== 'undefined') { // use local storage
        console.log('Using local storage');
        storageProvider = {
            getItem: function (name) {
                var value = localStorage.getItem(name);
                if (value !== null) {
                    return value;
                } else {
                    return '';
                }
            },
            setItem: function (name, value) {
                localStorage.setItem(name, value);
            }
        }
    } else { // default to cookies
        console.log('Defaulting to cookies');
        storageProvider = {
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
        }
    }
    return storageProvider;
}]);
