var express = require('express');
var mongoose = require('mongoose');
var oauth = require('../modules/oauth.js');
var valid = require('../modules/valid.js');

var router = express.Router();
var User = mongoose.model('User');
var Post = mongoose.model('Post');

router.get('/:userid', oauth.basic(), function (req, res, next) {
    Post.find({'author._id': req.params.userid}).sort('-createdOn').exec(function (errPost, posts) {
        if (!errPost && posts) {
            res.json(posts);
        } else {
            res.status(404).json({error: 'Posts were not found for user'});
        }
    });
});

router.post('/:userid', oauth.basic(), valid.validate(['title']), function (req, res, next) {
    Post.getUniqueUriForNewPost(req.body.title, {
        onResult: function (uri, normalized) {
            var newPost = {
                author: req.params.userid,
                uri: uri,
                normalized: normalized,
                title: req.body.title
            };
            if (req.body.summary) { newPost.summary = req.body.summary; }
            Post.create(newPost, function (errPost, post) {
                if (!errPost && post) {
                    res.json(post);
                } else {
                    res.status(500).json({error: 'Could not create post for user'});
                }
            });
        },
        onError: function () {
            res.status(409).json({error: 'URI collision'});
        }
    });
});

router.put('/:userid/:postid', oauth.basic(), function (req, res, next) {

});
