'use strict';
angular.module('services').factory('APIService', ['$http', function ($http) {
    var url = 'http://localhost:3000/_api/';
    var token = '';
    var userid = '';
    return {
        setToken: function (_token) {
            token = _token;
        },
        setUserid: function (_userid) {
            userid = _userid;
        },
        getUserid: function () {
            return userid;
        },
        login: function (email, password, callback) {
            $http({
                method: 'POST',
                url: url + 'oauth',
                data: {email: email, password: password},
                responseType: 'json'
            }).then(function (data) {
                token = data.data.token;
                userid = data.data.userid;
                callback.success(token);
            }, function (error) {
                callback.error();
            });
        },
        getUser: function (callback) {
            $http({
                method: 'GET',
                url: url + 'users/' + userid,
                responseType: 'json',
                headers: {
                    'Authorization': token
                }
            }).then(function (data) {
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
                url: url + 'posts/' + userid,
                responseType: 'json',
                headers: {
                    'Authorization': token
                }
            }).then(function (data) {
                callback.success(data.data);
            }, function (error) {
                callback.error(error);
            });
        },
        createPost: function (title, summary, callback) {
            $http({
                method: 'POST',
                url: url + 'posts/' + userid,
                data: {title: title, summary: summary},
                responseType: 'json',
                headers: {
                    'Authorization': token
                }
            }).then(function (data) {
                callback.success(data.data);
            }, function (error) {
                callback.error(error);
            });
        },
        getPost: function (postid, callback) {
            $http({
                method: 'GET',
                url: url + 'posts/' + userid + '/post/' + postid,
                responseType: 'json',
                headers: {
                    'Authorization': token
                }
            }).then(function (data) {
                callback.success(data.data);
            }, function (error) {
                callback.error(error);
            });
        },
        updatePost: function (postid, data, callback) {
            $http({
                method: 'PUT',
                url: url + 'posts/' + userid + '/post/' + postid,
                data: data,
                responseType: 'json',
                headers: {
                    'Authorization': token
                }
            }).then(function (data) {
                callback.success(data.data);
            }, function (error) {
                callback.error(error);
            });
        },
        uploadMedia: function (data, callback) {
            $http({
                method: 'POST',
                url: url + 'media/' + userid,
                data: data,
                headers: {
                    'Authorization': token,
                    'Content-Type': undefined
                }
            }).then(function (data) {
                callback.success(data.data);
            }, function (error) {
                callback.error(error);
            })
        },
        getMedia: function (callback) {
            $http({
                method: 'GET',
                url: url + 'media/' + userid,
                headers: {
                    'Authorization': token
                }
            }).then(function (data) {
                callback.success(data.data);
            }, function (error) {
                callback.error(error);
            })
        }
    };
}]);
