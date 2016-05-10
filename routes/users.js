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
        }, function (err, user) {
            if (!err && user) {
                res.json(user);
            } else {
                res.status(500).json({error: 'Could not create user'});
            }
        })
    });
});

router.get('/:userid', oauth.basic(), function (req, res, next) {
    User.findById(mongoose.Types.ObjectId(req.params.userid), function (err, user) {
        if (!err && user) {
            res.json(user);
        } else {
            res.status(404).json({error: 'User not found'});
        }
    });
});

router.put('/:userid', oauth.basic(), function (req, res, next) {
    // TODO: implement user update
});

router.put('/:userid/role', oauth.role('admin'), function (req, res, next) {
    res.send('it works');
});

module.exports = router;
