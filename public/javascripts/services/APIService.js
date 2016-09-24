'use strict';
angular.module('services').factory('APIService', ['$http', '$q' function ($http, $q) {
    var url = 'http://localhost:3002/api/';
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
        login: function (email, password) {
            return $q(function (resolve, reject) {
                $http({
                    method: 'POST',
                    url: url + 'oauth',
                    data: {email: email, password: password},
                    responseType: 'json'
                }).then(function (data) {
                    token = data.data.token;
                    userid = data.data.userid;
                    resolve(data);
                }, function (error) {
                    reject(error);
                })
            });
        },
        getUser: function () {
            return $http({
                method: 'GET',
                url: url + 'users/' + userid,
                responseType: 'json',
                headers: {
                    'Authorization': token
                }
            });
        },
        saveUser: function (data) {
            return $http({
                method: 'PUT',
                url: url + 'users/' + userid,
                responseType: 'json',
                data: data,
                headers: {
                    'Authorization': token
                }
            });
        },
        logout: function () {
            token = '';
            userid = '';
        },
        getPosts: function (callback) {
            return $http({
                method: 'GET',
                url: url + 'posts/' + userid,
                responseType: 'json',
                headers: {
                    'Authorization': token
                }
            });
        },
        createPost: function (title, summary, type) {
            return $http({
                method: 'POST',
                url: url + 'posts/' + userid,
                data: {title: title, summary: summary, type: type},
                responseType: 'json',
                headers: {
                    'Authorization': token
                }
            });
        },
        getPost: function (postid, callback) {
            return $http({
                method: 'GET',
                url: url + 'posts/' + userid + '/post/' + postid,
                responseType: 'json',
                headers: {
                    'Authorization': token
                }
            });
        },
        updatePost: function (postid, data, callback) {
            return $http({
                method: 'PUT',
                url: url + 'posts/' + userid + '/post/' + postid,
                data: data,
                responseType: 'json',
                headers: {
                    'Authorization': token
                }
            });
        },
        uploadMedia: function (data, callback) {
            return $http({
                method: 'POST',
                url: url + 'media/' + userid,
                data: data,
                headers: {
                    'Authorization': token,
                    'Content-Type': undefined
                }
            });
        },
        getMedia: function (callback) {
            return $http({
                method: 'GET',
                url: url + 'media/' + userid,
                headers: {
                    'Authorization': token
                }
            });
        },
        getThemes: function (callback) {
            return $http({
                method: 'GET',
                url: url + 'settings/' + userid + '/themes',
                headers: {
                    'Authorization': token
                }
            });
        },
        getSetting: function (key, callback) {
            return $http({
                method: 'GET',
                url: url + 'settings/' + userid + '/key/' + key,
                headers: {
                    'Authorization': token
                }
            });
        },
        saveSetting: function (key, value, callback) {
            return $http({
                method: 'POST',
                url: url + 'settings/' + userid + '/key',
                data: {key: key, value: value},
                responseType: 'json',
                headers: {
                    'Authorization': token
                }
            });
        }
    };
}]);
