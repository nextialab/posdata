var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var Post = mongoose.model('Post');
var Meta = mongoose.model('Meta')

router.get('/', function (req, res, next) {
    Post.find({status: 'publish'}).sort('-createdOn').exec(function (err, posts) {
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
    Post.findOne({uri: req.params.uri}).exec(function (err, _post) {
        if (!err) {
            if (_post && _post.status === 'publish') {
                Meta.getSelectedTheme({
                    success: function (theme) {
                        res.render(theme + '/post', {description: _post.summary, post: _post});
                    }
                })
            } else {
                res.status(404);
            }
        } else {
            res.status(400);
        }
    });
});

module.exports = router;
