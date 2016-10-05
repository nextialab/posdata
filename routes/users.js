var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var uuid = require('uuid');
var oauth = require('../modules/oauth.js');
var valid = require('../modules/valid.js');

var router = express.Router();
var User = mongoose.model('User');

router.post('/', valid.validate(['email', 'password', 'name']), function (req, res, next) {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        User.create({
            email: req.body.email,
            password: hash,
            role: 'basic',
            name: req.body.name
        }).then(function (user) {
            res.json(user);
        }, function (err) {
            res.status(500).json({error: 'Could not create user'});
        });
    });
});

router.get('/:userid', oauth.basic(), function (req, res, next) {
    User.findById(req.params.userid, 'name').exec().then(function (user) {
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({error: 'User not found'});
        }
    }, function (err) {
        res.status(404).json({error: 'User not found'});
    });
});

router.put('/:userid', oauth.basic(), function (req, res, next) {
    User.findById(req.params.userid).exec().then(function (err, user) {
        if (user) {
            if (req.body.name) { user.name = req.body.name; }
            if (req.body.about) { user.about = req.body.about; }
            return user.save();
        } else {
            return Promise.reject();
        }
    }, function (err) {
        res.status(404).json({error: 'User not found'});
    }).then(function (user) {
        res.json(user);
    }, function (err) {
        res.status(404).json({error: 'User not found'});
    });
});

// Change password for current user
router.put('/:userid/password', oauth.basic(), function (req, res, next) {

});

// Change role for a given user
router.put('/:userid/role', oauth.role('admin'), function (req, res, next) {
    res.send('it works');
});

module.exports = router;
