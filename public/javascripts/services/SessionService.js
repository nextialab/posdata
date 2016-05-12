'use strict';
angular.module('services').factory('SessionService', ['APIService', function (APIService) {
    var LOGGED_IN = 0;
    var LOGGED_OUT = 1;
    var state = LOGGED_OUT;
    return {
        LOGGED_IN: LOGGED_IN,
        LOGGED_OUT: LOGGED_OUT,
        login: function (username, password, callback) {
            console.log('Calling login in SessionService');
            APIService.login(username, password, {
                success: function (token) {
                    state = LOGGED_IN;
                    callback.success(token);
                },
                error: function (error) {
                    callback.error(error);
                }
            });
        },
        logout: function (callback) {
            APIService.logout({
                success: function () {
                    state = LOGGED_OUT;
                    callback.success();
                },
                error: function (error) {
                    callback.error(error);
                }
            });
        },
        isLoggedIn: function () {
            return state === LOGGED_IN;
        },
        setState: function (_state) {
            state = _state;
        }
    }
}]);
