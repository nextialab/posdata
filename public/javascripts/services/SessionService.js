'use strict';
angular.module('services').factory('SessionService', ['APIService', '$q', function (APIService, $q) {
    var LOGGED_IN = 0;
    var LOGGED_OUT = 1;
    var state = LOGGED_OUT;
    return {
        LOGGED_IN: LOGGED_IN,
        LOGGED_OUT: LOGGED_OUT,
        login: function (username, password) {
            return $q(function (resolve, reject) {
                APIService.login(username, password).then(function (data) {
                    state = LOGGED_IN;
                    resolve(data);
                }, function (err) {
                    reject(err);
                });
            });
        },
        logout: function () {
            state = LOGGED_OUT;
            APIService.logout();
        },
        isLoggedIn: function () {
            return state === LOGGED_IN;
        },
        setState: function (_state) {
            state = _state;
        }
    }
}]);
