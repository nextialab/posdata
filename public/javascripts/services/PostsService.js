'use strict';
angular.module('services').factory('PostsService', ['APIService', function (APIService) {
    var posts = [];
    return {
        getPosts: function (callback) {
            APIService.getPosts({
                success: function (_posts) {
                    posts = _posts;
                    callback.success(posts);
                },
                error: function (error) {
                    callback.error(error);
                }
            });
        },
        createPost: function (title, summary, callback) {
            APIService.createPost(title, summary, {
                success: function (post) {
                    posts.splice(0, 0, post);
                    callback.success(post);
                },
                error: function (error) {
                    callback.error(error);
                }
            });
        },
        getPost: function (index) {
            return posts[index];
        },
        updatePost: function (index, title, summary, content, status, callback) {
            var post = posts[index];
            APIService.updatePost(post._id, title, summary, content, status, {
                success: function (_post) {
                    posts[index] = _post;
                    callback.success(post);
                },
                error: function (error) {
                    callback.error(error);
                }
            });
        }
    };
}]);
