var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var oauth = require('../modules/oauth');
var valid = require('../modules/valid');

var router = express.Router();
var Meta = mongoose.model('Meta');

router.get('/:userid', oauth.role('admin'), function (req, res, next) {
    var userid = mongoose.Types.ObjectId(req.params.userid);
    Meta.find({user: userid}).exec(function (err, metas) {
        if (!err && metas) {
            res.json(metas);
        } else {
            res.status(404).json({error: 'Settings were not found for user'});
        }
    });
});

router.post('/:userid', oauth.role('admin'), valid.validate(['field', 'value']), function (req, res, next) {
    var userid = mongoose.Types.ObjectId(req.params.userid);
    Meta.update({user: userid, key: req.body.field}, {value: req.body.value}, function (err, raw) {
        if (!err) {
            res.json({message: 'success'});
        } else {
            res.status(500).json({error: 'Could not update setting'});
        }
    });
});

router.get('/themes', function (req, res, next) {
    function getDirectories(srcpath) {
        return fs.readdirSync(srcpath).filter(function (file) {
            return fs.statSync(path.join(srcpath, file)).isDirectory();
        });
    }
    var directories = getDirectories('../views').filter(function (dir) {
        return dir !== 'admin';
    });
    res.json(directories);
});

module.exports = router;
