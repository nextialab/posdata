var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var Post = mongoose.model('Post');

router.get('/', function (req, res, next) {
    Post.find({status: 'publish'}).sort('-createdOn').exec(function (err, posts) {
        if (!err) {
            res.render('default/blog', {title: 'Blog', description: '', posts: posts});
        } else {
            res.status(404);
        }
    })
});

router.get('/:uri', function (req, res, next) {

});

router.get('/tag/:tag', function (req, res, next) {

});

router.get('/posts', function (req, res, next) {

});

router.get('/videos', function (req, res, next) {

});

router.get('/images', function (req, res, next) {

});

router.get('/challenges', function (req, res, next) {

});

module.exports = router;
