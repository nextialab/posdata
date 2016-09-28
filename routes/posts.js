var express = require('express');
var mongoose = require('mongoose');
var oauth = require('../modules/oauth');
var valid = require('../modules/valid');

var router = express.Router();
var User = mongoose.model('User');
var Post = mongoose.model('Post');
var marked = require('marked');

router.get('/:userid', oauth.basic(), function (req, res, next) {
    var userid = mongoose.Types.ObjectId(req.params.userid);
    Post.find({author: userid}).sort('-createdOn').exec().then(function (posts) {
        res.json(posts);
    }, function (err) {
        res.status(404).json({error: 'Posts were not found for user'});
    });
});

router.post('/:userid', oauth.basic(), valid.validate(['title', 'type']), function (req, res, next) {
    Post.getUniqueUriForNewPost(req.body.title).then(function (uri) {
        var userid = mongoose.Types.ObjectId(req.params.userid);
        var newPost = {
            author: userid,
            uri: uri.uri,
            normalized: uri.normalized,
            type: req.body.type,
            title: req.body.title
        };
        if (req.body.summary) { newPost.summary = req.body.summary; }
        return Post.create(newPost);
    }).then(function (post) {
        console.log(post);
        res.json(post);
    }).catch(function (err) {
        console.log(err);
        res.status(400).json({error: 'Bad request'});
    });
});

router.get('/:userid/post/:postid', oauth.basic(), function (req, res, next) {
    Post.findById(mongoose.Types.ObjectId(req.params.postid)).then(function (post) {
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({error: 'Post not found'});
        }
    }, function (err) {
        res.status(404).json({error: 'Post not found'});
    });
});

router.put('/:userid/post/:postid', oauth.basic(), function (req, res, next) {
    Post.findById(mongoose.Types.ObjectId(req.params.postid)).then(function (post) {
        Post.getUniqueUriForExistingPost(post._id, req.body.title).then(function (uri, normalized) {
            post.title = req.body.title;
            post.uri = uri;
            post.normalized = normalized;
            if (req.body.summary) { post.summary = req.body.summary; }
            if (req.body.content) {
                post.markdown = req.body.content;
                post.content = marked(req.body.content);
            }
            if (req.body.status) { post.status = req.body.status; }
            if (req.body.language) { post.language = req.body.language; }
            if (req.body.type) { post.type = req.body.type; }
            if (req.body.videoUrl) { post.videoUrl = req.body.videoUrl; }
            if (req.body.image) { post.image = req.body.image; }
            if (req.body.tags) {
                post.tags = req.body.tags.split(",").map(function (str) {
                    return str.trim();
                });
            }
            return post.save();
        }, function (err) {
            res.status(409).json({error: 'URI collision'});
        }).then(function (post) {
            res.json(postToSave);
        }, function (err) {
            res.status(500).json({error: 'Could not save post'});
        });
    }, function (err) {
        res.status(404).json({error: 'Post not found'});
    });
});

module.exports = router;
