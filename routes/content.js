var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var Post = mongoose.model('Post');
var Meta = mongoose.model('Meta')

router.get('/', function (req, res, next) {
    Post.find({status: 'publish'}).sort('-createdOn').exec(function (err, posts) {
        if (!err) {
            Meta.getSelectedTheme().then(function(theme) {
                res.render(theme.value + '/blog', {title: 'Blog', description: '', posts: posts});
            }, function (err) {
                res.render('default/blog', {title: 'Blog', description: '', posts: posts});
            });
        } else {
            res.status(404);
        }
    });
});

router.get('/tag/:tag', function (req, res, next) {
    Post.find({tags: req.params.tag, status: 'publish'}).sort('-createdOn').exec(function (err, posts) {
        if (!err) {
            Meta.getSelectedTheme({
                success: function (theme) {
                    res.render(theme + '/blog', {title: 'Blog', description: '', posts: posts});
                }
            });
        } else {
            res.status(404);
        }
    });
});

router.get('/posts', function (req, res, next) {
    Post.find({type: 'post', status: 'publish'}).sort('-createdOn').exec(function (err, posts) {
        if (!err) {
            Meta.getSelectedTheme({
                success: function (theme) {
                    res.render(theme + '/blog', {title: 'Blog', description: '', posts: posts});
                }
            });
        } else {
            res.status(404);
        }
    });
});

router.get('/videos', function (req, res, next) {
    Post.find({type: 'video', status: 'publish'}).sort('-createdOn').exec(function (err, posts) {
        if (!err) {
            Meta.getSelectedTheme({
                success: function (theme) {
                    res.render(theme + '/blog', {title: 'Blog', description: '', posts: posts});
                }
            });
        } else {
            res.status(404);
        }
    });
});

router.get('/challenges', function (req, res, next) {
    Post.find({type: 'challenge', status: 'publish'}).sort('-createdOn').exec(function (err, posts) {
        if (!err) {
            Meta.getSelectedTheme({
                success: function (theme) {
                    res.render(theme + '/blog', {title: 'Blog', description: '', posts: posts});
                }
            });
        } else {
            res.status(404);
        }
    });
});

router.get('/post/:uri', function (req, res, next) {
    Post.findPostByUri(req.params.uri).then(function (post) {
        if (post.status === 'publish') {
            Meta.getSelectedTheme().then(function (theme) {
                res.render(theme.value + '/post', {description: post.summary, post: post});
            }, function (err) {
                res.render('default/post', {description: post.summary, post: post});
            });
        } else {
            res.status(404);
        }
    }, function (err) {
        res.status(400);
    });
});

module.exports = router;
