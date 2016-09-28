var express = require('express');
var mongoose = require('mongoose');
var valid = require('../modules/valid.js');
var oauth = require('../modules/oauth.js');

var router = express.Router();
var User = mongoose.model('User');
var Token = mongoose.model('Token');

router.post('/', valid.validate(['email', 'password']), function (req, res, next) {
    User.findUserByEmailAndPass(req.body.email, req.body.password).then(function (user) {
        Token.findToken(user).then(function (token) {
            res.json({
                token: token.token,
                userid: token.user,
                role: user.role,
                expires: token.expires
            });
        }, function (err) {
            res.status(500).json({error: err});
        });
    }, function (err) {
        res.status(404).json({error: 'Wrong email or password'});
    });
});

router.post('/:userid/refresh', oauth.basic(), function (req, res, next) {
    var userid = mongoose.Types.ObjectId(req.params.userid);
    Token.updateToken(userid).then(function (token) {
        res.json({token: token.token, expires: token.expires});
    }, function (err) {
        res.status(404).json({error: 'Could not refresh token for user'});
    });
});

// For security reasons we always returns a 200 response in this request
router.delete('/:userid/revoke', oauth.basic(), function (req, res, next) {
    Token.remove({token: req.headers.authorization}).then(function () {
        res.json({success: 'Token revoked'});
    }, function () {
        res.json({success: 'Token revoked'});
    });
});

// For security reasons we always returns a 200 response in this request
router.delete('/:userid/revoke/all', oauth.basic(), function (req, res, next) {
    var userid = mongoose.Types.ObjectId(req.params.userid);
    Token.remove({user: userid}).then(function () {
        res.json({success: 'Tokens revoked'});
    }, function () {
        res.json({success: 'Tokens revoked'});
    });
});

module.exports = router;
