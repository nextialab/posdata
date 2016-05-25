var express = require('express');
var mongoose = require('mongoose');
var oauth = require('../modules/oauth.js');
var valid = require('../modules/valid.js');

var router = express.Router();
var User = mongoose.model('User');
var Post = mongoose.model('Post');

router.get('/:userid', oauth.basic(), function (req, res, next) {
    var userid = mongoose.Types.ObjectId(req.params.userid);
    Post.find({author: userid}).sort('-createdOn').exec(function (err, posts) {
        if (!err && posts) {
            res.json(posts);
        } else {
            res.status(404).json({error: 'Posts were not found for user'});
        }
    });
});

router.post('/:userid', oauth.basic(), valid.validate(['title', 'type']), function (req, res, next) {
    Post.getUniqueUriForNewPost(req.body.title, {
        onResult: function (uri, normalized) {
            var userid = mongoose.Types.ObjectId(req.params.userid);
            var newPost = {
                author: userid,
                uri: uri,
                normalized: normalized,
                type: req.body.type,
                title: req.body.title
            };
            if (req.body.summary) { newPost.summary = req.body.summary; }
            Post.create(newPost, function (err, post) {
                if (!err && post) {
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

router.get('/:userid/post/:postid', oauth.basic(), function (req, res, next) {
    Post.findById(mongoose.Types.ObjectId(req.params.postid), function (err, post) {
        if (!err && post) {
            res.json(post);
        } else {
            res.status(404).json({error: 'Post not found'});
        }
    });
});

router.put('/:userid/post/:postid', oauth.basic(), function (req, res, next) {
    Post.findById(mongoose.Types.ObjectId(req.params.postid), function (errPost, post) {
        if (!errPost && post) {
            function savePost(postToSave) {
                if (req.body.summary) { postToSave.summary = req.body.summary; }
                if (req.body.content) { postToSave.content = req.body.content; }
                if (req.body.status) { postToSave.status = req.body.status; }
                if (req.body.language) { postToSave.language = req.body.language; }
                if (req.body.type) { postToSave.type = req.body.type; }
                if (req.body.tags) {
                    postToSave.tags = req.body.tags.split(",").map(function (str) {
                        return str.trim();
                    });
                }
                postToSave.save(function (err) {
                    if (!err) {
                        res.json(postToSave);
                    } else {
                        res.status(500).json({error: 'Could not save post'});
                    }
                });
            }
            if (req.body.title && req.body.title !== post.title) {
                Post.getUniqueUriForExistingPost(post._id, req.body.title, {
                    onResult: function (uri, normalized) {
                        post.title = req.body.title;
                        post.uri = uri;
                        post.normalized = normalized;
                        savePost(post);
                    },
                    onError: function () {
                        res.status(409).json({error: 'URI collision'});
                    }
                });
            } else {
                savePost(post);
            }
        } else {
            res.status(404).json({error: 'Post not found'});
        }
    });
});

module.exports = router;
