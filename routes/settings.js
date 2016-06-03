var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var oauth = require('../modules/oauth');
var valid = require('../modules/valid');

var router = express.Router();
var Meta = mongoose.model('Meta');

function getDirectories(srcpath) {
    return fs.readdirSync(srcpath).filter(function (file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
}

router.get('/:userid/all', oauth.role('admin'), function (req, res, next) {
    Meta.find({}).exec(function (err, settings) {
        if (!err && settings) {
            res.json(settings);
        } else {
            res.status(404).json({error: 'Settings not found'});
        }
    });
});

router.get('/:userid/themes', oauth.role('admin'), function (req, res, next) {
    Meta.findOne({key: 'theme'}).exec(function (err, theme) {
        if (!err && theme) {
            var directories = getDirectories('./views').filter(function (dir) {
                return dir !== 'admin';
            });
            res.json({selected: theme.value, themes: directories});
        } else {
            res.status(404).json({error: 'Themes not found'});
        }
    });
});

router.get('/:userid/key/:key', oauth.role('admin'), function (req, res, next) {
    Meta.findOne({key: req.params.key}).exec(function (err, meta) {
        if (!err && meta) {
            res.json(meta);
        } else {
            res.status(404).json({error: 'Settings were not found for user'});
        }
    });
});

router.post('/:userid/key', oauth.role('admin'), valid.validate(['key', 'value']), function (req, res, next) {
    Meta.findOneAndUpdate({key: req.body.key}, {value: req.body.value}, {upsert: true}, function (err, meta) {
        if (!err && meta) {
            res.json({message: 'success'});
        } else {
            res.status(500).json({error: 'Could not update setting'});
        }
    });
});

module.exports = router;
