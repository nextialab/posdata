'use strict';
angular.module('services').factory('APIService', ['$http', function ($http) {
    var url = 'http://localhost:3001/api/';
    var token = '';
    var username = '';
    return {
        setToken: function (_token) {
            token = _token;
        },
        setUsername: function (_username) {
            username = _username;
        },
        getUsername: function () {
            return username;
        },
        login: function (_username, password, callback) {
            $http({
                method: 'POST',
                url: url + 'users/' + _username + '/auth',
                data: {password: password},
                responseType: 'json'
            })
            .then(function (data) {
                token = data.data.token;
                username = _username;
                callback.success(token);
            }, function (error) {
                callback.error();
            });
        },
        getUser: function (callback) {
            $http({
                method: 'GET',
                url: url + 'users/' + username,
                responseType: 'json',
                headers: {
                    'Authorization': token
                }
            })
            .then(function (data) {
                callback.success(data.data);
            }, function (error) {
                callback.error(error);
            })
        },
        logout: function (callback) {
            token = '';
            username = '';
            callback.success();
        },
        getPosts: function (callback) {
            $http({
                method: 'GET',
                url: url + 'posts/' + username,
                responseType: 'json',
                headers: {
                    'Authorization': token
                }
            })
            .then(function (data) {
                callback.success(data.data);
            }, function (error) {
                callback.error(error);
            });
        },
        createPost: function (title, summary, callback) {
            $http({
                method: 'POST',
                url: url + 'posts/' + username,
                data: {title: title, summary: summary},
                responseType: 'json',
                headers: {
                    'Authorization': token
                }
            })
            .then(function (data) {
                callback.success(data.data);
            }, function (error) {
                callback(error);
            });
        },
        updatePost: function (id, title, summary, content, status, callback) {
            $http({
                method: 'PUT',
                url: url + 'posts/' + username + '/' + id,
                data: {title: title, content: content, status: status},
                responseType: 'json',
                headers: {
                    'Authorization': token
                }
            })
            .then(function (data) {
                callback.success(data.data);
            }, function (error) {
                callback.error(error);
            });
        },
        uploadMedia: function (data, callback) {
            $http({
                method: 'POST',
                url: url + 'uploads/' + username,
                data: data,
                headers: {
                    'Authorization': token,
                    'Content-Type': undefined
                }
            })
            .then(function (data) {
                callback.success(data.data);
            }, function (error) {
                callback.error(error);
            })
        },
        getMedia: function (callback) {
            $http({
                method: 'GET',
                url: url + 'uploads/' + username,
                headers: {
                    'Authorization': token
                }
            })
            .then(function (data) {
                callback.success(data.data);
            }, function (error) {
                callback.error(error);
            })
        }
    };
}]);
