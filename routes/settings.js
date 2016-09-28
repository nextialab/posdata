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
    Meta.find({}).exec().then(function (settings) {
        res.json(settings);
    }, function (err) {
        res.status(404).json({error: 'Settings not found'});
    });
});

router.get('/:userid/themes', oauth.role('admin'), function (req, res, next) {
    Meta.findOne({key: 'theme'}).exec().then(function (theme) {
        var directories = getDirectories('./views').filter(function (dir) {
            return dir !== 'admin';
        });
        res.json({selected: theme.value, themes: directories});
    }, function (err) {
        res.status(404).json({error: 'Themes not found'});
    });
});

router.get('/:userid/key/:key', oauth.role('admin'), function (req, res, next) {
    Meta.findOne({key: req.params.key}).exec().then(function (meta) {
        res.json(meta);
    }, function (err) {
        res.status(404).json({error: 'Settings were not found for user'});
    });
});

router.post('/:userid/key', oauth.role('admin'), valid.validate(['key', 'value']), function (req, res, next) {
    Meta.findOneAndUpdate({key: req.body.key}, {value: req.body.value}, {upsert: true}).then(function (err, meta) {
        res.json({message: 'success'});
    }, function (err) {
        res.status(500).json({error: 'Could not update setting'});
    });
});

module.exports = router;
