var express = require('express');
var mongoose = require('mongoose');
var valid = require('../modules/valid.js');
var oauth = require('../modules/oauth.js');

var router = express.Router();
var User = mongoose.model('User');
var Token = mongoose.model('Token');

router.post('/', valid.validate(['email', 'password']), function (req, res, next) {
    User.findUserByEmailAndPass(req.body.email, req.body.password, {
        onResult: function (user) {
            Token.findToken(user, {
                onResult: function (token) {
                    res.json({token: token.token, userid: token.user});
                },
                onError: function () {
                    res.status(500).json({error: 'Could not create token'});
                }
            });
        },
        onError: function () {
            res.status(404).json({error: 'Wrong email or password'});
        }
    });
});

router.post('/:userid/refresh', oauth.basic(), function (req, res, next) {
    // TODO: implement token refresh
});

router.delete('/:userid/revoke', oauth.basic(), function (req, res, next) {
    // TODO: implement token revoke
});

module.exports = router;
