var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var Post = mongoose.model('Post');
var Meta = mongoose.model('Meta')

router.get('/', function (req, res, next) {
    Post.find({status: 'publish'}).sort('-createdOn').exec().then(function (posts) {
        Meta.getSelectedTheme().then(function(theme) {
            res.render(theme.value + '/blog', {title: 'Blog', description: '', posts: posts});
        }, function (err) {
            res.render('default/blog', {title: 'Blog', description: '', posts: posts});
        });
    }, function (err) {
        res.status(404);
    });
});

router.get('/tag/:tag', function (req, res, next) {
    Post.find({tags: req.params.tag, status: 'publish'}).sort('-createdOn').exec().then(function (posts) {
        Meta.getSelectedTheme().then(function(theme) {
            res.render(theme.value + '/blog', {title: 'Blog', description: '', posts: posts});
        }, function (err) {
            res.render('default/blog', {title: 'Blog', description: '', posts: posts});
        });
    }, function (err) {
        res.status(404);
    });
});

router.get('/:media', function (req, res, next) {
    Post.find({type: req.params.media, status: 'publish'}).sort('-createdOn').exec().then(function (posts) {
        Meta.getSelectedTheme().then(function(theme) {
            res.render(theme.value + '/blog', {title: 'Blog', description: '', posts: posts});
        }, function (err) {
            res.render('default/blog', {title: 'Blog', description: '', posts: posts});
        });
    }, function (err) {
        res.status(404);
    });
});

router.get('/post/:uri', function (req, res, next) {
    Post.find({uri: req.params.uri, status: 'publish'}).exec().then(function (post) {
        Meta.getSelectedTheme().then(function (theme) {
            res.render(theme.value + '/post', {description: post.summary, post: post});
        }, function (err) {
            res.render('default/post', {description: post.summary, post: post});
        });
    }, function (err) {
        res.status(404);
    });
});

module.exports = router;
